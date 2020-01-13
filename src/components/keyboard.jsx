import React, {Component} from 'react';

import '../style/app.scss';

class Keyboard extends Component {
  render() {
    if (this.props.questionType !== 'selective') {
      return (
        <div>
          <div className="keyboard-row">
            <div className="keyboard-cell">7</div>
            <div className="keyboard-cell">8</div>
            <div className="keyboard-cell">9</div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-cell">4</div>
            <div className="keyboard-cell">5</div>
            <div className="keyboard-cell">6</div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-cell">1</div>
            <div className="keyboard-cell">2</div>
            <div className="keyboard-cell">3</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="keyboard-row">
            <div className="keyboard-cell cell-selective">
              {this.props.answers[0]}
            </div>
            <div className="keyboard-cell cell-selective">
              {this.props.answers[1]}
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-cell cell-selective">
              {this.props.answers[2]}
            </div>
            <div className="keyboard-cell cell-selective">
              {this.props.answers[3]}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Keyboard;
