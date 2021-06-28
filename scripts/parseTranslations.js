import os from 'os'
import { readFileSync, writeFileSync } from 'fs'
import { Parser } from 'i18next-scanner'
import { sync } from 'glob'
import path from 'path'
import { merge } from 'lodash'
import sortKeys from 'sort-keys'
import {
  languages,
  defaultLanguage,
  translationNamespaces,
} from '../src/config'

const parser = new Parser({
  ns: translationNamespaces,
  defaultNs: translationNamespaces[0],
  lngs: languages.map(({ id }) => id),
  defaultLng: defaultLanguage.id,
})

sync(path.join(__dirname, '../src/**/*.{ts,tsx,js,jsx}')).forEach((file) =>
  parser.parseFuncFromString(
    readFileSync(file, 'utf-8'),
    { list: ['t'] },
    (key) => {
      parser.set(key)
    },
  ),
)

const writeTranslation = (filePath, translation) => {
  console.log(`Writing ${filePath}`)

  writeFileSync(
    filePath,
    JSON.stringify(
      sortKeys(translation, {
        deep: true,
        compare: (a, b) => a.localeCompare(b),
      }),
      null,
      2,
    ) + os.EOL,
  )
}

Object.entries(parser.get()).forEach(([language, namespaces]) => {
  Object.entries(namespaces).forEach(([namespace, translations]) => {
    const filePath = path.join(
      __dirname,
      `../public/locales/${language}/${namespace}.json`,
    )

    try {
      const existingTranslations = JSON.parse(readFileSync(filePath))

      writeTranslation(filePath, merge(translations, existingTranslations))
    } catch (error) {
      if (error.code === 'ENOENT') {
        writeTranslation(filePath, translations)
      } else {
        console.log(`Error parsing ${filePath}`, error)
      }
    }
  })
})
