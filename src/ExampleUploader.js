import React, { Component } from 'react';
import axios from "axios/index";

class ExampleUploader extends Component {
  constructor() {
    super();
    this.state = {
      files: null,
      file: null
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  componentDidMount() {
    this.refreshFileList();
  }

  refreshFileList = () => {
    axios.get('api/files').then((res) => {this.setState({files:res.data})});
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.fileUpload(this.state.file);
  };

  fileUpload = (file) => {
    const url = 'api/file';
    const formData = new FormData();
    formData.append('file',file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post(url, formData,config).then(()=>{
      this.refreshFileList();
    });
  };


  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  };

  drawUploadButton = () => {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  };

  drawList = () => {
    return (
      <ul>
        {this.state.files ? this.state.files.map(file=>{return <li>{file}</li>}) : ''}
      </ul>
    )

  };

  render () {


    return (
      <div>
        {this.drawUploadButton()}
        <div>
          {this.drawList()}
        </div>
      </div>
    )
  }
}

export default ExampleUploader;