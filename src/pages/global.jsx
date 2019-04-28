import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import { Scrollbars } from 'react-custom-scrollbars';

async function requestRawText(path, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            callback(xhttp.responseText);
        }
    }
    xhttp.open('GET', path, true);
    xhttp.send();
}

function A(props) {
    return (
        <Link
            {...props}
            className={'link ' + (props.className || '')}
            to={props.to || props.href}
        />
    )
    // return <a {...props} className={'link ' + (props.className || '')}>{props.children}</a>;
}

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


function SectionTitle(props) {
    return (
        <div {...props} className={'section-title section-header ' + (props.className || '')}>
            <div />
            <span>{props.content} {props.children}</span>
            <div />
        </div>
    );
}

const ArticleTitle = (props) => (
    <div {...props} className='article-title section-header' />
);

function StandardPage({ className, ...props }) {
    return <div className={'standard-page ' + (className || '')} {...props}/>;
}

function Focus(props) {

    const handleClick = e => {
        if (!document.querySelector('.focus .content').contains(e.target)) {
            props.dismount();
        }
    }

    const videoRef = React.createRef();

    useEffect(() => {
        if (videoRef.current) videoRef.current.play();
    });

    return (
        <div className='focus' onClick={handleClick}>
            {props.video && <div className='video content'>
                <video controls ref={videoRef} >
                    <source src={props.video} />
                </video>
            </div>}
        </div>
    );
}

function WindowCenter(props) {
    return (
        <div {...props} className='window-center'>
            <div className='center'>{props.children}</div>
        </div>
    );
}

function Header(props) {
    let rootURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    rootURL = rootURL.replace('localhost', '127.0.0.1');
    return (
        <header>
            <Ribbons />
            <div className='tony'>
                Tony Strømsnæs
            </div>
        </header>
    );
}

function Ribbons(props) {
    return (
        <ul className='ribbons'>
            <Link to='/'><li className='l0'><i className="far fa-id-card" /></li></Link>
            <Link to='/articles'><li className='l1'><i className="fas fa-file-invoice" /></li></Link>
            <Link to='/snippets'><li className='l2'><i className="fas fa-code" /></li></Link>
            <a href='mailto:hello@tonystr.net' target='_blank' rel="noopener noreferrer">
                <li className='l3'><i className="far fa-envelope" /></li>
            </a>
            <Link to='https://twitter.com/TonyStr_' target='_blank' rel="noopener noreferrer">
                <li className='l4'><i className="fab fa-twitter" /></li>
            </Link>
        </ul>
    );
}

function Footer(props) {
    return (
        <footer>
            <div className='content'>
                This website uses <A to='https://fontawesome.com/'>FontAwesome</A> by
                Dave Gandy, <A to='https://widgetpack.com/comment-system'>Widget Pack</A> comment
                system, <A to='https://prismjs.com/'>Prism.js</A> syntax highlighter by
                Golmote and Jannik Zschiesche, and <A to='https://reactjs.org/'>React.js</A> by
                Facebook.
                <div className='tony'>
                    Designed and developed by <A to='/'>Tony Strømsnæs</A>
                </div>
            </div>
        </footer>
    );
}

export {
    requestRawText,
    A,
    SectionTitle,
    ArticleTitle,
    Focus,
    WindowCenter,
    Header,
    Ribbons,
    Link,
    Footer,
    StandardPage,
    CodeBlock
};
