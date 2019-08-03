import React from 'react';
import { Link } from 'react-router-dom'
import Focus        from '../components/Focus.jsx';
import A            from '../components/A.jsx';
import ArticleTitle from '../components/ArticleTitle.jsx';
import Header       from '../components/Header.jsx'
import StandardPage from '../components/StandardPage.jsx';
import '../styles/articles.scss';

function ArticleList(props) {
    const list = [];
    const location = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/articles/`;

    for (const article of props.json) {
        if (article.password) continue;

        let tags = article.tags.map(tag => <span>{tag}</span>);

        list.push(
            <Link to={'../a/' + article.name.toLowerCase()}>
                <li>
                    <div className='media'>
                        {article.thumbnail && <img src={`${location}${article.name.toLowerCase()}/${article.thumbnail}`} />}
                    </div>
                    <div className='text'>
                        <div className='title'><span>{article.displayName || article.name}</span></div>
                        <div className='summary'>{article.summary}</div>
                        <div className='tags'>{tags}</div>
                        <div className='timestamp'>{(new Date(article.timestamp)).toDateString().slice(4)}</div>
                    </div>
                </li>
            </Link>
        );
    }

    return <ul>{list}</ul>;
}

export default function Articles(props) {
    return (
        <>
            <Header />
            <StandardPage className='article-list'>
                <ArticleTitle> Articles </ArticleTitle>
                <ArticleList json={props.json} />
            </StandardPage>
        </>
    );
}
