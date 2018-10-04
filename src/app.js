// Copyright (c) 2017 PlanGrid, Inc.

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import FileViewer from './components/file-viewer';
import sampleHouse from '../example_files/SampleHouse.wexbim';
import solarImage from '../example_files/02-USVI-Solar.jpg';
import top from '../example_files/top.png'
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
  return file.substr(file.length - 3)
}

class renderFiles extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: 0
    }
  }

  render() {
    const files = [top,solarImage,csv,pdf,mp4]; 
    const active = this.state.active;
    return (
      <div>
      <button onClick={()=> this.setState({active: this.state.active +1})}>
        RENDER
      </button>
    <FileViewer
      fileType={getFileType(files[active])}
      filePath={files[active]}
    />
    </div>
    )
  }
}

ReactDOM.render(
  React.createElement(renderFiles),
  window.document.getElementById('app')
);
