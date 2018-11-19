// Copyright (c) 2017 PlanGrid, Inc.

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import FileViewer from './components/file-viewer';
import sampleHouse from '../example_files/SampleHouse.wexbim';
import solarImage from '../example_files/02-USVI-Solar.jpg';
import top from '../example_files/top.png'
import undef from '../example_files/undefined_object.png';
import docx from '../example_files/SampleSpec.docx';
import doc from '../example_files/sample.doc';
import csv from '../example_files/Total_Crime.csv';
import mp4 from '../example_files/small.mp4';
import xlsx from '../example_files/SimpleSpreadsheet.xlsx';
import photo360 from '../example_files/360photo.jpg';
import avi from '../example_files/drop.avi';
import webm from '../example_files/small.webm'
import mov from '../example_files/step.mov'
import mp3 from '../example_files/sample.mp3'
import rtf from '../example_files/sample.rtf';
import pdf from '../example_files/sample.pdf';

const getFileType = (file)=>{
  const extension = file.match(/([^./]+$)/);
  return extension[0];
}

class renderFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoading: false,
      files: []
    }

    this.files = [solarImage, top, pdf, mp4, docx, doc, avi, mp3, rtf, sampleHouse, undef, photo360, webm, mov];
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.files.map(file => {
      const fileType = getFileType(file);
      this.loadFiles(file, fileType);
    });
    this.setState({ isLoading: false });
  }

  loadFiles(file, fileType) {
    // Create XHR and FileReader objects
    var xhr = new XMLHttpRequest();

    xhr.open("GET", file, true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Load blob as Data URL
        this.readFiles(xhr.response, fileType, file);
      }
    }.bind(this);
    // Send XHR
    xhr.send();
  }

  readFiles(rawFile, fileType, fileUrl) {
    console.log(rawFile);
    // init reader
    const reader = new FileReader();
    // file to uri
    reader.readAsDataURL(rawFile);

    // file read success
    reader.onload = () => {
      const newFile = {
        data: reader.result,
        type: fileType,
        url: fileUrl
      }
      this.setState({ files: [...this.state.files, newFile] });
      return;
    };

    // read failed
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
  };

  render() {

    const active = this.state.active;
    const files = this.state.files;
    const isLoading = this.state.isLoading;
    const containerStyle = {
      width: '100%',
      height: '100%',
    }

    if (isLoading) return <div>loading...</div>
    if (files.length === this.files.length) {
      return (
        <div style={containerStyle}>
          <button disabled={active === 0} onClick={() => this.setState({ active: active - 1 })}>
            PREV
          </button>
          <button disabled={active === files.length - 1} onClick={() => this.setState({ active: active + 1 })}>
            NEXT
          </button>
          <FileViewer
            fileType={files[active].type}
            filePath={files[active].url}
          />
        </div>
      );
    } else {
      return <div>files load failed :/</div>
    }
  }
}

ReactDOM.render(
  React.createElement(renderFiles),
  window.document.getElementById('app')
);
