import React, { useState, useEffect, lazy, Suspense } from 'react';
import Markdown from 'react-markdown/with-html';  // react-markdown
import Focus        from '../components/Focus.jsx';
import A            from '../components/A.jsx';
import Header       from '../components/Header.jsx'
import StandardPage from '../components/StandardPage.jsx';
import ArticleTitle from '../components/ArticleTitle.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock    from '../components/CodeBlock.jsx';
import PageLoading  from '../components/PageLoading.jsx';
import Wpac         from '../components/Wpac.jsx';
import requestRawText from '../functions/requestRawText.jsx';
import '../styles/article.scss';
const WindowCenter = lazy(() => import('../components/WindowCenter.jsx'));
const components = {
    ASCIITable: lazy(() => import('../components/ASCIITable.jsx')),
    Autotiling: lazy(() => import('../components/Autotiling.jsx')),
    GrassTileStripImage: lazy(() => import('../components/GrassTileStripImage.jsx'))
}

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

                    case Array.isArray(data) ? 'object' : null:
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

function renderAlt(alt) {
    const out = [];
    let altStr = alt;
    const pattern = /\[([^\]]*?)\]\(([^)]*?)\)/;
    let match = alt.match(pattern);
    while (match !== null) {
        out.push(altStr.slice(0, match.index));
        out.push(<A to={match[2]}>{match[1]}</A>);
        altStr = altStr.slice(match.index + match[0].length);
        match = altStr.match(pattern);
    }
    out.push(altStr);
    return out;
}

function ImageSection(props) {
    const [style, setStyle] = useState(null);

    return (
        <section className={'image ' + (props.className || '')} style={style}>
            <img
                src={props.src}
                alt=''
                onLoad={e => setStyle({ width: e.target.width })}
            />
            {props.isDownload && (
                <div className='controls'>
                    <a href={props.src} download target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-download' />
                    </a>
                </div>
            )}
            {props.alt && <em>{renderAlt(props.alt)}</em>}
        </section>
    )
}

function ArticleMedia(props) {

    const type = (props.src.match(/\.(\w+)$/) || [0, null])[1];
    const src = props.src.startsWith('./') ?
        `${
            (document.location.pathname.match(/\//g) || ['/']).join('..').slice(1)
        }articles/${props.article.name.toLowerCase()}${props.src.slice(1)}` :
        props.src;

    let alt = props.alt || '';
    const thumbnail     = alt.match(/!thumbnail\(([^)]+)\)/i);
    if (thumbnail)  alt = alt.replace(thumbnail[0], '');
    const isPixelart    = alt.match(/!pixelart\b/i);
    if (isPixelart) alt = alt.replace(isPixelart[0], '');
    const isDownload    = alt.match(/!download\b/i);
    if (isDownload) alt = alt.replace(isDownload[0], '');
    const noShadow      = alt.match(/!noshadow\b/i);
    if (noShadow)   alt = alt.replace(noShadow[0], '');

    const renderers = [{
        matches: ['mp4', 'webm', 'ogg'],
        render: props => {

            return (
                <section className='video'>
                    <video
                        onClick={() => props.setFocus(src)}
                        onMouseOver={e => e.target.play()}
                        onMouseOut={e => e.target.pause()}
                        poster={thumbnail ? thumbnail[1] : ''}
                        loop
                    >
                        <source src={src} type={'video/' + type} />
                    </video>
                    {props.alt && <em>{renderAlt(props.alt)}</em>}
                </section>
            );
        }
    },{
        matches: ['jsx'],
        render: props => {
            const Component = components[props.src.slice(0, -4)] || (() => <div>Failed to Load React Component</div>);

            let componentProps = { _article: props.article };
            let str = props.alt.slice();

            while (str) {
                const match = props.alt && str.match(
                    /(\w+)={?(([`'"])[^\2]*\3|true|false|\d+\b)/
                );
                if (!match) break;
                componentProps[match[1]] = /^[`'"]/.test(match[2]) ?
                    match[2].slice(1, -1) : (
                        /true|false/.test(match[2]) ?
                            (match[2] === 'true' ? true : false) :
                            parseInt(match[2])
                    );
                str = str.slice(match.index + match[0].length);
            }

            return (
                <Suspense fallback={<div>Loading React Component...</div>}>
                    <Component {...componentProps} />
                </Suspense>
            );
        }
    },{
        matches: ['jpg', 'png', 'jpeg', ''],
        render: () => (
            <ImageSection
                src={src}
                alt={alt}
                isPixelart={isPixelart}
                isDownload={isDownload}
                className={
                    (noShadow ? 'noshadow' : '') +
                    (isPixelart ? ' pixelart': '')
                }
            />
        )
    }];

    const renderer = renderers.find(renderer => renderer.matches.find(match => match === type));

    return renderer ? renderer.render(props) : (
        <div> no corrsepdonding media renderer found </div>
    );
}

function TableOfContents(props) {

    if (!props.contents) return null;

    const scrollToContent = e => {
        const match = e.target.className.match(/ttt-(\S+)/);
        const innerText = match ? match[1] : e.target.innerText;
        const classText = `ttt-${innerText}`;
        const node = [...document.querySelectorAll('.section-header')].find(node =>
            node.classList.contains(classText) ||
            node.innerText === innerText
        );
        if (node) node.scrollIntoView({ behavior: 'smooth', alignTo: true });
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
                        (content.level === 1 ? 'title ' : '') +
                        (content.text === props.current ? ' current ' : '') +
                        (content.text === ' Comments ' ? ' comments ' : '') +
                        (content.ttt || '')
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
        <aside id='table-of-contents' className={(props.className ? `${props.className} ` : '') + hidden}>
            <ul>{renderlis()}</ul>
            <textarea id='copybox' value='test' readOnly={true} />
        </aside>
    );
}

function createExecMenu(cb, copyBox) {
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
            divOut.innerHTML = andy.innerText.replace( // strings
                /(^|[^\\])((['"])(?:\\.|(?!\3).)*\3)/g,
                '$1<span class="string">$2</span>'
            ).replace( // newlines
                /-NLN\*\*:o/g,
                '<br>'
            ).replace( // booleans
                /\b(true|false)\b/g,
                '<span class="bool">$1</span>'
            ).replace( // numbers
                /\b((?:0[xb])?\d+)\b/g,
                '<span class="number">$1</span>'
            );
        }

        try {
            // eslint-disable-next-line no-eval
            eval(copyBox.value.replace(/console\.log/g, 'runningCodeblock.output.push'));
        } catch (e) {
            runningCodeblock.output.push(e);
        }
    });

    return spanRun;
}

function ArticleContent({ article, setSections, ...props }) {
    const [markdown, setMarkdown] = useState(null);
    const [status,   setStatus  ] = useState('loading');

    useEffect(() => {
        requestRawText( // protocol://hostname:port/articles/name.md
            `${window.location.protocol}//` +
            `${window.location.hostname}:` +
            `${window.location.port}/articles/` +
            `${article.name.toLowerCase()}/index.md`,
            res => {
                if (res.startsWith('<!DOCTYPE html>')) return setStatus('article_not_found');
                setMarkdown(res);
                setStatus('markdown_found');

                // const words = res.match(/\w+/g);
                // console.log("word count: " + words.length);

                const sectLines = res.match(/(?:^|\s)#+\s+[^\n\r]+/g);
                let sects = [];
                sectLines.forEach((s, i) => {
                    const text = s.match(/#+\s+([^\n]+)$/)[1];
                    sects[i] = {
                        text:  text,
                        level: s.match(/#+/)[0].length,
                        ttt:   'ttt-' + encodeURIComponent(text)
                    }
                });
                sects.push({ text: 'Comments', level: 2, ttt: 'ttt-comments' });
                setSections(sects);
            }
        );
    }, [article, setSections]);

    useEffect(() => setTimeout(() => {
        Array.from(document.getElementsByClassName('codeblock-full')).forEach(cb => {
            const canExecute = cb.classList.contains('executable');

            const elm = document.createElement('div');
            elm.classList.add('codeblock-controls');

            const copyBox  = document.createElement('textarea');
            const spanCopy = document.createElement('span');

            copyBox.setAttribute('class', 'copybox');
            copyBox.value = cb.getAttribute('sourceCode');
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

            if (canExecute) elm.appendChild(createExecMenu(cb, copyBox));

            cb.appendChild(elm);
        });
    }, 300) && undefined, [markdown]);

    switch (status) {
        case 'markdown_found': return (
            <>
                <div className={props.focus ? 'blur' : ''}>
                    <Header />
                    <StandardPage>
                        <Markdown
                            source={markdown}
                            linkTarget='_blank'
                            renderers={{
                                code: CodeBlock,
                                inlineCode: ps => (<CodeBlock
                                    {...ps}
                                    language='gml'
                                    inline={true}
                                />),
                                link: A,
                                heading: ps => ps.level === 2 ?
                                    SectionTitle(ps) :
                                    ArticleTitle(ps),
                                image: ps => (<ArticleMedia
                                    {...ps}
                                    article={article}
                                    setFocus={props.setFocus}
                                />),
                                paragraph: ps => <div className='p'>{ps.children}</div>
                            }}
                            className='rendered-markdown'
                            escapeHtml={false}
                        />
                    </StandardPage>
                    <div className='section-header hidden'>Comments</div>
                    <Wpac />
                </div>
            </>
        );

        case 'loading': return <PageLoading />;

        case 'article_not_found': return <WindowCenter> 404! Could not find article "{props.article.name}" </WindowCenter>;

        default: return <WindowCenter> Invalid Article Status [article.jsx:177] </WindowCenter>;
    }
}

export default function Article(props) {
    const [showTOC,     setShowTOC    ] = useState(true);
    const [sections,    setSections   ] = useState(null);
    const [currentTOC,  setCurrentTOC ] = useState('');
    const [focus,       setFocus      ] = useState(null);

    useEffect(() => {
        const check = e => {
            let isEnough = window.innerWidth > 16 * 83;
            if (showTOC !== isEnough) setShowTOC(isEnough);
        }

        const handleScroll = e => {
            const sectionTitles = document.getElementsByClassName('section-title');
            for (const section of sectionTitles) {
                const rect = section.getBoundingClientRect();
                if (rect.top > 0 && rect.top < window.innerHeight / 2) {
                    const text = section.innerText;
                    if (currentTOC !== text) setCurrentTOC(text);
                    break;
                }
            }
        }

        window.addEventListener('resize', check);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', check)
            window.removeEventListener('scroll', handleScroll)
        };
    }, [showTOC, currentTOC]);

    return (
        <>
            <ArticleContent
                setSections={setSections}
                article={props.article}
                setFocus={setFocus}
                focus={focus}
            />
            {showTOC && (<div>
                <TableOfContents
                    style={{ 'height': '100vh' }}
                    contents={sections}
                    current={currentTOC}
                    className={focus ? 'blur' : ''}
                />
            </div>)}
            {focus && <Focus video={focus} dismount={() => setFocus(null)} />}
        </>
    );
}
