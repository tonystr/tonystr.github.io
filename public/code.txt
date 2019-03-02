import React, { useState, useEffect } from 'react';
import websites from '../data/websites';
import Prism from './../prism.js';

console.log(websites);

export default function Home() {

    const [codePreview, setCodePreview] = useState('loading...');
    const [slideButtonSelected, setSlideButtonSelected] = useState(3);

    useEffect(() => {
        requestRawText(process.env.PUBLIC_URL + 'code.txt', res => {
            setCodePreview(res);
        });
        Prism.highlightAll();
    });

    const renderWebsites = () => {
        const list = [];

        for (let i = 0; i < websites.length; i++) {
            const site = websites[i];
            list.push(
                <div className='website' key={i}>
                    <div className='name'>{site.name}</div>
                    <img alt={'image: ' + site.name} src={site.image} />
                    <div className='role'>{site.role}</div>
                </div>
            );
        }

        return list;
    }

    const renderSlideButtons = () => {
        const list = [];

        for (let i = 0; i < websites.length; i++) {
            list.push(
                <div
                    className={'button' + (i === slideButtonSelected ? ' selected' : '')}
                    key={i}
                />
            );
        }

        return <div className='slidebar'>{list}</div>;
    }

    return (
        <>
            <div className='page' id='webdev'>
                <div className='left'>
                    {codePreview && <pre><code className='prism language-jsx'>{codePreview}</code></pre>}
                </div>
                <div className='right'>
                    <div className='wrapper'>
                        <div className='title'> Webdesign </div>
                        <div className='description'> I've worked on a number of websites, some listed below: </div>
                        <div className='showcase'>
                            <div className='slideshow'>{renderWebsites()}</div>
                            {renderSlideButtons()}
                        </div>
                    </div>
                </div>
            </div>
            <div className='page' id='frontpage'>
                <div className='center'>
                    <div className='title'> Tony Strømsnæs </div>
                    <div className='notice'> Undergoing redesign </div>
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
