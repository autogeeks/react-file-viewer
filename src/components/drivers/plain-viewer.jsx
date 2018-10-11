// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';

import { dataURItoText } from '../../utils/decodeHelper'

const PlainViewer = (props) => {
    const data = dataURItoText(props.filePath);

    return (
      <div>{data}</div>
    );
}

export default PlainViewer;
