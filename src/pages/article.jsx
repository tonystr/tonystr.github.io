import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import { requestRawText, A, SectionTitle, Focus } from './global.jsx';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import { Scrollbars } from 'react-custom-scrollbars';

function CodeBlock(props) {

    const hl = (
        <SyntaxHighlighter
            className={'code ' + (props.inline ? 'inline' : '')}
            language={props.language || null}
            style={styleOneDark}
        >
            {props.value}
        </SyntaxHighlighter>
    );

    const renderThumb = props => {
        return <div className='scroll-thumb' {...props} />;
    }

    return (
        !props.inline ? (
            <Scrollbars
                autoHeight
                autoHeightMin={46}
                autoHeightMax={700}
                // autoWidth
                // autoWidthMax={100}
                renderThumbHorizontal={renderThumb}
                renderThumbVertical={renderThumb}
                className='code block'
            >
                {hl}
            </Scrollbars>
        ) : hl
    );
}

const ArticleTitle = (props) => (
    <div {...props} className='article-title' />
);

function ArticleMedia(props) {

    const typeMatch = props.src.match(/\.(\w+)$/);
    const type = typeMatch ? typeMatch[1] : null;

    const renderers = [{
        matches: ['mp4', 'webm', 'ogg'],
        render: props => {
            let alt = props.alt || '';
            const match = alt.match(/\!thumbnail\(([^)]+)\)/);

            if (match) alt = alt.replace(match[0], '');

            return (
                <section className='video'>
                    <video loop poster={match ? match[1] : ''}>
                        <source src={props.src} type={'video/' + type} />
                    </video>
                    <em>{alt}</em>
                </section>
            )
        }
    }];

    const renderer = renderers.find(renderer => renderer.matches.find(match => match === type));

    return renderer ? renderer.render(props) : (
        <div> no corrsepdmedia renderer found </div>
    );
}

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
                        inlineCode: props => <CodeBlock {...props} language='gml' />,
                        link: A,
                        heading: props => props.level === 2 ?
                            SectionTitle(props) :
                            ArticleTitle(props),
                        image: ArticleMedia
                    }}
                    className='rendered-markdown'
                    escapeHtml={false}
                />
            </div>
        </>
    );
}
