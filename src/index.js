import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './prism.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home';
import Article from './pages/article.js';
import { Scrollbars } from 'react-custom-scrollbars';
import json from './data/articles.json';

function ValidateArticle(props) {

    const location = (window.location.pathname.match(/\/([^/]*)$/)[1] || '').toLowerCase();
    const article = json.find(article => article.name.toLowerCase() === location);

    return article ? (
        <Article article={article} />
    ) : (
        <div> Could not find any article by the name "{location}" </div>
    );
}

ReactDOM.render(
    <Scrollbars style={{ height: '100vh' }}>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/:article' component={ValidateArticle} />
            </div>
        </BrowserRouter>
    </Scrollbars>,
    document.getElementById('root')
);

// Read about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
