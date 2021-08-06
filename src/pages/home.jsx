import React, { lazy } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import A from '../components/A.jsx';
import Ribbons from '../components/Ribbons.jsx';
import MiniProjAbout from '../components/MiniProjAbout.jsx';
import '../styles/home.scss';
const WebdevPage = lazy(() => import('../components/WebdevPage.jsx'));
const GithubContributions = lazy(() => import('../components/GithubContributions.jsx'));
// const GamedevPage = lazy(() => import('../components/GamedevPage.jsx'));

Math.clamp = Math.clamp || ((x, y, z) => x < y ? y : (x > z ? z : x));

export default function Home(props) {
    return (
        <>
            <FrontPage />
            <WebdevPage />
        </>
    );
}

/*

<section id='about'>
    <SectionTitle content='About' />
    <MiniProjAbout />
    <div className='description'>
        <div className='text'>
            <p>
                Hey ー I'm Tony Andréz Forland Strømsnæs, or TonyStr for short.
            </p><p>
                Born, rasied and living in Norway; I've spent many rainy days indoors playing games, and eventually teaching myself to make them. Programming went from hobby to passion to a goal of profession.
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

*/

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
