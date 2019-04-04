import React, { useState, useEffect } from 'react';
import websites from '../data/websites';
import Prism from './../prism.js';

console.log(websites);

export default function Home() {

    const renderLines = (num = 5) => {
        const list = [];
        for (let i = 0; i < num; i++) {
            list.push(<div className={'line l' + i} />);
        }
        return <div className='lines'>{list}</div>;
    }

    return (
        <>
            <div className='page' id='frontpage'>
                {renderLines()}
                <div className='center'>
                    <div className='title'> Tony Strømsnæs </div>
                </div>
                <ul className='attributes'>
                    <li>GameDev</li>
                    <li>WebDev</li>
                </ul>
                <ul className='ribbons'>
                    <li className='l0'><i className="fas fa-id-card" /></li>
                    <li className='l1'><i className="fas fa-lightbulb" /></li>
                    <li className='l2'><i className="fas fa-code" /></li>
                    <a href='mailto:tony.stroemsnaes@gmail.com' target='_blank'>
                        <li className='l3'><i className="far fa-envelope" /></li>
                    </a>
                    <a href='https://twitter.com/TonyStr_' target='_blank'>
                        <li className='l4'><i className="fab fa-twitter" /></li>
                    </a>
                </ul>
            </div>
            {/* About section goes here */}
            <Page />
        </>
    );
}

function Page() {

    const [codePreview, setCodePreview] = useState('loading...');

    useEffect(() => {
        requestRawText(process.env.PUBLIC_URL + 'code.txt', res => {
            setCodePreview(`${res}\n${res}`);
            Prism.highlightAll();
        });
    }, []);

    const renderWebsites = () => {
        const list = [];

        for (let i = 0; i < websites.length; i++) {
            const site = websites[i];
            list.push(
                <div className='website' key={i}>
                    <a target='_blank' href={site.url}>
                        <div className='name'>{site.name}</div>
                        <img alt={'image: ' + site.name} src={site.image} />
                        <div className='role'>{site.role}</div>
                    </a>
                </div>
            );
        }

        return list;
    }

    return (
        <div className='page' id='webdev'>
            <div className='left'>
                <div className='codeWrapper'>
                    {codePreview && <pre><code className='prism language-jsx'>{codePreview}</code></pre>}
                </div>
            </div>
            <div className='right'>
                <div className='wrapper'>
                    <div className='title'> Web development </div>
                    <div className='showcase'>
                        <div className='gridview'>
                            {renderWebsites()}
                        </div>
                    </div>
                    <div className='description'>
                        <div className='inner'>
                            I mostly use React.js and SCSS for front-end webdevelopment, however I intend to pick up Vue.js and styled-components for future projects. Some of the websites displayed above are also written in raw html/css/js
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
