import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './prism.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Home from './pages/home.jsx';
import Article from './pages/article.jsx';
import ArticleLogin from './pages/article-login.jsx';
import Dracula from './pages/dracula.jsx';
import { WindowCenter } from './pages/global.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import articlesJSON from './data/articles';

function ValidateArticle(props) {

    const location = (window.location.pathname.match(/\/([^/]*)$/)[1] || '').toLowerCase();
    const article = articlesJSON.find(article => article.name.toLowerCase() === location);

    const [login, setLogin] = useState(null);

    const attemptLogin = val => {
        window.localStorage.setItem('article-password', val);
        setLogin(val);
    }

    if (article) {
        if (!article.password || window.localStorage.getItem('article-password') === article.password) {
            return <Article article={article} />;
        } else {
            return <ArticleLogin article={article} attemptLogin={attemptLogin} />;
        }
    } else {
        if (location === 'dracula') {
            return <Dracula />;
        } else {
            return <WindowCenter> Could not find any article by the name "{location}" </WindowCenter>;
        }
    }
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
