import React, { useState, useEffect } from 'react';
import websites from '../data/websites';
import Prism from './../prism.js';

console.log(websites);

export default function Home() {

    const [codePreview, setCodePreview] = useState('loading...');
    const [slideBar, setSlideBar] = useState({
        buttonIndex: 2,
        slideFrom: null
    });

    useEffect(() => {
        requestRawText(process.env.PUBLIC_URL + 'code.txt', res => {
            setCodePreview(res);
        });
        Prism.highlightAll();
    });

    const clickSlideButton = i => {
        const index = Number(i);
        if (index === slideBar.buttonIndex) return;
        console.log({
            buttonIndex: index,
            slideFrom: index > slideBar.buttonIndex ? 'right' : 'left'
        });
        setSlideBar({
            buttonIndex: index,
            slideFrom: index > slideBar.buttonIndex ? 'right' : 'left'
        });
    }

    const renderWebsites = () => {
        const list = [];

        for (let i = 0; i < 5; i++) {
            const index = (i + 3 + slideBar.buttonIndex) % 5;
            const site = websites[index];
            list.push(
                <div className={'website ' + (slideBar.slideFrom ? 'slide-from-' + slideBar.slideFrom : '')} key={index}>
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
                    className={'button' + (i === slideBar.buttonIndex ? ' selected' : '')}
                    onClick={() => clickSlideButton(i)}
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
                    <div className='codeWrapper'>
                        {codePreview && <pre><code className='prism language-jsx'>{codePreview}</code></pre>}
                    </div>
                </div>
                <div className='right'>
                    <div className='wrapper'>
                        <div className='title'> Webdesign </div>
                        <div className='showcase'>
                            <div className='slideshow '>{renderWebsites()}</div>
                            {renderSlideButtons()}
                        </div>
                        <div className='description'>
                            <div className='inner'>
                                I mostly use React.js with TypeScript and SCSS for front-end webdevelopment, however I intend to also pick up Vue.js and styled-components for future projects. Some of the websites displayed above are also written in raw html/css/js
                            </div>
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
