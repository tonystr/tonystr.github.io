import React from 'react';
import { Link } from 'react-router-dom'
import ArticleTitle from '../components/ArticleTitle.jsx';
import Header       from '../components/Header.jsx'
import StandardPage from '../components/StandardPage.jsx';
import '../styles/articles.scss';

function ArticleList(props) {
    const list = [];
    const location = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/articles/`;
    const skipHidden = window.location.port !== '3001' || window.location.search.includes('release');

    for (const article of props.json.reverse()) {
        if (skipHidden && article.password) continue;

        let tags = article.tags.map(tag => <span key={tag}>{tag}</span>);

        const date = article.timestamp ? (
            article.password ?
                'Estimated date: ' + (new Date(article.timestamp)).toDateString().slice(4) :
                fuzzyDate(new Date(article.timestamp))
        ) : 'Date unknown';

        list.push(
            <Link
                to={'../a/' + article.name.toLowerCase()}
                key={article.name}
            >
                <li>
                    <div className='media'>
                        {article.thumbnail && (<img
                            src={`${location}${article.name.toLowerCase()}/${article.thumbnail}`}
                            alt=''
                        />)}
                    </div>
                    <div className='text'>
                        <div className='title'><span>{article.displayName || article.name}</span></div>
                        <div className='summary'>{article.summary}</div>
                        <div className='tags'>{tags}</div>
                        <div className='timestamp'>{date}</div>
                    </div>
                </li>
            </Link>
        );
    }

    return <ul>{list}</ul>;
}

function fuzzyDate(date) {
    const delta = Math.round((new Date() - date) / 1000);

    const minute = 60;
    const hour   = minute * 60;
    const day    = hour * 24;
    const week   = day * 7;

    if (delta >= week * 2) return date.toDateString().slice(4);

    const cases = [
        d => d < 30         && 'just now',
        d => d < minute     && `${d} seconds ago`,
        d => d < minute * 2 && '1 minute ago',
        d => d < hour       && `${Math.floor(delta / minute)} minutes ago`,
        d => d < hour * 2   && '1 hour ago',
        d => d < day        && `${Math.floor(delta / hour)} hours ago`,
        d => d < day * 2    && 'yesterday',
        d => d < week       && `${Math.floor(delta / day)} days ago`,
        d => d < week * 2   && 'last week',
        // d => d < week * 4   && `${Math.floor(delta / week)} weeks ago`,
    ]

    for (const f of cases) {
        const fuzz = f(delta);
        if (fuzz) return fuzz;
    }

    return date.toDateString().slice(4);
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
