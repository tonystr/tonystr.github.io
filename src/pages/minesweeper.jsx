import React, { useState, useEffect } from 'react';
import classNames from 'class-names';
import Header from '../components/Header.jsx';
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

function gridIsSolved(gr) {
    for (let row of gr) {
        for (let cell of row) {
            if (cell.hidden && cell.value < 9) return false;
        }
    }
    return true;
}

function TableContent(props) {

    const placeFlag = (rx, ry) => {
        if (!props.grid[ry][rx].hidden) return;
        if (!props.grid[ry][rx].flag && props.flagCount <= 0) return;
        if (props.gameState !== 'playing') props.setGameState('playing');

        props.setFlagCount(props.flagCount + props.grid[ry][rx].flag - !props.grid[ry][rx].flag);
        props.setGrid(prev => prev.map((row, y) => row.map((cell, x) => x === rx && y === ry ?
            { ...cell, flag: !cell.flag } :
            cell
        )));

        return false;
    }

    const touchCell = (mutGrid, rx, ry, rw = props.width, rh = props.height) => {
        let sum = mutGrid[ry][rx].hidden !== false;
        mutGrid[ry][rx].hidden = false;
        if (mutGrid[ry][rx].value < 1) aroundCell(rx, ry, (x, y) => {
            if (mutGrid[y][x].hidden && !mutGrid[y][x].flag) {
                sum += touchCell(mutGrid, x, y, rw, rh);
            }
        });
        return sum;
    };

    const aroundCell = (rx, ry, func, rw = props.width, rh = props.height) => {
        const ym = Math.min(ry + 2, rh);
        const xm = Math.min(rx + 2, rw);
        for (let y = Math.max(ry - 1, 0); y < ym; y++) {
            for (let x = Math.max(rx - 1, 0); x < xm; x++) {
                if (x !== rx || y !== ry) {
                    func(x, y);
                }
            }
        }
    };

    const special = { 0: ' ', 9: '💣', 10: '💥' };
    const cellVal = new Array(11).fill().map((a, i) => special[i] || i);

    const createHandleClick = (rx, ry, cell) => {
        if (props.gameState === 'lost') return undefined;
        if (props.ctrl) return () => placeFlag(rx, ry);
        if (cell.flag) return undefined;

        const handleSuccess = () => {
            if (props.gameState === 'waiting') props.setGameState('playing');

            props.setGrid(mutGrid => {
                let newShowCount = props.showCount;
                if (cell.value >= 1) {
                    mutGrid = props.grid.map((row, y) => row.map((mgc, x) => x === rx && y === ry ?
                        { ...mgc, hidden: false } :
                        mgc
                    ));
                    newShowCount = props.showCount + 1;
                } else {
                    mutGrid = JSON.parse(JSON.stringify(props.grid));
                    newShowCount = props.showCount + touchCell(mutGrid, rx, ry);
                }

                props.setShowCount(newShowCount);
                if (props.width * props.height - newShowCount <= props.bombCount && gridIsSolved(mutGrid)) {
                    props.setGameState('won');
                }
                return mutGrid;
            });
        };

        if (cell.value === 9) return () => {
            if (props.gameState === 'waiting') {
                props.setGameState('playing');
                props.setGrid(mutGrid => {
                    mutGrid[ry][rx].value = 0;
                    aroundCell(rx, ry, (x, y) => {
                        const val = mutGrid[y][x].value;
                        if (val > 0 && val < 9) mutGrid[y][x].value--
                        return mutGrid;
                    });
                    while (true) {
                        const x = Math.floor(Math.random() * props.width);
                        const y = Math.floor(Math.random() * props.height);
                        if (mutGrid[y][x].value > 8 || (x === rx && y === ry)) continue;
                        mutGrid[y][x].value = 9;
                        aroundCell(x, y, (ax, ay) => {
                            if (mutGrid[ay][ax].value < 9) mutGrid[ay][ax].value++
                            return mutGrid;
                        });

                        let sum = 0;
                        aroundCell(rx, ry, (x, y) => {
                            sum += mutGrid[y][x].value === 9;
                        });
                        mutGrid[ry][rx].value = sum;
                        return mutGrid;
                    }
                });
                return handleSuccess();
            }
            props.setGrid(mutGrid => {
                mutGrid[ry][rx].value++;
                return mutGrid;
            });
            props.setGameState('lost');
        };

        return handleSuccess;
    }

    return props.grid.map((row, ry) => (
        <tr key={ry}>
            {row.map((cell, rx) => (
                <td
                    key={rx}
                    className={classNames({
                        'hidden':            cell.hidden,
                        [`c-${cell.value}`]: cell.value >= 1 && (!cell.hidden || props.gameState === 'lost'),
                        'flag-wrong':        props.gameState === 'lost' && cell.flag && cell.value !== 9
                    })}
                    onClick={createHandleClick(rx, ry, cell)}
                    onContextMenu={() => props.gameState !== 'lost' && placeFlag(rx, ry)}
                >
                    {(
                        cell.flag && <i className='far fa-flag' />
                    ) || (
                        (!cell.hidden || (props.gameState === 'lost' && cell.value > 8)) && (cellVal[cell.value] || cell.value)
                    )}
                </td>
            ))}
        </tr>
    ));
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
    // const cellVal = [' ', '一', '二', '三', '四', '五', '六', '七', '八', '💣', '💥'];

    useEffect(() => {
        const ev = e => e.preventDefault() && false;
        const gameRefCurrent = gameRef.current;
        gameRefCurrent.addEventListener('contextmenu', ev);
        const kde = window.addEventListener('keydown', e => e.keyCode === 17 && setCtrl(true));
        const kue = window.addEventListener('keyup',   e => e.keyCode === 17 && setCtrl(false));
        return () => {
            gameRefCurrent.removeEventListener('contextmenu', ev);
            window.removeEventListener('keydown', kde);
            window.removeEventListener('keyup', kue);
        }
    }, []);

    const gameRestart = () => {
        setGrid(gridGenerate(width, height, bombCount));
        setGameState('waiting');
        setFlagCount(bombCount);
        setShowCount(0);
        setCtrl(false);
    };

    return (
        <>
            <Header />
            <div
                className={`minesweeper ${gameState}`}
                ref={gameRef}
            >
                <table className='game-grid'>
                    <tbody>
                        <TableContent
                            grid={grid}
                            setGrid={setGrid}
                            flagCount={flagCount}
                            setFlagCount={setFlagCount}
                            gameState={gameState}
                            setGameState={setGameState}
                            showCount={showCount}
                            setShowCount={setShowCount}
                            width={width}
                            height={height}
                            bombCount={bombCount}
                            ctrl={ctrl}
                        />
                    </tbody>
                </table>
                <div className='infobar'>
                    <Counter className='flagcount'>
                        Flags: <span>{flagCount} <i className='far fa-flag' /></span>
                    </Counter>
                    <Counter className='bombcount'>
                        Bombs: <span>{bombCount - flagCount} <span role='img' aria-label='bomb'>💣</span></span>
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
                        onClick={gameRestart}
                    >
                        <i className="fas fa-redo"/>
                    </div>
                    {gameState === 'won' && <div> You win! </div>}
                </div>
            </div>
        </>
    );
}

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
