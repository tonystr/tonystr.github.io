import React, { useState, useEffect } from 'react';
import { Highlight } from 'react-fast-highlight';

export default function Home() {

    const [codePreview, setCodePreview] = useState('loading...');

    useEffect(() => {
        requestRawText(process.env.PUBLIC_URL + 'code.txt', res => {
            setCodePreview(res);
        });
    });

    return (
        <>
            <div className='page' id='frontpage'>
                <div className='center'>
                    <div className='title'> Tony Strømsnæs </div>
                    <div className='notice'> Undergoing redesign </div>
                </div>
            </div>
            <div className='page' id='webdev'>
                <div className='left'>
                    {codePreview && <Highlight languages={['jsx']}>{codePreview}</Highlight>}
                </div>
                <div className='right'>
                    <div className='title'> Webdev </div>

                </div>
            </div>
        </>
    );
}

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
