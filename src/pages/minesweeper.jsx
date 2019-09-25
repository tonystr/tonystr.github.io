import React, { useState } from 'react';
import '../styles/minesweeper.scss';

function gridFindValue(grid, rx, ry, rw, rh) {
    let val = 0;
    for (let y = Math.max(ry - 1, 0); y < Math.min(ry + 2, rh); y++) {
        for (let x = Math.max(rx - 1, 0); x < Math.min(rx + 2, rw); x++) {
            if (x === rx && y === ry || grid[y] === undefined) continue;
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

    const touchCell = (mutGrid, rx, ry, button, rw = width, rh = height) => {
        //console.log("unraveling cell", mutGrid[ry][rx].value);
        // if (button === 2) mutGrid[ry][rx].flag   = !mutGrid[ry][rx].flag;
        // if (button !== 2) mutGrid[ry][rx].hidden = !mutGrid[ry][rx].hidden;
        mutGrid[ry][rx].hidden = false; //!mutGrid[ry][rx].hidden;
        if (mutGrid[ry][rx].value < 1) {
            for (let y = Math.max(ry - 1, 0); y < Math.min(ry + 2, rh); y++) {
                for (let x = Math.max(rx - 1, 0); x < Math.min(rx + 2, rw); x++) {
                    if (x === rx && y === ry || mutGrid[y] === undefined) continue;
                    if (mutGrid[y][x].hidden) {
                        touchCell(mutGrid, x, y, button, rw, rh);
                    }
                }
            }
        }
    };

    const handleCellClick = (button, rx, ry) => {
        if (grid[ry][rx].value === 72) return setLost(true);
        const mutGrid = JSON.parse(JSON.stringify(grid));
        touchCell(mutGrid, rx, ry, button);
        setGrid(mutGrid);
    };

    return (
        <div className={'minesweeper' + (lost ? ' lost' : '')}>
            <table className='game-grid'>
                {grid.map((row, ry) => (
                    <tr key={ry}>
                        {row.map((cell, rx) => (
                            <td
                                key={rx}
                                className={cell.hidden ? 'hidden' : ''}
                                onClick={e => handleCellClick(e.button, rx, ry)}
                            >
                                {(!cell.hidden || lost) && (cell.value === 72 ? '💣' : cell.value !== 0 && cell.value)}
                                {cell.flag && <i className='far fa-flag' />}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
