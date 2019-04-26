import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import { requestRawText, A, SectionTitle, ArticleTitle, Focus, Header } from './global.jsx';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import { Scrollbars } from 'react-custom-scrollbars';
import 'intersection-observer'; // optional polyfill
import Observer from '@researchgate/react-intersection-observer';
import scrollIntoView from 'scroll-into-view-if-needed';

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

function ArticleMedia(props) {

    const typeMatch = props.src.match(/\.(\w+)$/);
    const type = typeMatch ? typeMatch[1] : null;
    const src = props.src.startsWith('./') ?
        `articles/${props.pageName}${props.src.slice(1)}` :
        props.src;

    const renderers = [{
        matches: ['mp4', 'webm', 'ogg'],
        render: props => {
            let alt = props.alt || '';
            const match = alt.match(/!thumbnail\(([^)]+)\)/);

            if (match) alt = alt.replace(match[0], '');

            return (
                <section className='video'>
                    <video
                        onClick={() => props.setFocus(src)}
                        onMouseOver={e => e.target.play()}
                        onMouseOut={e => e.target.pause()}
                        poster={match ? match[1] : ''}
                        loop
                    >
                        <source src={src} type={'video/' + type} />
                    </video>
                    <em>{alt}</em>
                </section>
            )
        }
    }];

    const renderer = renderers.find(renderer => renderer.matches.find(match => match === type));

    return renderer ? renderer.render(props) : (
        <div> no corrsepdonding media renderer found </div>
    );
}

function TableOfContents(props) {

    if (!props.contents) return null;

    const scrollToContent = e => {
        const node = [...document.querySelectorAll('.section-header')].find(node => node.innerText === e.target.innerText);
        scrollIntoView(node, { scrollMode: 'if-needed', behavior: 'smooth' });
    };

    const generateURL = e => {
        const copybox = document.querySelector('#copybox');
        copybox.value = `${window.location.href.replace(/#.+/, '')}#${e.target.parentNode.parentNode.querySelector('span.link').innerText.replace(/\s+/, '_')}`;
        copybox.focus();
        copybox.select();
        console.log(document.execCommand('copy'));
    }

    const renderlis = () => {
        let lis = [];
        for (const content of props.contents) {
            lis.push(
                <li
                    key={content.text}
                    className={
                        (content.level === 1 ? 'title' : '') +
                        (content.text === props.current ? ' current' : '')
                    }
                >
                    <span className='link' onClick={scrollToContent}>{content.text}</span>
                    <span onClick={generateURL}><i className="fas fa-link" /></span>
                </li>
            );
        }
        return lis;
    };

    const cur = props.contents.find(content => content.text === props.current);
    const hidden = cur && cur.level === 1 ? 'hidden' : '';

    return (
        <aside id='table-of-contents' className={hidden}>
            <ul>{renderlis()}</ul>
            <textarea id='copybox' vale='test' />
        </aside>
    );
}

export default function Article(props) {

    const [markdown, setMarkdown] = useState(null);
    const [focus, setFocus]       = useState(null);
    const [sections, setSections] = useState(null);
    const [currentSection, setCurrentSection] = useState(null);
    const [currentTicking, setCurrentTicking] = useState(false);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}/index.md`
        , setMarkdown);

        window.wpac_init = window.wpac_init || [];
        window.wpac_init.push({widget: 'Comment', id: 18172});
        if ('WIDGETPACK_LOADED' in window) return;
        window.WIDGETPACK_LOADED = true;
        var mc = document.createElement('script');
        mc.type = 'text/javascript';
        mc.async = true;
        mc.src = 'https://embed.widgetpack.com/widget.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);

        setTimeout(() => {
            const lis = document.querySelectorAll('.wp-login-menu li');
            for (const li of lis) {
                if (li.innerText === 'Get WidgetPack') li.parentNode.removeChild(li);
            }
        }, 3100);

        // <a href="https://widgetpack.com" class="wpac-cr">Comments System WIDGET PACK</a>
    }, []);

    useEffect(() => {
        if (markdown) {
            const sectLines = markdown.match(/(?:^|[^\\])#+\s+[^\n\r]+/g);
            let sects = [];
            sectLines.forEach((s, i) => sects[i] = { text: s.match(/#+\s+([^\n]+)$/)[1], level: s.match(/#+/)[0].length });
            setSections(sects);
        }
    }, [ markdown ]);

    const observerOptions = {
        onChange: e => {
            if (!currentTicking && e.isIntersecting && currentSection !== e.target.innerText) {
                setCurrentSection(e.target.innerText);
                setCurrentTicking(true);
                setTimeout(() => {
                    setCurrentTicking(false);
                }, 460);
            }
        },
        root: '#root',
        rootMargin: '57% 0% -42%'
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
                        image: ps => (
                            <ArticleMedia
                                {...ps}
                                pageName={props.article.name.toLowerCase()}
                                setFocus={setFocus}
                            />
                        )
                    }}
                    className='rendered-markdown'
                    escapeHtml={false}
                />
                <div className='wpac-wrapper'><Observer {...observerOptions}><div id='wpac-comment' /></Observer></div>
                <div>
                    <TableOfContents style={{ 'height': '100vh' }} contents={sections} current={currentSection} />
                </div>
            </div>
        </>
    );
}
