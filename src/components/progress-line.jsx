import React, {Component} from 'react';

import '../style/app.css';

class ProgressLine extends Component {
  /*constructor(props) {
	    super(props);
	}*/

  render() {
    var questions = [];

    for (var i = 0; i < this.props.questions; i++) {
      questions.push(
        <span className="progress-line-item" key={i}>
          {i}
        </span>,
      );
    }

    return (
      <div className="progress-line">
        {questions.map((item, index) => (
          <div className="progress-line-item" key={index}>
            {index + 1}
          </div>
        ))}
      </div>
    );
  }
}

export default ProgressLine;
