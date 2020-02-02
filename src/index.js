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
const Header       = lazy(() => import('./components/Header.jsx'));
const StandardPage = lazy(() => import('./components/StandardPage.jsx'));
const ASCIITable   = lazy(() => import('./components/ASCIITable.jsx'));
const Home         = lazy(() => import('./pages/Home.jsx'));
const Article      = lazy(() => import('./pages/Article.jsx'));
const ArticleLogin = lazy(() => import('./pages/ArticleLogin.jsx'));
const Dracula      = lazy(() => import('./pages/Dracula.jsx'));
const Articles     = lazy(() => import('./pages/Articles.jsx'));
const Snippets     = lazy(() => import('./pages/Snippets.jsx'));
const Paint        = lazy(() => import('./pages/Paint.jsx'));
const Minesweeper  = lazy(() => import('./pages/Minesweeper.jsx'));
const Radicals     = lazy(() => import('./pages/Radicals.jsx'));
const Kanji        = lazy(() => import('./pages/Kanji.jsx'));

function ValidatePage(props) {
    const location = (window.location.pathname.match(/\/([^/]*)\/?$/)[1] || '').toLowerCase();
    const article = articlesJSON.find(article => article.name.toLowerCase() === location);

    return article ? <ValidateArticle loc={location} article={article} /> : null;
}

function ASCIIPage() {
    return (
        <>
            <Header />
            <StandardPage>
                <ASCIITable />
            </StandardPage>
        </>
    );
}

function ValidateArticle(props) {
    const [login, setLogin] = useState(null);

    const location = props.loc || (window.location.pathname.match(/\/([^/]*)\/?$/)[1] || '').toLowerCase();
    const article = props.article || articlesJSON.find(article => article.name.toLowerCase() === location);

    return article ? (
        !article.password || window.localStorage.getItem('article-password') === article.password ? (
            <Article article={article} login={login} />
        ) : (
            <ArticleLogin article={article} attemptLogin={val => {
                window.localStorage.setItem('article-password', val);
                setLogin(val);
            }} />
        )
    ) : <WindowCenter> 404! Could not find any article by the name "{location}" </WindowCenter>;
}

const fallback = <PageLoading />;

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Suspense fallback={fallback}>
                <Route exact path='/'                  component={Home} />
                <Route       path='/articles'          component={Articles} />
                <Route       path='/snippets'          component={Snippets} />
                <Route       path='/minesweeper'       component={Minesweeper} />
                <Route       path='/page_loading'      component={PageLoading} />
                <Route       path='/dracula'           component={Dracula} />
                <Route       path='/ascii'             component={ASCIIPage} />
                <Route       path='/paint'             component={Paint} />
                <Route       path='/kanji'             component={Kanji} />
                <Route       path='/radicals'          component={Radicals} />
                <Route exact path='/:page'             component={ValidatePage} />
                <Route exact path='/a/:article'        component={ValidateArticle} />
                <Route exact path='/article/:article'  component={ValidateArticle} />
                <Route exact path='/articles/:article' component={ValidateArticle} />
                <Footer />
            </Suspense>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

// Read about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
