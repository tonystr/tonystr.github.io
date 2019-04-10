import React, { useState, useEffect } from 'react';
import ParseTart from 'react-markdown/with-html';  // react-markdown
import CodeBlock from './codeblock';
import { requestRawText, A } from './global.js';

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}.tart`
        , res => {
            setMarkdown(res);
        });
    }, []);

    return (
        <>
            <div> Found article "{props.article.name}", tags: {JSON.stringify(props.article.tags)} </div>
            <ParseTart
                source={markdown}
                linkTarget='_blank'
                renderers={{ code: CodeBlock, inlineCode: CodeBlock, link: A }}
                className='rendered-markdown'
                escapeHtml={false}
            />
        </>
    );
}
