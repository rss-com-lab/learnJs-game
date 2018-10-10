import React from 'react';
import {Link} from 'react-router-dom';

import './close-btn.css';

const CloseBtn = () => {
  return (
    //<Link to="/menu">
    <svg>
      <circle cx="25px" cy="25px" r="20px" fill="#c4323d" />
    </svg>
    //</Link>
  );
};

export default CloseBtn;
