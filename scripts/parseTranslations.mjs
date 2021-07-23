import os from 'os'
import { readFileSync, writeFileSync } from 'fs'
import { Parser } from 'i18next-scanner'
import glob from 'glob'
import path from 'path'
import merge from 'lodash/merge.js'
import sortKeys from 'sort-keys'
import { fileURLToPath } from 'url'
import {
  languages,
  defaultLanguage,
  translationNamespaces,
} from '../src/config.js'

const parser = new Parser({
  ns: translationNamespaces,
  defaultNs: translationNamespaces[0],
  lngs: languages.map(({ id }) => id),
  defaultLng: defaultLanguage.id,
})

const dirname = path.dirname(fileURLToPath(import.meta.url))

glob.sync(path.join(dirname, '../src/**/*.{ts,tsx,js,jsx}')).forEach((file) =>
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
      dirname,
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
