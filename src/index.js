import React, { useState, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './prism.css';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import articlesJSON from './data/articles.json';
import Footer       from './components/Footer.jsx';
import WindowCenter from './components/WindowCenter.jsx';
import PageLoading  from './components/PageLoading.jsx';
const Header        = lazy(() => import('./components/Header.jsx'));
const StandardPage  = lazy(() => import('./components/StandardPage.jsx'));
const ASCIITable    = lazy(() => import('./components/ASCIITable.jsx'));
const Home          = lazy(() => import('./pages/home.jsx'));
const Article       = lazy(() => import('./pages/article.jsx'));
const ArticleLogin  = lazy(() => import('./pages/article-login.jsx'));
const Dracula       = lazy(() => import('./pages/dracula.jsx'));
const Articles      = lazy(() => import('./pages/articles.jsx'));
const Snippets      = lazy(() => import('./pages/snippets.jsx'));
const Paint         = lazy(() => import('./pages/paint.jsx'));

function ValidatePage(props) {
    const location = (window.location.pathname.match(/\/([^/]*)\/?$/)[1] || '').toLowerCase();
    const article = articlesJSON.find(article => article.name.toLowerCase() === location);
    switch (location) {
        case '': return <Home />;
        case 'articles': return <Articles json={articlesJSON} />;
        case 'snippets': return <Snippets />;
        case 'page_loading': return <PageLoading />;
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
            <Article article={article} login={login} /> : (
            <ArticleLogin article={article}
                attemptLogin={val => {
                    window.localStorage.setItem('article-password', val);
                    setLogin(val);
                }}
            />
        )) :
        <WindowCenter> 404! Could not find any article by the name "{location}" </WindowCenter>;
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Suspense fallback={<PageLoading />}>
                <Route exact path='/' component={ValidatePage} />
                <Route exact path='/:page' component={ValidatePage} />
                <Route exact path='/a/:article' component={ValidateArticle} />
                <Route exact path='/article/:article' component={ValidateArticle} />
                <Footer />
            </Suspense>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

// Read about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
