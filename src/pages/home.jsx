import React, { lazy } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import A from '../components/A.jsx';
import Ribbons from '../components/Ribbons.jsx';
import { ReactComponent as NavalMine } from '../images/naval_mine.svg';
import '../styles/home.scss';
const WebdevPage  = lazy(() => import('../components/WebdevPage.jsx'));
const GamedevPage = lazy(() => import('../components/GamedevPage.jsx'));

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
            <WebdevPage />
        </>
    );
}

// TODO:
// <GamedevPage />

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
