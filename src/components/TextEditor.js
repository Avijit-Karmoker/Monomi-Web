import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useTranslation } from 'react-i18next'

class EditorContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div className='editor'>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    )
  }
}

function TextEditor() {
  const { t } = useTranslation('community')

  return (
    <div>
      <label htmlFor=''>{t('community:description')}</label>
      <EditorContainer />
    </div>
  )
}

export default TextEditor
