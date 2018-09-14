import React from 'react'
import  marked from '../../node_modules/marked/lib/marked.js'
const renderer = new marked.Renderer();
const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}
export default Preview