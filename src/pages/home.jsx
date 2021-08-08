import React, { lazy } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import A from '../components/A.jsx';
import Ribbons from '../components/Ribbons.jsx';
import MiniProjAbout from '../components/MiniProjAbout.jsx';
import '../styles/home.scss';
const WebdevPage = lazy(() => import('../components/WebdevPage.jsx'));
const GithubContributions = lazy(() => import('../components/GithubContributions.jsx'));
const GamedevPage = lazy(() => import('../components/GamedevPage.jsx'));

Math.clamp = Math.clamp || ((x, y, z) => x < y ? y : (x > z ? z : x));

export default function Home(props) {
    return (
        <>
            <FrontPage />
            <WebdevPage />
            <GamedevPage />
        </>
    );
}

/*

<section id='about'>
    <SectionTitle content='About' />
    <MiniProjAbout />
    <div className='description'>
    </div>
    <GithubContributions />
</section>

*/

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
