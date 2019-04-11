import React, { useState, useEffect } from 'react';

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
        <div {...props} className={'section-title ' + (props.className || '')}>
            <div />
            <span>{props.content} {props.children}</span>
            <div />
        </div>
    );
}

export { requestRawText, A, SectionTitle};
