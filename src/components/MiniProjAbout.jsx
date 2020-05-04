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
            <A
                className='snake-page-link mini-proj'
                to='/snake'
                title='snake game'
                style={{
                    position: 'absolute',
                    right: '10%',
                    top: '8rem',
                    zIndex: 7,
                    width: '1.25em'
                }}
            >
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="snake" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-snake fa-w-20 fa-3x"><path fill="currentColor" d="M617.4 180.09l-86.59-26.63c-33.39-10.27-66.71 8.26-78.25 38.54H448c-70.69 0-128 57.31-128 128v64c0 17.64-14.36 32-32 32s-32-14.36-32-32V133.7C256 66.89 207.29 7.11 140.79.63 64.49-6.82 0 53.2 0 128v191.53c0 62.18 11.18 123.86 33.02 182.09 5.19 13.84 24.77 13.84 29.96 0A518.514 518.514 0 0 0 96 319.53V128c0-17.64 14.36-32 32-32s32 14.36 32 32v250.3c0 66.81 48.71 126.59 115.21 133.08C351.51 518.82 416 458.8 416 384v-64c0-17.67 14.33-32 32-32h4.2c11.1 30.62 44.38 49.63 77.96 39.69l86.92-25.72c13.59-4.02 22.92-16.51 22.92-30.68v-60.61c0-14.05-9.17-26.46-22.6-30.59zM528 288c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm0-64c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"></path></svg>
            </A>
        </>
    );
}
