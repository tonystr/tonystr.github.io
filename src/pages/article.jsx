import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import { requestRawText, A, SectionTitle, Focus, Header } from './global.jsx';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import { Scrollbars } from 'react-custom-scrollbars';
import ReactDOM from 'react-dom';
import 'intersection-observer'; // optional polyfill
import Observer from '@researchgate/react-intersection-observer'

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

    console.log("props.contents:");
    console.log(props.contents);

    const renderlis = () => {
        let lis = [];
        for (const content of props.contents) {
            lis.push(
                <li
                    className={
                        (content.level === 1 ? 'title' : '') +
                        (content.text === props.current ? ' current' : '')
                    }
                    children={content.text}
                />
            );
        }
        return lis;
    }

    return (
        <aside id='table-of-contents'>
            <ul>{renderlis()}</ul>
        </aside>
    );
}

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);
    const [focus, setFocus]       = useState(null);
    const [sections, setSections] = useState(null);
    const [currentSection, setCurrentSection] = useState(null);

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

        if (markdown) {
            const sectLines = markdown.match(/(?:^|[^\\])#+\s+[^\n\r]+/g);
            let sects = [];
            sectLines.forEach((s, i) => sects[i] = { text: s.match(/#+\s+([^\n]+)$/)[1], level: s.match(/#+/)[0].length });
            console.log(sects);
            setSections(sects);
        }
    }, [ markdown ]);

    const observerOptions = {
        onChange: e => {
            if (e.isIntersecting && currentSection !== e.target.innerText) setCurrentSection(e.target.innerText);
        },
        root: '#root',
        rootMargin: '0% 0% -25%'
    };

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
                            <Observer {...observerOptions}>{SectionTitle(props)}</Observer> :
                            <Observer {...observerOptions}>{ArticleTitle(props)}</Observer>,
                        image: ArticleMedia
                    }}
                    className='rendered-markdown'
                    escapeHtml={false}
                />
                <TableOfContents contents={sections} current={currentSection} />
                <div className='commento-wrapper'><div id='commento' /></div>
            </div>
        </>
    );
}
