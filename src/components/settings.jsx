/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import store from '../store/store';
import {timeoutIncreased, timeoutDecreased} from '../ducks/timeout';
import {complexitySelected} from '../ducks/complexity';
import {themeSelected} from '../ducks/theme';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import '../style/app.css';

const mapStateToProps = state => {
  return {
    timeout: state.timeout,
    complexity: state.complexity,
  };
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: store.getState().complexity,
      theme: store.getState().theme,
      placeholder: typeof store.getState().theme === 'object' ? '...' : store.getState().theme,
      default: null,
      themes: [],
    };
  }

  createOptions = () => {
    fetch(
      'https://raw.githubusercontent.com/rss-com-lab/learnJs-game-data/master/questions-all.json',
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        let temp = [];
        temp.push({value: null, label: 'Все темы'});
        for (let i = 0; i < data.questionType.open.data.length; i++) {
          if (
            data.questionType.open.data[i].complexity ===
            `${store.getState().complexity}`
          ) {
            temp.push({
              value: data.questionType.open.data[i].theme,
              label: data.questionType.open.data[i].theme,
            });
          }
        }
        for (let i = 0; i < data.questionType.close.data.length; i++) {
          if (
            data.questionType.close.data[i].complexity ===
            `${store.getState().complexity}`
          ) {
            temp.push({
              value: data.questionType.close.data[i].theme,
              label: data.questionType.close.data[i].theme,
            });
          }
        }
        let themes = temp.reduce((unique, el) => {
          if (
            !unique.some(
              obj => obj.label === el.label && obj.value === el.value,
            )
          ) {
            unique.push(el);
          }
          return unique;
        }, []);
        this.setState({themes: themes});
      });
  };

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  componentWillMount = () => {
    this.createOptions();
  };
 

  select = e => {
    store.dispatch(complexitySelected(parseInt(e.target.value, 10)));
    store.dispatch(themeSelected({value: null}));
    this.setState({
      value: store.getState().complexity,
      theme: store.getState().theme,
      placeholder: '...',
      default: null,
    });
    console.log(this.state);
    this.createOptions();
  };

  selectTheme = theme => {
    store.dispatch(themeSelected(theme));
    this.setState({
      theme: store.getState().theme,
      default: theme,
    });
  };

  timeoutIncreased = () => {
    store.dispatch(timeoutIncreased());
  };

  timeoutDecreased = () => {
    store.dispatch(timeoutDecreased());
  };

  render() {
    let timeout = store.getState().timeout;
    return (
      <div className="game-wrapper">
        <div className="header">
          <Link to="/menu" className="close-btn" />
        </div>
        <div>Настройки игры</div>
        <ul className="settings-list">
          <li className="settings-item">
            <div className="settings-item-description">
              Сложность
            </div>
            <FormControl component="fieldset">
              <RadioGroup
                name="complexity"
                value={`${this.state.value}`}
                onChange={this.select}
                row>
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="Легко"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="Нормально"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label="Сложно"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
            {/* <div className="settings-buttons">
              <div>
                <input
                  onChange={this.select}
                  name="level"
                  type="radio"
                  value="1"
                  checked={this.state.value === 1}
                />
                Basic
              </div>
              <div>
                <input
                  onChange={this.select}
                  name="level"
                  type="radio"
                  value="2"
                  checked={this.state.value === 2}
                />
                Intermediate
              </div>
              <div>
                <input
                  onChange={this.select}
                  name="level"
                  type="radio"
                  value="3"
                  checked={this.state.value === 3}
                />
                Advanced
              </div>
            </div> */}
          </li>
          <li className="settings-item">
            <div className="settings-item-description">Тема</div>
            <Select
              value={this.state.default}
              options={this.state.themes}
              className="settings-item__topic-select"
              placeholder={this.state.placeholder}
              onChange={this.selectTheme}
            />
          </li>
          <li className="settings-item">
            <div className="settings-item-description">
              Время ответа на один вопрос
            </div>
            <div className="settings-buttons">
              <div
                className="settings-add-button"
                onClick={this.timeoutDecreased}>
                -
              </div>
              <div className="settings-selected">{timeout}</div>
              <div
                className="settings-add-button"
                onClick={this.timeoutIncreased}>
                +
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Settings);
