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
    console.log(props);
    return (
        <div {...props} className={'section-title ' + (props.className || '')}>
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

export { requestRawText, A, SectionTitle, Focus, WindowCenter };
