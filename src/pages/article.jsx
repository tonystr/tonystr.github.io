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
const components = {
    ASCIITable: lazy(() => import('../components/ASCIITable.jsx'))
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

function ImageSection(props) {
    const [width, setWidth] = useState('');

    return (
        <section className='image' style={{ width: width }}>
            <img
                src={props.src}
                alt=''
                onLoad={e => setWidth(e.target.width)}
            />
            {props.alt && <em>{props.alt}</em>}
        </section>
    )
}

function ArticleMedia(props) {

    const type = (props.src.match(/\.(\w+)$/) || [0, null])[1];
    const src = props.src.startsWith('./') ?
        `${
            (document.location.pathname.match(/\//g) || ['/']).join('..').slice(1)
        }articles/${props.pageName}${props.src.slice(1)}` :
        props.src;

    let alt = props.alt || '';
    const thumbnail = alt.match(/!thumbnail\(([^)]+)\)/);
    if (thumbnail) alt = alt.replace(thumbnail[0], '');

    const renderers = [{
        matches: ['mp4', 'webm', 'ogg'],
        render: props => (
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
                {alt && <em>{alt}</em>}
            </section>
        )
    },{
        matches: ['jsx'],
        render: props => (
            <Suspense fallback={<div>Loading React Component...</div>}>
                {React.createElement(
                    components[props.src.slice(0, -4)] ||
                    (() => <div>Failed to Load React Component</div>)
                )}
            </Suspense>
        )
    },{
        matches: ['jpg', 'png', 'jpeg', ''],
        render: props => <ImageSection src={src} alt={alt} />
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
            sectLines.forEach((s, i) => {
                const text = s.match(/#+\s+([^\n]+)$/)[1];
                sects[i] = {
                    text:  text,
                    level: s.match(/#+/)[0].length,
                    ttt:   'ttt-' + encodeURIComponent(text)
                }
            });
            sects.push({ text: 'Comments', level: 2, ttt: 'ttt-comments' });
            props.setSections(sects);
        });
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

    return markdown ? (
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
                                SectionTitle(props) :
                                ArticleTitle(props),
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
                <div className='section-header hidden'>Comments</div>
                <Wpac />
            </div>
        </>
    ) : <PageLoading />;
}

export default function Article(props) {
    const [showTOC,     setShowTOC    ] = useState(true);
    const [sections,    setSections   ] = useState(null);
    const [currentTOC,  setCurrentTOC ] = useState('');

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

    useEffect(() => {
        const check = e => {
            let isEnough = window.innerWidth > 16 * 83;
            if (showTOC !== isEnough) setShowTOC(isEnough);
        }

        window.addEventListener('resize', check);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', check)
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return (
        <>
            <ArticleContent
                setSections={setSections}
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
