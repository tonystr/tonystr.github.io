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
    return props.to ? (
        <Link
            {...props}
            className={'link ' + (props.className || '')}
            to={props.to}
        />
    ) : <a {...props} className={'link ' + (props.className || '')}>{props.children}</a>;
}

function ASCIITable(props) {

    const showDecimal = props.showDecimal !== undefined ? props.showDecimal : true;
    const showHex     = props.showHex     !== undefined ? props.showHex     : true;
    const showChar    = props.showChar    !== undefined ? props.showChar    : true;

    const specialCharDescs = [
        'null', 'start of heading', 'start of text', 'end of text', 'end of transmission',
        'enquiry', 'acknowledge', 'bell', 'backspace', 'horizontal tab', 'new line feed',
        'vertical tab', 'new page feed', 'carriage return', 'shit out', 'shift in',
        'data link escape', 'device control 1', 'device control 2', 'device control 3',
        'device control 4', 'negative acknowledge', 'synchronous idle', 'end of trans. block',
        'cancel', 'end of medium', 'substitute', 'escape', 'file separator', 'group separator',
        'record separator', 'unit separator', 'space'
    ];
    specialCharDescs[127] = 'delete';
    const specialChars = [
        'NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'TAB', 'LF', 'VT', 'FF',
        'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM',
        'SUB', 'ESC', 'FS', 'GS', 'RS', 'US', 'Space'
    ];
    specialChars[127] = 'DEL';

    const renderRow = i => {
        const tds = [];
        for (let j = 0; j < 4; j++) {
            const dec = i + j * 32;
            if (showDecimal) tds.push(<td>{dec}</td>);
            if (showHex    ) tds.push(<td>{dec.toString(16)}</td>);
            if (showChar   ) tds.push(<td title={specialCharDescs[dec] || ''}>{
                specialChars[dec] || String.fromCharCode(dec)
            }</td>);
        }
        return <tr>{tds}</tr>;
    }

    const renderRows = () => {
        const headers = [];
        for (let i = 0; i < 4; i++) {
            if (showDecimal) headers.push(<th title='decimal'>    Dec </th>);
            if (showHex    ) headers.push(<th title='hexadecimal'>Hex </th>);
            if (showChar   ) headers.push(<th title='character'>  Char</th>);
        }

        const rows = [<tr>{headers}</tr>];
        for (let i = 0; i < 32; i++) {
            rows.push(renderRow(i));
        }
        return rows;
    }

    return (
        <table className={props.className ? 'ascii-table ' + props.className : 'ascii-table'}>
            {renderRows()}
        </table>
    );
}

function CodeBlock(props) {
    if (props.inline) return (
        <pre className={`code lang-${props.language || 'auto'} inline`}>
            <code>
                {props.value}
            </code>
        </pre>
    );

    return (
        <SyntaxHighlighter
            className={`code lang-${props.language || 'auto'} codeblock-full`}
            language={props.language || null}
            style={styleOneDark}
        >
            {props.value}
        </SyntaxHighlighter>
    );
}


function SectionTitle(props) {
    return (
        <div {...props} className={
            'section-title section-header ' +
            (props.className || '') +
            (props.children ? ' ttt-' + encodeURIComponent(props.children[0].props.value) : '')
        }>
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
    CodeBlock,
    ASCIITable
};
