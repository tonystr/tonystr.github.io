import React, { useState, useEffect } from 'react';
import '../styles/minesweeper.scss';

function gridFindValue(grid, rx, ry, rw, rh) {
    let val = 0;
    for (let y = Math.max(ry - 1, 0); y < Math.min(ry + 2, rh); y++) {
        for (let x = Math.max(rx - 1, 0); x < Math.min(rx + 2, rw); x++) {
            if ((x === rx && y === ry) || grid[y] === undefined) continue;
            if (grid[y][x].value === 72) val++;
        }
    }
    return val;
}

function gridGenerate(width, height) {
    const defCell = {
        hidden: true,
        flag: false,
        value: 0
    };

    const grid = Array.from(
        { length: height }, () => Array.from(
            { length: width }, () => ({
                ...defCell,
                value: Math.random() < .2 ? 72 : 0
            })
        )
    );

    return grid.map((row, ry) => row.map((cell, rx) => ({
        ...cell,
        value: cell.value === 0 ?
            gridFindValue(grid, rx, ry, width, height) || 0 :
            cell.value
    })));
}

export default function Minesweeper() {
    const width  = 46;
    const height = 21;
    const [grid, setGrid] = useState(gridGenerate(width, height));
    const [lost, setLost] = useState(false);
    const gameRef = React.useRef();

    useEffect(() => {
        gameRef.current.addEventListener('contextmenu', e => e.preventDefault() && false);
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
                    className={cell.hidden ? 'hidden' : ''}
                    onClick={() => {
                        if (grid[ry][rx].flag) return;
                        if (grid[ry][rx].value === 72) return setLost(true);
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
                    {(!cell.hidden || lost) && (cell.value === 72 ? '💣' : cell.value !== 0 && cell.value)}
                    {cell.flag && <i className='far fa-flag' />}
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
