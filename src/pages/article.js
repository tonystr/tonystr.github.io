import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import Prism from './../prism.js';
import CodeBlock from './codeblock';
import { requestRawText } from './global.js';

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}.md`
        , res => {
            setMarkdown(res);
        });
    }, []);

    return (
        <>
            <div> Found article "{props.article.name}", tags: {JSON.stringify(props.article.tags)} </div>
            <ReactMarkdown
                source={markdown}
                renderers={{ code: CodeBlock, inlineCode: CodeBlock }}
                className='rendered-markdown'
            />
        </>
    );
}
