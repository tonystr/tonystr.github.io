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
import Articles from './pages/articles.jsx';
import Snippets from './pages/snippets.jsx';
import Paint from './pages/paint.jsx';
import { WindowCenter, Footer, ASCIITable, Header, StandardPage } from './pages/global.jsx';
import articlesJSON from './data/articles.json';

function ValidatePage(props) {
    const location = (window.location.pathname.match(/\/([^/]*)\/?$/)[1] || '').toLowerCase();
    const article = articlesJSON.find(article => article.name.toLowerCase() === location);
    switch (location) {
        case 'articles': return <Articles json={articlesJSON} />;
        case 'snippets': return <Snippets />;
        case 'ascii': return (
            <>
                <Header />
                <StandardPage>
                    <ASCIITable />
                </StandardPage>
            </>
        );
        case 'paint': return <Paint />;
        case 'dracula': return <Dracula />;
        default: return article ?
            <ValidateArticle loc={location} article={article} /> :
            <WindowCenter> 404! Could not find any page or article by the name "{location}" </WindowCenter>;
    }
}

function ValidateArticle(props) {
    const [login, setLogin] = useState(null);

    const location = props.loc || (window.location.pathname.match(/\/([^/]*)\/?$/)[1] || '').toLowerCase();
    const article = props.article || articlesJSON.find(article => article.name.toLowerCase() === location);

    return article ?
        (!article.password || window.localStorage.getItem('article-password') === article.password ?
            <Article article={article} /> :
            <ArticleLogin article={article} attemptLogin={val => {
                window.localStorage.setItem('article-password', val);
                setLogin(val);
            }} />) :
        <WindowCenter> 404! Could not find any article by the name "{location}" </WindowCenter>;
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/:page' component={ValidatePage} />
            <Route exact path='/a/:article' component={ValidateArticle} />
            <Route exact path='/article/:article' component={ValidateArticle} />
            <Footer />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

//

// Read about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
