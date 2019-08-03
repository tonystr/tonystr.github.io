import React, { useState, useEffect } from 'react';
import requestRawText from '../functions/requestRawText.jsx';
import ArticleTitle from '../components/ArticleTitle.jsx';
import CodeBlock    from '../components/CodeBlock.jsx';
import Header       from '../components/Header.jsx'
import StandardPage from '../components/StandardPage.jsx';
import snippetsJSON from '../data/snippets.json'

function SnippetList(props) {

    const snipRoot = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/snippets/`;

    const [snips, setSnips] = useState([]);

    useEffect(() => {
        let list = [];
        for (const snip of snippetsJSON) {
            console.log(`${snipRoot}${snip}.gml`);
            requestRawText(`${snipRoot}${snip}.gml`, res => {
                list.push(res);
                if (list.length >= snippetsJSON.length - 1) setSnips(list);
            });
        }
    }, []);

    let list = [];

    for (const snip of snips) {
        list.push(<CodeBlock language='gml' value={snip} />);
    }

    return list;
}

export default function Snippets(props) {
    return (
        <>
            <Header />
            <StandardPage>
                <ArticleTitle> Snippets </ArticleTitle>
                <SnippetList />
            </StandardPage>
        </>
    );
}
