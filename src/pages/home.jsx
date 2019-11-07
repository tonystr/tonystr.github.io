import React, { lazy, useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import A from '../components/A.jsx';
import Ribbons from '../components/Ribbons.jsx';
import { ReactComponent as NavalMine } from '../images/naval_mine.svg';
import '../styles/home.scss';
const WebdevPage  = lazy(() => import('../components/WebdevPage.jsx'));
// const GamedevPage = lazy(() => import('../components/GamedevPage.jsx'));

Math.clamp = Math.clamp || ((x, y, z) => x < y ? y : (x > z ? z : x));

export default function Home(props) {
    return (
        <>
            <FrontPage />
            <section id='about'>
                <SectionTitle content='About' />
                <A
                    to='/minesweeper'
                    title='minesweeper'
                    style={{
                        position: 'absolute',
                        left: '9%',
                        top: '6rem',
                        zIndex: 7
                    }}
                >
                    <NavalMine  />
                </A>
                <A
                    className='paint-page-link mini-proj'
                    to='/paint'
                    title='paint'
                    style={{
                        position: 'absolute',
                        left: '7%',
                        top: '13rem',
                        zIndex: 7
                    }}
                >
                    <i className='fas fa-paint-brush' />
                </A>
                <A
                    className='radical-page-link mini-proj'
                    to='/radicals'
                    title='radicals'
                    style={{
                        position: 'absolute',
                        right: '7%',
                        top: '14rem',
                        zIndex: 7
                    }}
                >
                    部首
                </A>
                <A
                    className='ascii-page-link mini-proj'
                    to='/ascii'
                    title='ascii table'
                    style={{
                        position: 'absolute',
                        right: '5%',
                        top: '7rem',
                        zIndex: 7
                    }}
                >
                    @
                </A>
                <div className='description'>
                    <div className='text'>
                        <p>
                            Hey ー I'm Tony Andréz Forland Strømsnæs, or TonyStr for short.
                        </p><p>
                            Born, rasied and residing in Norway; I spent many rainy days indoors playing games, and eventually teaching myself to make them. Programming went from hobby to passion to a goal of profession.
                        </p><p>
                            Since the age of 11, I have programmed games, websites, language tools, chat bots and many more concepts that have since grasphed my interest.
                        </p>
                    </div>
                    <div className='bg-wrp-out'>
                        <div className='bg-wrp'>
                            <div className='background' />
                        </div>
                    </div>
                </div>
                <GithubContributions />
            </section>
            <WebdevPage />
        </>
    );
}

// TODO:
// <GamedevPage />

function GithubContributions() {
    const [contributions, setContributions] = useState(null);

    useEffect(() => {
        // If the website ever suddenly starts showing ads for tech support and viagra, this is why:
        fetch('https://urlreq.appspot.com/req?method=GET&url=https://github.com/users/tonystr/contributions').then(
            res => !res.bodyUsed && res.text().then(res => {
                let fillIndex = -1;
                let dataIndex = -1;
                let data = '';
                const colors = [
                    '30323F',
                    '63582F',
                    '967E20',
                    'C8A411',
                    'FFCC01'
                ];
                for (let i = 0; i < res.length; i++) {
                    if (res.substring(i, i + 6) === 'fill="') {
                        fillIndex = i;
                        i += 5;
                    }

                    if (res.substring(i, i + 12) === 'data-count="') {
                        dataIndex = i;
                        i += 12;
                    }

                    if (dataIndex >= 0) {
                        if (res[i] === '"') {
                            dataIndex = -1;
                            res = `${
                                res.slice(0, fillIndex + 7)
                            }${
                                colors[Math.clamp(
                                    Math.floor(+data / 3 + (+data > 0)),
                                    0,
                                    colors.length - 1
                                )]
                            }${
                                res.slice(fillIndex + 13)
                            }`;
                            data = '';
                        } else data += res[i];
                    }
                }
                setContributions(res);
            })
        );
    }, []);

    // const gitText = `while (tony.alive()) {
    //     tony.program();
    // }`;
    // <pre className='text'>{gitText}</pre>

    return (
        <div className='git-section'>
            <div className='github-contributions' dangerouslySetInnerHTML={{ __html: contributions }} />
        </div>
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
