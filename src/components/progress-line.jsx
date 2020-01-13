import React, {Component} from 'react';

import '../style/app.scss';

class ProgressLine extends Component {
  render() {
    let questions = [];

    for (let i = 0; i < this.props.questions; i++) {
      questions.push(
        <div className="progress-line-item" key={i}>
          {i}
        </div>,
      );
    }

    let coloredArray = this.props.colors.map(item => {
      return item ? '#ffffff' : '#f4ea77';
    });

    function color(i) {
      return {backgroundColor: coloredArray[i]};
    }

    return (
      <div className="progress-line">
        {questions.map((item, index) => (
          <div
            className="progress-line-item"
            style={color(index)}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default ProgressLine;
