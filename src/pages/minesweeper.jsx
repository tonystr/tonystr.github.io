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

function gridGenerate(width, height, frac) {
    const defCell = {
        hidden: true,
        flag: false,
        value: 0
    };

    const grid = Array.from(
        { length: height }, () => Array.from(
            { length: width }, () => ({
                ...defCell,
                value: 0
            })
        )
    );

    let bombCount = Math.round(width * height * frac);

    while (bombCount > 0) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        if (grid[y][x].value === 0) {
            grid[y][x].value = 9;
            bombCount--;
        }
    }

    return grid.map((row, ry) => row.map((cell, rx) => (cell.value === 0 ?
        { ...cell, value: gridFindValue(grid, rx, ry, width, height) } :
        cell
    )));
}

export default function Minesweeper() {
    const width  = 46;
    const height = 21;
    const [grid, setGrid] = useState(gridGenerate(width, height, .2));
    const [lost, setLost] = useState(false);
    const gameRef = React.useRef();
    const cellVal = [' ', ...(new Array(8)), '💣', '💥'];

    useEffect(() => {
        const ev = e => e.preventDefault() && false;
        gameRef.current.addEventListener('contextmenu', ev);
        return () => gameRef.current.removeEventListener('contextmenu', ev);
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
        mutGrid[ry][rx].hidden = false;
        if (mutGrid[ry][rx].value < 1) aroundCell(rx, ry, (x, y) => {
            if (mutGrid[y][x].hidden) touchCell(mutGrid, x, y, rw, rh);
        });
    };

    const tableContent = grid.map((row, ry) => (
        <tr key={ry}>
            {row.map((cell, rx) => (
                <td
                    key={rx}
                    className={
                        (cell.hidden ? 'hidden' : '') +
                        (!cell.hidden && cellVal[cell.value] === undefined ? ` c-${cell.value}` : '') +
                        (lost && cell.flag && cell.value !== 9 ? ' flag-wrong' : '')
                    }
                    onClick={() => {
                        if (grid[ry][rx].flag) return;
                        if (grid[ry][rx].value === 9) {
                            const mutGrid = JSON.parse(JSON.stringify(grid));
                            mutGrid[ry][rx].value++;
                            setGrid(mutGrid);
                            setLost(true);
                            return;
                        }
                        const mutGrid = JSON.parse(JSON.stringify(grid));
                        touchCell(mutGrid, rx, ry);
                        setGrid(mutGrid);
                    }}
                    onContextMenu={() => {
                        if (!grid[ry][rx].hidden) return;
                        const mutGrid = JSON.parse(JSON.stringify(grid));
                        mutGrid[ry][rx].flag = !mutGrid[ry][rx].flag;
                        setGrid(mutGrid);
                        return false;
                    }}
                >
                    {(cell.flag && <i className='far fa-flag' />) ||
                    ((!cell.hidden || lost) && (cellVal[cell.value] || cell.value))}
                </td>
            ))}
        </tr>
    ));

    return (
        <div className={'minesweeper' + (lost ? ' lost' : '')} ref={gameRef}>
            <table className='game-grid'>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </div>
    );
}
