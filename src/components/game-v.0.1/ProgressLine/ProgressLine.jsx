import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './ProgressLine.css';

const ProgressLine = () => {
  return (
    <div className="progress-line">
      <div className="progress-line__item">
        <FontAwesomeIcon icon="circle" color="#0cb3c6" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="circle" color="#0cb3c6" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="star" size="2x" color="#fdd14c" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="star" size="2x" color="#fdd14c" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="star" size="2x" color="#fdd14c" />
      </div>
    </div>
  );
};

export default ProgressLine;
