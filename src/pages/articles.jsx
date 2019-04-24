import React from 'react';
import { A, ArticleTitle, Focus, Header, Link } from './global.jsx';

function ArticleList(props) {
    const list = [];
    const location = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/articles/`;

    for (const article of props.json) {
        if (article.password) continue;

        list.push(
            <Link to={'../' + article.name.toLowerCase()}>
                <li>
                    <div className='media'>
                        {article.thumbnail && <img src={`${location}${article.name.toLowerCase()}/${article.thumbnail}`} />}
                    </div>
                    <div className='text'>
                        <div className='title'><span>{article.name}</span></div>
                        <div className='summary'>{article.summary}</div>
                    </div>
                </li>
            </Link>
        );
    }

    return <ul>{list}</ul>;
}

export default function Articles(props) {
    return (
        <div>
            <Header />
            <div className='article-list'>
                <ArticleTitle> Articles </ArticleTitle>
                <ArticleList json={props.json} />
            </div>
        </div>
    );
}
