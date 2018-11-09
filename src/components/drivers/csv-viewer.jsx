// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import ReactDataGrid from 'react-data-grid';
import CSV from 'comma-separated-values';
import { dataURItoText } from '../../utils/decodeHelper';

class CsvViewer extends Component {
  static parse(filePath, fileType) {
    const rows = [];
    const columns = [];
    const data = fileType === 'csv' ? dataURItoText(filePath) : filePath;

    new CSV(data).forEach((array) => {
      if (columns.length < 1) {
        debugger;
        array.forEach((cell, idx) => {
          columns.push({
            key: `key-${idx}`,
            name: cell,
            resizable: true,
            sortable: true,
            filterable: true,
          });
        });
      } else {
        const row = {};
        array.forEach((cell, idx) => {
          row[`key-${idx}`] = cell;
        });
        rows.push(row);
      }
    });

    return { rows, columns };
  }

  constructor(props) {
    super(props);
    this.state = CsvViewer.parse(props.filePath, props.fileType);
  }

  componentWillUpdate(prevProps) {
    if (this.props.filePath !== prevProps.filePath) {
      console.log(CsvViewer.parse(this.props.filePath, this.props.fileType));
      // this.setState(CsvViewer.parse(this.props.filePath, this.props.fileType));
    }
  }

  render() {
    const { rows, columns } = this.state;
    return (
      <ReactDataGrid
        columns={columns}
        rowsCount={rows.length}
        rowGetter={i => rows[i]}
        minHeight={this.props.height || 650}
      />
    );
  }
}

export default CsvViewer;
