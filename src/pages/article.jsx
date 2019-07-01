import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import {
    requestRawText,
    A,
    SectionTitle,
    ArticleTitle,
    Focus,
    Header,
    StandardPage,
    CodeBlock,
    ASCIITable
} from './global.jsx';
import 'intersection-observer'; // optional polyfill
import Observer from '@researchgate/react-intersection-observer';
import scrollIntoView from 'scroll-into-view-if-needed';

const runningCodeblock = {
    onChange: () => {},
    output: {
        text: '',
        push: (...args) => {
            let newLine = '';
            for (const data of args) {
                let newString = '';
                switch (typeof data) {
                    case 'string':
                        newString += data;
                        const lastChar = data.slice(-1);
                        if (lastChar === ':' || lastChar === ',') newString += ' ';
                        break;

                    case 'object' && Array.isArray(data) ? 'object' : null:
                        const array = data.map(d => typeof d === 'string' ? `'${d}'` : d);
                        newString += `[${array.join(', ')}]`;
                        break;

                    default:
                        newString += String(data);
                }
                newLine += newString;
            }
            console.log(newLine);
            runningCodeblock.output.text += newLine + '\n';
            runningCodeblock.onChange();
        },
        clear: () => runningCodeblock.output.text = ''
    }
}

const mediaComponents = {
    ASCIITable: <ASCIITable className='media' />
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
            alt = match ? alt.replace(match[0], '') : alt;

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
    },{
        matches: ['jsx'],
        render: props => {
            return mediaComponents[props.src.slice(0, -4)];
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
        copybox.readOnly = true;
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
                        (content.text === props.current ? ' current' : '') +
                        (content.text === 'Comments' ? ' comments' : '')
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
            <textarea id='copybox' value='test' readOnly={true} />
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

    useEffect(() => {
        Array.from(document.getElementsByClassName('codeblock-full')).forEach(cb => {
            const canExecute = cb.classList.contains('lang-js');

            const elm = document.createElement('div');
            elm.classList.add('codeblock-controls');

            const copyBox  = document.createElement('textarea');
            const spanCopy = document.createElement('span');

            copyBox.setAttribute('class', 'copybox');
            copyBox.value = cb.innerText;
            copyBox.readOnly = true;
            elm.appendChild(copyBox);

            spanCopy.classList.add('copy');
            spanCopy.setAttribute('title', 'copy to clipboard');
            spanCopy.addEventListener('click', () => {
                copyBox.focus();
                copyBox.select();
                document.execCommand('copy');
            });
            elm.appendChild(spanCopy);

            if (canExecute) {
                const spanRun  = document.createElement('span');
                spanRun.classList.add('run');
                spanRun.setAttribute('title', 'run code');
                spanRun.addEventListener('click', () => {

                    cb.classList.add('ran');

                    let divOut;
                    if (cb.nextSibling && cb.nextSibling.classList.contains('codeblock-output')) {
                        divOut = cb.nextSibling;
                    } else {
                        divOut = document.createElement('div');
                        divOut.classList.add('codeblock-output');
                        divOut.innerText = '';
                        if (cb.nextSibling) {
                            cb.parentElement.insertBefore(divOut, cb.nextSibling);
                        } else {
                            cb.parentElement.append(divOut);
                        }
                    }

                    const andy = document.createElement('div');

                    runningCodeblock.output.clear();
                    runningCodeblock.onChange = () => {
                        andy.innerText = runningCodeblock.output.text.replace(/\n/g, '-NLN**:o');
                        divOut.innerHTML = andy.innerText.replace(
                            /(^|[^\\])('(?:[^'\\]|\\.)*')/g,
                            '$1<span class="string">$2</span>'
                        ).replace(/-NLN\*\*:o/g, '<br>');
                    }

                    try {
                        eval(copyBox.value.replace(/console\.log/g, 'runningCodeblock.output.push'));
                    } catch (e) {
                        runningCodeblock.output.push(e);
                    }
                });

                elm.appendChild(spanRun);
            }

            cb.appendChild(elm);
        });
    }, [markdown]);

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
                            inlineCode: props => (<CodeBlock
                                {...props}
                                language='gml'
                                inline={true}
                            />),
                            link: A,
                            heading: props => props.level === 2 ?
                                <Observer {...observerOptions}>{SectionTitle(props)}</Observer> :
                                <Observer {...observerOptions}>{ArticleTitle(props)}</Observer>,
                            image: ps => (<ArticleMedia
                                {...ps}
                                pageName={props.article.name.toLowerCase()}
                                setFocus={setFocus}
                            />)
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
