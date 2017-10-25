import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import store from '../store/store'
import { maxnumberIncreased, maxnumberDecreased } from '../actions/maxnumber_actions'
import { timeoutIncreased, timeoutDecreased } from '../actions/timeout_actions'
import { complexitySelected } from '../actions/complexity_actions'
import closeBtn from '../img/close-btn.png';

import '../style/app.css';

const mapStateToProps = (state) => {
    return {
        timeout: state.timeout,
        progress: state.progress,
        complexity: state.complexity,
        maxnumber: state.maxnumber,
        gameStatus: state.gameStatus
    }
}

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { value: store.getState().complexity }
  }

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  select = (e) => {
    store.dispatch(complexitySelected(parseInt(e.target.value, 10)));
    this.setState({
      value: store.getState().complexity
    });
  }

  maxnumberIncreased = () => {
    store.dispatch(maxnumberIncreased());
  }

  maxnumberDecreased = () => {
    store.dispatch(maxnumberDecreased());
  }

  timeoutIncreased = () => {
    store.dispatch(timeoutIncreased());
  }

  timeoutDecreased = () => {
    store.dispatch(timeoutDecreased());
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    let maxnumber = store.getState().maxnumber;
    let timeout = store.getState().timeout;
    
    return (
      <div className="game-wrapper">
       <div className="header">
          <Link to = "/" className="close-btn"><img className="close-btn-image" src={ closeBtn } alt={"Close"}/></Link>
        </div>
      <div className="settings-title">Настройки игры</div>
        <ul className="seetings-list">
          <li className="settings-item">
            <div className="settings-item-description">Количество уровней в игре</div>
            <div className="settings-buttons">
              <label><input onChange={ this.select } name="level" type="radio" value="1" checked={this.state.value === 1}/>1</label>
              <label><input onChange={ this.select } name="level" type="radio" value="2" checked={this.state.value === 2}/>2</label>
              <label><input onChange={ this.select } name="level" type="radio" value="3" checked={this.state.value === 3}/>3</label>
            </div>
          </li>
          <li className="settings-item">
            <div className="settings-item-description">Установите максимальное число для задач</div>
            <div className="settings-buttons">
              <div className="settings-add-button" onClick={this.maxnumberDecreased}>-</div>
              <div className="settings-selected">{ maxnumber }</div>
              <div className="settings-add-button" onClick={this.maxnumberIncreased}>+</div>
            </div>
          </li>
          <li className="settings-item">
            <div className="settings-item-description">Время ответа на один вопрос</div>
            <div className="settings-buttons">
              <div className="settings-add-button" onClick={this.timeoutDecreased}>-</div>
              <div className="settings-selected">{ timeout }</div>
              <div className="settings-add-button" onClick={this.timeoutIncreased}>+</div>
            </div>
          </li>
        </ul>
      </div>
      );
  }
}

export default connect(mapStateToProps)(Settings);