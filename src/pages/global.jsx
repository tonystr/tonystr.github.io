import React from 'react';

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
    return <a {...props} className={'link ' + (props.className || '')}>{props.children}</a>;
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

function Focus(props) {

    const handleClick = e => {
        if (!document.querySelector('.focus .content').contains(e.target)) {
            props.dismount();
        }
    }

    return (
        <div className='focus' onClick={handleClick}>
            {props.video && <div className='video content'>
                <video controls>
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
    return (
        <header>
            <Ribbons />
        </header>
    );
}

function Ribbons(props) {
    return (
        <ul className='ribbons'>
            <li className='l0'><i className="fas fa-id-card" /></li>
            <li className='l1'><i className="fas fa-lightbulb" /></li>
            <li className='l2'><i className="fas fa-code" /></li>
            <a href='mailto:tony.stroemsnaes@gmail.com' target='_blank' rel="noopener noreferrer">
                <li className='l3'><i className="far fa-envelope" /></li>
            </a>
            <a href='https://twitter.com/TonyStr_' target='_blank' rel="noopener noreferrer">
                <li className='l4'><i className="fab fa-twitter" /></li>
            </a>
        </ul>
    );
}

export { requestRawText, A, SectionTitle, Focus, WindowCenter, Header, Ribbons };
