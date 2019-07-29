import React, { useState, useEffect } from 'react';
import websites from '../data/websites';
import Prism from './../prism.js';
import { requestRawText, A, SectionTitle, Ribbons } from './global.jsx';
import scrollIntoView from 'scroll-into-view-if-needed';

export default function Home(props) {
    return (
        <>
            <FrontPage />
            <section id='about'>
                <SectionTitle content='About' />
                <div className='description'>
                    <div className='background' />
                    <p>
                        Hey. I'm a Norwegian tech geek who makes videogames and web solutions.
                    </p><p>
                        With a keen eye for design, and love for programming, I like to contribute to projects that may
                        aid other developers, as a way to give back for all I've been taught.
                    </p><p>
                        Although I may run the risk of starting a few too many concurrent sideprojects in my free time,
                        I am a strong believer in discipline and kanban for my more serious endeavours.
                    </p>
                </div>
            </section>
            <WebDevPage />
        </>
    );
}

function FrontPage() {
    const renderLines = (num = 5) => {
        const list = [];
        for (let i = 0; i < num; i++) {
            list.push(<div className={'line l' + i} />);
        }
        return <div className='lines'>{list}</div>;
    }

    return (
        <section className='page' id='frontpage'>
            {renderLines()}
            <div className='center'><div className='title'> Tony Strømsnæs </div></div>
            <ul className='attributes'>
                <A to='/#gamedev'><li>GameDev</li></A>
                <A to='/#webdev' ><li>WebDev </li></A>
            </ul>
            <Ribbons />
        </section>
    );
}

function WebDevPage() {

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
                    <a target='_blank' href={site.url} rel="noopener noreferrer">
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
        <section className='page' id='webdev'>
            <div className='left'>
                <div className='codeWrapper'>
                    {codePreview && <pre><code className='prism language-jsx'>{codePreview}</code></pre>}
                </div>
            </div>
            <div className='right'>
                <div className='wrapper'>
                    <SectionTitle className='title' content='Web development' />
                    <div className='showcase'>
                        <div className='gridview'>{renderWebsites()}</div>
                    </div>
                    <div className='description'>
                        <div className='inner'>
                            I specialize in React.js and SCSS for front-end webdevelopment, though I also have experience
                            with Vue.js and styled-components, because I love trying new technologies. Some of the websites
                            displayed above are also written in plain html/css/js
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
