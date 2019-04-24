import React from 'react';
import { A, ArticleTitle, Focus, Header } from './global.jsx';

function ArticleList(props) {
    const list = [];

    for (const article of props.json) {
        //if (!article.password)
        list.push(
            <li>
                <div className='media'>
                    {article.thumbnail && <img src={article.name.toLowerCase() + '/' + article.thumbnail} />}
                </div>
                <div className='text'>
                    <A to={'../' + article.name.toLowerCase()}>{article.name}</A>
                </div>
            </li>
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
