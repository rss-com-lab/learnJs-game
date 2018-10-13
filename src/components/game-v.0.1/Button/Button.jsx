import React from 'react';

import './Button.css';

const Button = props => {
  const getClassName = () => {
    return `btn ${props.type}`;
  };

  return <div className={getClassName()} />;
};

export default Button;
