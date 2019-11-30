import React from 'react';
import SectionTitle from '../components/SectionTitle.jsx';

function GameStack(props) {
    return (
        <ul className='gamestack'>
            {props.games.map(g => (
                <li
                    key={g.name}
                    className='game'
                    style={{ marginLeft: 5 + g.offset + 'px' }}
                >
                    <img src='images/roblaster_cover.png' alt='' />
                    <span className='title'>
                        {g.name}
                    </span>
                    <div className='shade' />
                </li>
            ))}
        </ul>
    );
}

export default function GamedevPage() {
    const games = [{
        name: 'Dungeon mechanic',
        offset: -3
    }, {
        name: 'Quack tower',
        offset: 4
    }, {
        name: 'Roblaster',
        offset: 0
    }];

    // Todo:
    const Screen = () => <div />;

    return (
        <div id='gamedev' className='page'>
            <SectionTitle content='Game development' />
        </div>
    );
}
