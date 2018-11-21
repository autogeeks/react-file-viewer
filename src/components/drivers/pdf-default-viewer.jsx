import React from 'react';

export default class PDFDefaultDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: `/pdfjs/web/viewer.html?file=${this.props.filePath}`,
    };
  }

  render() {
    return (
      <iframe title="PDFJSVIEWER" src={this.state.filePath} />
    );
  }
}
