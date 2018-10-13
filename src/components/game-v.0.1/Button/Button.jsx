import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './Button.css';

const Button = props => {
  const getClassName = () => {
    return `btn ${props.type}-btn`;
  };

  const getIconName = () => {
    switch (props.type) {
      case 'close':
        return 'times';
      case 'faq':
        return 'question';
      default:
        return '';
    }
  };

  return (
    <div className={getClassName()}>
      <FontAwesomeIcon icon={getIconName()} size="2x" color="white" />
    </div>
  );
};

export default Button;
