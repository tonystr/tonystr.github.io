import React, { useState, useEffect } from 'react';
import websites from '../data/websites';
import Prism from './../prism.js';
import SectionTitle from '../components/SectionTitle.jsx';
import A from '../components/A.jsx';
import requestRawText from '../functions/requestRawText.jsx';
import Ribbons from '../components/Ribbons.jsx';
import '../styles/home.scss';

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
            list.push(<div
                className={'line l' + i}
                key={i}
            />);
        }
        return <div className='lines'>{list}</div>;
    }

    const scrollTo = selector => document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });

    return (
        <section className='page' id='frontpage'>
            {renderLines()}
            <div className='center'><div className='title'> Tony Strømsnæs </div></div>
            <ul className='attributes'>
                <A to='/#gamedev' onClick={() => scrollTo('#gamedev')}><li>GameDev</li></A>
                <A to='/#webdev'  onClick={() => scrollTo('#webdev' )}><li>WebDev </li></A>
            </ul>
            <Ribbons />
        </section>
    );
}

function WebDevPage() {

    const [codePreview, setCodePreview] = useState('loading...');

    useEffect(() => {
        requestRawText('https://raw.githubusercontent.com/tonystr/tonystr.github.io/master/src/pages/home.jsx', res => {
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
                        <div className='window'>
                            <img src='images/window.png' alt='window' />
                            <span className='name'>TonyStr</span>
                        </div>
                        <div className='inner'>
                            I specialize in <A to='https://reactjs.org/'>React.js</A> and <A to='https://sass-lang.com/'>SCSS</A> for
                            front-end web development, though I also have experience
                            with <A to='https://vuejs.org'>Vue.js</A> and <A to='https://www.styled-components.com/'>styled-components</A>, because
                            I love trying out new technologies. Some of the websites displayed above are also written in plain html/css/js
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
