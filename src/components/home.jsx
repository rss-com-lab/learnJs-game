import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import '../style/app.css';

class Home extends Component {
  render() {
    return (
    	<div className="game-wrapper game-wrapper_menu-page">
	        <ul className="game-menu">
	          <li className="menu-option"><Link to = "/game" className="menu-link">Играть</Link></li>
	          <li className="menu-option"><Link to = "/settings" className="menu-link">Настройки</Link></li>
	          <li className="menu-option"><Link to = "/score" className="menu-link">Достижения</Link></li>
	          <li className="menu-option"><Link to = "/exit" className="menu-link">Выход</Link></li>
	        </ul>

	        {this.props.children}
        </div>
    );
  }
}

export default Home;