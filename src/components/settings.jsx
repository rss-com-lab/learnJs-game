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
import FormLabel from '@material-ui/core/FormLabel';

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
            data.questionType.open.data[i].complexity ===
            store.getState().complexity
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
        this.setState({theme: this.state.themes[0].value});
        console.log(this.state.themes[0].value);
      });
  };

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  };

  componentWillMount = () => {
    this.createOptions();
  };

  select = e => {
    console.log(typeof this.state.value, typeof store.getState().complexity);
    store.dispatch(complexitySelected(parseInt(e.target.value, 10)));
    this.setState({
      value: store.getState().complexity,
    });
    this.createOptions();
    store.dispatch(themeSelected({value: null}));
  };

  selectTheme = theme => {
    store.dispatch(themeSelected(theme));
    this.setState({
      theme: store.getState().theme,
    });
  };

  timeoutIncreased = () => {
    store.dispatch(timeoutIncreased());
  };

  timeoutDecreased = () => {
    store.dispatch(timeoutDecreased());
  };

  componentWillUnmount = () => {
    this.unsubscribe();
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
              Выбери сложность задач
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
            <div className="settings-item-description">Выбери тему</div>
            <Select
              options={this.state.themes}
              className="settings-item__topic-select"
              placeholder={
                typeof store.getState().theme === 'string'
                  ? `${store.getState().theme}`
                  : '...'
              }
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
