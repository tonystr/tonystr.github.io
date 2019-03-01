import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.scss';
import './highlightjs/styles/atom-one-dark.css';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Home} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
