// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import 'styles/photo-viewer.scss';

export default class PhotoViewer extends Component {

  constructor() {
    super();

    this.container = null;
    this.state = {
      visible: true,
      noClose: true,
      noNavbar: true,
      noImgDetails: true,
    };
  }

  componentDidMount() {
    this.setState({ visible: true });
  }

  getImageDimensions(originalWidth, originalHeight) {
    // Scale image to fit into viewer
    let imgHeight;
    let imgWidth;
    const { height: viewerHeight, width: viewerWidth } = this.props;

    if (originalHeight <= viewerHeight && originalWidth <= viewerWidth) {
      imgWidth = originalWidth;
      imgHeight = originalHeight;
    } else {
      const heightRatio = viewerHeight / originalHeight;
      const widthRatio = viewerWidth / originalWidth;
      if (heightRatio < widthRatio) {
        imgHeight = originalHeight * heightRatio;
        imgWidth = originalWidth * heightRatio;
      } else {
        imgHeight = originalHeight * widthRatio;
        imgWidth = originalWidth * widthRatio;
      }
    }

    return { height: imgHeight, width: imgWidth };
  }

  render() {
    const containerStyles = {
      width: '100%',
      height: '100%',
    };

    return (
      <div style={containerStyles}>
        <div className="container" style={containerStyles} ref={(el) => { this.container = el; }} />
        <Viewer
          container={this.container}
          visible={this.state.visible}
          noClose={this.state.noClose}
          noNavbar={this.state.noNavbar}
          noImgDetails={this.state.noImgDetails}
          images={[{ src: this.props.filePath, alt: '' }]}
        />
      </div>
    );
  }
}
