import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store/store';

import '../../style/app.css';
import './menu.css';

class Menu extends Component {
  isLoggedIn = () => store.getState().currentUser !== '';

  handleClick = e => {
    if (!this.isLoggedIn()) {
      e.preventDefault();
    }
  };

  listItemClass = () => (this.isLoggedIn() ? 'available' : 'not-available');

  render() {
    return (
      <div className="game-wrapper">
        <div className="menu-screen">
          <ul>
            <li>
              <Link
                to="/stages"
                className={this.listItemClass()}
                onClick={this.handleClick}>
                Играть
              </Link>
            </li>
            <li>
              <Link className="available" to="/register">
                Регистрация
              </Link>
            </li>
            <li>
              <Link className="available" to="/player">
                Войти
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={this.listItemClass()}
                onClick={this.handleClick}>
                Настройки
              </Link>
            </li>
            <li>
              <Link
                to="/score"
                className={this.listItemClass()}
                onClick={this.handleClick}>
                Полка
              </Link>
            </li>
            <li>
              <Link className="available" to="/shelve">
                Новая полка
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
