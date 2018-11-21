import React from 'react';

export default class PDFDefaultDriver extends React.Component {
  constructor(props) {
    super(props);
    const path = `/pdfjs/web/viewer.html?file=${props.filePath.replace('?', '&')}`;

    this.state = {
      url: path,
    };
  }

  render() {
    return (
      <iframe title="PDFJSVIEWER" src={this.state.url} />
    );
  }
}
