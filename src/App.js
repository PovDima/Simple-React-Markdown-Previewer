import React, { Component } from 'react';
import './App.css';
import  marked from '../node_modules/marked/lib/marked.js'
import Toolbar from './component/Toolbar.js'
import Editor from './component/Editor.js'
import Preview from './component/Preview.js'
import placeholder from './text.js'

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized ? 
          ['editorWrap maximized', 
           'previewWrap hide', 
           'fa fa-compress'] : 
          this.state.previewMaximized ?
          ['editorWrap hide', 
           'previewWrap maximized', 
           'fa fa-compress'] :
          ['editorWrap', 
           'previewWrap', 
           'fa fa-arrows-alt'];
    return (
      <div>
        <div className={classes[0]}>
          <Toolbar 
            icon={classes[2]} 
            onClick={this.handleEditorMaximize}
            text="Editor"/>
          <Editor markdown={this.state.markdown} 
            onChange={this.handleChange} />
        </div>
        <div className="converter">
        </div>
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]} 
            onClick={this.handlePreviewMaximize}
            text="Previewer"/>
          <Preview  markdown={this.state.markdown}/>
        </div>
      </div>
    )
  }
};

export default App;
