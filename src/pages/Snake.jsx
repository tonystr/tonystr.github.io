import React, { useState, useEffect } from 'react';
// import classNames from 'class-names';
import Header from '../components/Header.jsx';
import '../styles/minesweeper.scss';

export default function Snake() {
    const width  = 46;
    const height = 21;

    const [grid,     /*setGrid*/] = useState(() => Array.from({ length: height }, () => Array.from({ length: width })));
    const [snake,    setSnake   ] = useState(() => ({ tick: 0, cells: [{ x: Math.floor(width / 2), y: Math.floor(height / 2) }] }));
    const [snakeDir, setSnakeDir] = useState(() => 0);
    // const [fruits,   setFruits  ] = useState(() => [{ x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) }]);

    useEffect(() => {
        setTimeout(() => setSnake(prev => ({
            ...prev,
            tick: prev.tick + 1,
            cells: [...prev.cells.slice(1), {
                x: prev.cells[prev.cells.length - 1].x + (snakeDir === 0) - (snakeDir === 2),
                y: prev.cells[prev.cells.length - 1].y + (snakeDir === 3) - (snakeDir === 1)
            }]
        })), 400 - snake.cells.length**2);
    }, [ snake.tick ]);

    useEffect(() => {
        document.addEventListener('keydown', ({ key }) => {
            const dir = 'DWAS'.split('').findIndex(c => c === key.toUpperCase());
            if (dir !== -1) setSnakeDir(() => dir);
        });
    });

    return (
        <>
            <Header />
            <div className='snake'>
                <table className='game-grid'>
                    <tbody>
                        {grid.map((row, y) => (
                            <tr key={y}>
                                {row.map((cell, x) => (
                                    <td key={x} className={snake.cells.find(c => c.x === x && c.y === y) ? 'snake' : 'empty'} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='infobar'>
                    {snakeDir}
                </div>
            </div>
        </>
    );
}

/*
function Counter(props) {
    const [toggle, setToggle] = useState(props.toggle || false);

    return (
        <div
            className={classNames(props.className, 'counter', { toggle: toggle })}
            onClick={e => {
                setToggle(!toggle)
                if (props.onClick) props.onClick(e);
            }}
        >
            {props.children}
        </div>
    );
}
*/
