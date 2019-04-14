import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import CodeBlock from './codeblock';
import { requestRawText, A, SectionTitle, Focus } from './global.js';

const ArticleTitle = (props) => (
    <div {...props} className='article-title' />
);

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);
    const [focus, setFocus] = useState(null);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}.md`
        , setMarkdown);
    }, []);

    useEffect(() => {
        document.querySelectorAll('.rendered-markdown .video video').forEach(video => {
            video.addEventListener('mouseover', () => video.play());
            video.addEventListener('mouseout', () => video.pause());
            video.addEventListener('click', () => {
                setFocus(video.currentSrc);
            });
        });
    });

    return (
        <>
            {focus && <Focus video={focus} dismount={() => setFocus(null)} />}
            <div className={focus ? 'blur' : ''}>
                <Markdown
                    source={markdown}
                    linkTarget='_blank'
                    renderers={{
                        code: CodeBlock,
                        inlineCode: CodeBlock,
                        link: A,
                        heading: props => props.level === 2 ?
                            SectionTitle(props) :
                            ArticleTitle(props),
                    }}
                    className='rendered-markdown'
                    escapeHtml={false}
                />
            </div>
        </>
    );
}
