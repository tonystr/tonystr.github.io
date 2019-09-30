import React, { useState, useEffect } from 'react';
import '../styles/minesweeper.scss';

function gridFindValue(grid, rx, ry, rw, rh) {
    let val = 0;
    for (let y = Math.max(ry - 1, 0); y < Math.min(ry + 2, rh); y++) {
        for (let x = Math.max(rx - 1, 0); x < Math.min(rx + 2, rw); x++) {
            if ((x === rx && y === ry) || grid[y] === undefined) continue;
            if (grid[y][x].value === 9) val++;
        }
    }
    return val;
}

function gridGenerate(width, height, bombCount) {
    const defCell = {
        hidden: true,
        flag: false,
        value: 0
    };

    let grid = Array.from(
        { length: height }, () => Array.from(
            { length: width }, () => ({
                ...defCell,
                value: 0
            })
        )
    );

    while (bombCount > 0) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        if (grid[y][x].value === 0) {
            grid[y][x].value = 9;
            bombCount--;
        }
    }

    grid = grid.map((row, ry) => row.map((cell, rx) => (cell.value === 0 ?
        { ...cell, value: gridFindValue(grid, rx, ry, width, height) } :
        cell
    )));

    return grid;
}

function Stopwatch({ stop }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!stop) setTimeout(() => setTime(time + 1), 1000);
    }, [time, stop]);

    if (time < 60) {
        return `${time}`;
    } else if (time < 3600) {
        return `${Math.floor(time / 60)}:${time % 60}`;
    } else {
        return `${Math.floor(time / 3600)}:${Math.floor(time / 60) % 60}:${time % 60}`;
    }
}

export default function Minesweeper() {
    const width  = 46;
    const height = 21;
    const bombCount = Math.round(width * height * .2);

    const [grid,      setGrid     ] = useState(gridGenerate(width, height, bombCount));
    const [gameState, setGameState] = useState('waiting');
    const [flagCount, setFlagCount] = useState(bombCount);
    const [showCount, setShowCount] = useState(0);
    const [ctrl,      setCtrl     ] = useState(false);

    const gameRef = React.useRef();
    const cellVal = [' ', ...(new Array(8)), '💣', '💥'];
    // const cellVal = [' ', '一', '二', '三', '四', '五', '六', '七', '八', '💣', '💥'];

    useEffect(() => {
        const ev = e => e.preventDefault() && false;
        gameRef.current.addEventListener('contextmenu', ev);
        const kde = window.addEventListener('keydown', e => (
            e.keyCode === 17 && !ctrl && setCtrl(true)
        ));
        const kue = window.addEventListener('keyup', e => {
            e.keyCode === 17 && ctrl && setCtrl(false)
        });
        return () => {
            gameRef.current.removeEventListener('contextmenu', ev);
            window.removeEventListener('keydown', kde);
            window.removeEventListener('keyup', kue);
        }
    });

    const aroundCell = (rx, ry, func, rw = width, rh = height) => {
        for (let y = Math.max(ry - 1, 0); y < Math.min(ry + 2, rh); y++) {
            for (let x = Math.max(rx - 1, 0); x < Math.min(rx + 2, rw); x++) {
                if ((x !== rx || y !== ry)) {
                    func(x, y);
                }
            }
        }
    };

    const touchCell = (mutGrid, rx, ry, rw = width, rh = height) => {
        let sum = mutGrid[ry][rx].hidden !== false;
        mutGrid[ry][rx].hidden = false;
        if (mutGrid[ry][rx].value < 1) aroundCell(rx, ry, (x, y) => {
            if (mutGrid[y][x].hidden && !mutGrid[y][x].flag) {
                sum += touchCell(mutGrid, x, y, rw, rh);
            }
        });
        return sum;
    };

    const gridIsSolved = gr => {
        for (let row of gr) {
            for (let cell of row) {
                if (cell.hidden && cell.value < 9) return false;
            }
        }
        return true;
    };

    const placeFlag = (rx, ry) => {
        if (!grid[ry][rx].hidden) return;
        if (!grid[ry][rx].flag && flagCount <= 0) return;
        if (gameState !== 'playing') setGameState('playing');

        setFlagCount(flagCount + grid[ry][rx].flag - !grid[ry][rx].flag);
        setGrid(prev => prev.map((row, y) => row.map((cell, x) => x === rx && y === ry ?
            { ...cell, flag: !cell.flag } :
            cell
        )));

        return false;
    }

    const TableContent = () => grid.map((row, ry) => (
        <tr key={ry}>
            {row.map((cell, rx) => (
                <td
                    key={rx}
                    className={
                        (cell.hidden ? 'hidden' : '') +
                        ((!cell.hidden || gameState === 'lost') && cell.value >= 1 ? ` c-${cell.value}` : '') +
                        (gameState === 'lost' && cell.flag && cell.value !== 9 ? ' flag-wrong' : '')
                    }
                    onClick={() => {
                        if (ctrl) return placeFlag(rx, ry);

                        if (grid[ry][rx].flag) return;
                        if (gameState !== 'playing') setGameState('playing');

                        if (grid[ry][rx].value === 9) {
                            const mutGrid = JSON.parse(JSON.stringify(grid));
                            mutGrid[ry][rx].value++;
                            setGrid(mutGrid);
                            setGameState('lost');
                            return;
                        }

                        let mutGrid = grid;
                        let newShowCount = showCount;
                        if (grid[ry][rx].value >= 1) {
                            mutGrid = grid.map((row, y) => row.map((cell, x) => x === rx && y === ry ?
                                { ...cell, hidden: false } :
                                cell
                            ));
                            newShowCount = showCount + 1;
                        } else {
                            mutGrid = JSON.parse(JSON.stringify(grid));
                            newShowCount = showCount + touchCell(mutGrid, rx, ry);
                        }

                        setShowCount(newShowCount);
                        if (width * height - newShowCount <= bombCount && gridIsSolved(mutGrid)) {
                            setGameState('won');
                        }
                        setGrid(mutGrid);
                    }}
                    onContextMenu={() => placeFlag(rx, ry)}
                >
                    {(cell.flag && <i className='far fa-flag' />) ||
                    ((!cell.hidden || (gameState === 'lost' && cell.value > 8)) && (cellVal[cell.value] || cell.value))}
                </td>
            ))}
        </tr>
    ));

    return (
        <div
            className={`minesweeper ${gameState}`}
            ref={gameRef}
        >
            <table className='game-grid'>
                <tbody><TableContent /></tbody>
            </table>
            <div className='infobar'>
                <Counter className='flagcount'>
                    Flags: <span>{flagCount} <i className='far fa-flag' /></span>
                </Counter>
                <Counter className='bombcount'>
                    Bombs: <span>{bombCount - flagCount} 💣</span>
                </Counter>
                <Counter className='grid-size'>
                    Grid: <span>{width} × {height}</span>
                </Counter>
                <Counter className='stopwatch' toggle={true}>
                    Time: <span className={gameState !== 'playing' ? 'stop' : ''}>
                        <Stopwatch stop={gameState !== 'playing'} />
                    </span>
                </Counter>
                <div
                    className='counter'
                    title='restart'
                    onClick={() => {
                        setGrid(gridGenerate(width, height, bombCount));
                        setGameState('waiting');
                        setFlagCount(bombCount);
                        setShowCount(0);
                        setCtrl(false);
                    }}
                >
                    <i class="fas fa-redo"></i>
                </div>
                {gameState === 'won' && <div> You win! </div>}
            </div>
        </div>
    );
}

function Counter(props) {
    const [toggle, setToggle] = useState(props.toggle || false);

    return (
        <div
            className={(props.className || '') + ' counter' + (toggle ? ' toggle' : '')}
            onClick={e => {
                setToggle(!toggle)
                if (props.onClick) props.onClick(e);
            }}
        >
            {props.children}
        </div>
    );
}
