import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index';

import './index.css';
import App from './components/app';

import registerServiceWorker from './registerServiceWorker';


let store = createStore(reducer);


ReactDOM.render((
	<Provider store={ store }>
		<BrowserRouter>
	   		<App />
	    </BrowserRouter>
    </Provider>

), document.getElementById('root'));

registerServiceWorker();
