import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './Buttons.css';

export const CloseBtn = () => {
  return (
    <div className="btn-container">
      <Link to="/menu" className="btn btn-large btn-close">
        <FontAwesomeIcon icon="times" />
      </Link>
    </div>
  );
};

export const FaqBtn = () => {
  return (
    <div className="btn-container">
      <Link to="/" className="btn btn-large btn-faq">
        <FontAwesomeIcon icon="question" />
      </Link>
    </div>
  );
};

export const CheckBtn = () => {
  return (
    <div className="btn-container">
      <div className="btn btn-large btn-check">
        <FontAwesomeIcon icon="check" />
      </div>
    </div>
  );
};

export const BackspaceBtn = () => {
  return (
    <div className="btn-container">
      <div className="btn btn-large btn-backspace">
        <FontAwesomeIcon icon="arrow-left" />
      </div>
    </div>
  );
};

export const DigitBtn = props => {
  return (
    <div className="btn-container">
      <div className="btn btn-small btn-digit">
        <p>{(props.value + 1) % 10}</p>
      </div>
    </div>
  );
};
