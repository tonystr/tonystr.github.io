import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import { requestRawText, A, SectionTitle, ArticleTitle, Focus, Header, StandardPage, CodeBlock } from './global.jsx';
import 'intersection-observer'; // optional polyfill
import Observer from '@researchgate/react-intersection-observer';
import scrollIntoView from 'scroll-into-view-if-needed';

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

function ArticleContent(props) {

    const [markdown, setMarkdown] = useState(null);
    const [focus, setFocus]       = useState(null);

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${props.article.name.toLowerCase()}/index.md`
        , res => {
            setMarkdown(res);

            const sectLines = res.match(/(?:^|[^\\])#+\s+[^\n\r]+/g);
            let sects = [];
            sectLines.forEach((s, i) => sects[i] = {
                text:  s.match(/#+\s+([^\n]+)$/)[1],
                level: s.match(/#+/)[0].length
            });
            sects.push({ text: 'Comments', level: 2 });
            props.setSections(sects);
        });

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
    }, []);

    const observerOptions = {
        onChange: props.observerOnChange,
        root: '#root',
        rootMargin: '57% 0% -42%'
    };

    return (
        <>
            {focus && <Focus video={focus} dismount={() => setFocus(null)} />}
            <div className={focus ? 'blur' : ''}>
                <Header />
                <StandardPage>
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
                </StandardPage>
                <Observer {...observerOptions}><div className='section-header hidden'>Comments</div></Observer>
                <div className='wpac-wrapper'><div id='wpac-comment' /></div>
            </div>
        </>
    );
}

export default function Article(props) {
    const [showTOC,    setShowTOC   ] = useState(true);
    const [sections,   setSections  ] = useState(null);
    const [currentTOC, setCurrentTOC] = useState('');
    const [lastWindowY, setLastWindowY] = useState(false);

    useEffect(() => {
        const check = e => {
            let isEnough = window.innerWidth > 16 * 83;
            if (showTOC !== isEnough) setShowTOC(isEnough);
        }
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <>
            <ArticleContent
                setSections={setSections}
                observerOnChange={e => {
                    if (
                        e.isIntersecting &&
                        currentTOC !== e.target.innerText &&
                        !document.getElementById('sqroisd-vx63')
                    ) {
                        setCurrentTOC(e.target.innerText);
                        const div = document.createElement('div');
                        div.setAttribute('id', 'sqroisd-vx63');
                        document.body.append(div);
                        // You have @researchgate/react-intersection-observer to thank for this...
                        setTimeout(() => document.body.removeChild(div), 60);
                    }
                }}
                article={props.article}
            />
            {showTOC && (<div>
                <TableOfContents
                    style={{ 'height': '100vh' }}
                    contents={sections}
                    current={currentTOC}
                />
            </div>)}
        </>
    );
}
