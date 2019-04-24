import React, { useState, useEffect } from 'react';
import websites from '../data/websites';
import Prism from './../prism.js';
import { requestRawText, A, SectionTitle, Ribbons } from './global.jsx';

export default function Home(props) {
    return (
        <>
            <FrontPage />
            <AboutSection />
            <WebDevPage />
        </>
    );
}

function AboutSection() {
    return (
        <section id='about'>
            <SectionTitle content='About' />
            <div className='description'>
                <div className='background' />
                <p>
                    I am a Norwegian 2d game and web developer, working primarily with GML and JavaScript.
                </p><p>
                    As well as developing games, I enjoy building libraries, IDE skins and other resources to aid other developers.
                </p><p>
                    I have contributed to community projects such as
                    a <A to='https://objpodcast.com/' target='_blank' rel='noopener noreferrer'> Podcast</A>
                    , <A to='https://github.com/GameMakerDiscord' target='_blank' rel='noopener noreferrer'>Github organization</A>
                    , <A to='https://github.com/christopherwk210/gm-bot' target='_blank' rel='noopener noreferrer'>internet bot</A>
                    , <A to='https://GMShaders.com/' target='_blank' rel='noopener noreferrer'>shader guide</A> and more.
                </p>
            </div>
        </section>
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
            <div className='center'>
                <div className='title'> Tony Strømsnæs </div>
            </div>
            <ul className='attributes'>
                <A to='/'><li>GameDev</li></A>
                <A to='/'><li>WebDev</li></A>
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
                            I mostly use React.js and SCSS for front-end webdevelopment, however I intend to pick up Vue.js and styled-components for future projects. Some of the websites displayed above are also written in raw html/css/js
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
