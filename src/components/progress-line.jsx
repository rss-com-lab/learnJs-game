import React, {Component} from 'react';

import '../style/app.css';

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
      return item ? '#f4ea77' : '#f73f38';
    });

    function color(i) {
      return {backgroundColor: coloredArray[i]};
    }

    return (
      <div className="progress-line">
        {questions.map((item, index) => (
          <div className="progress-line-item" style={color(index)} key={index}>
            {index + 1}
          </div>
        ))}
      </div>
    );
  }
}

export default ProgressLine;
