import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import { requestRawText, A, SectionTitle, Focus, Header } from './global.jsx';
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
    <div {...props} className='article-title section-header' />
);

function ArticleMedia(props) {

    const typeMatch = props.src.match(/\.(\w+)$/);
    const type = typeMatch ? typeMatch[1] : null;

    const renderers = [{
        matches: ['mp4', 'webm', 'ogg'],
        render: props => {
            let alt = props.alt || '';
            const match = alt.match(/!thumbnail\(([^)]+)\)/);

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

function TableOfContents(props) {

    if (!props.contents) return null;

    const [current, setCurrent] = useState(null);

    let contents = []
    let lis = [];
    for (const content of props.contents) {
        lis.push(
            <li
                className={
                    (!!~content.className.indexOf('article-title') ? 'title' : '') +
                    (content === current ? ' current' : '')
                }
                children={content.innerText}
            />
        );
        contents.push(content);
    }

    useEffect(() => {
        let ticking = false;
        window.onScrollListeners.push(e => {
            if (!ticking) {
                // e.target.scrollTop
                //console.log(e.target.scrollTop);
                ticking = true;

                for (const content of contents) {
                    const rect = content.getBoundingClientRect();
                    console.log('rect.top:', rect.top);
                    if (e.target.scrollTop - 3000 > rect.top) {
                        console.log('set new current');
                        setCurrent(content);
                    }
                }

                setTimeout(() => {
                    ticking = false;
                }, 1500);
            }
        });
    }, [ contents ]);

    return (
        <aside id='table-of-contents'>
            <ul>{lis}</ul>
        </aside>
    );
}

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);
    const [focus, setFocus]       = useState(null);
    const [sections, setSections] = useState(null);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}.md`
        , setMarkdown);

        const scr = document.createElement('script');
        scr.src = 'https://cdn.commento.io/js/commento.js';
        (document.head || document.body).appendChild(scr);
    }, []);

    useEffect(() => {
        document.querySelectorAll('.rendered-markdown .video video').forEach(video => {
            video.addEventListener('mouseover', () => video.play());
            video.addEventListener('mouseout', () => video.pause());
            video.addEventListener('click', () => {
                setFocus(video.currentSrc);
            });
        });

        setSections(document.querySelectorAll('.section-header'));
    }, [ markdown ]);

    return (
        <>
            {focus && <Focus video={focus} dismount={() => setFocus(null)} />}
            <div className={focus ? 'blur' : ''}>
                <Header />
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
                <TableOfContents contents={sections} />
                <div className='commento-wrapper'><div id='commento' /></div>
            </div>
        </>
    );
}
