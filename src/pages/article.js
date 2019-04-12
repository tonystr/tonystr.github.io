import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import CodeBlock from './codeblock';
import { requestRawText, A, SectionTitle, Focus } from './global.js';

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);
    const [focus, setFocus] = useState(null);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}.tart`
        , setMarkdown);
    }, []);

    useEffect(() => {
        document.querySelectorAll('.rendered-markdown .video video').forEach(video => {
            video.addEventListener('mouseover', () => video.play());
            video.addEventListener('mouseout', () => video.pause());
            video.addEventListener('click', () => {
                console.log(video);
                setFocus(<Focus video={video.currentSrc} />);
            });
        });
    });

    return (
        <>
            {focus}
            <div className={focus ? 'blur' : ''}>
                <Markdown
                    source={markdown}
                    linkTarget='_blank'
                    renderers={{
                        code: CodeBlock,
                        inlineCode: CodeBlock,
                        link: A ,
                        heading: SectionTitle
                    }}
                    className='rendered-markdown'
                    escapeHtml={false}
                />
            </div>
        </>
    );
}
