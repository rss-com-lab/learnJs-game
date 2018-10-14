import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './ProgressLine.css';

const ProgressLine = () => {
  return (
    <div className="progress-line">
      <div className="progress-line__item">
        <FontAwesomeIcon icon="circle" className="progress-line__item_dot" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="circle" className="progress-line__item_dot" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="star" className="progress-line__item_star" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="star" className="progress-line__item_star" />
      </div>
      <div className="progress-line__item">
        <FontAwesomeIcon icon="star" className="progress-line__item_star" />
      </div>
    </div>
  );
};

export default ProgressLine;
