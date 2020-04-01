import React from 'react';
import A from '../components/A.jsx';
import { ReactComponent as NavalMine } from '../images/naval_mine.svg';

export default function MiniProjAbout() {
    return (
        <>
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
            <A
                className='corona-page-link mini-proj'
                to='https://corona.tonystr.net'
                title='corona statistics'
                style={{
                    position: 'absolute',
                    left: '5%',
                    top: '7rem',
                    zIndex: 7
                }}
            >
                <i className='far fa-dizzy' />
            </A>
        </>
    );
}
