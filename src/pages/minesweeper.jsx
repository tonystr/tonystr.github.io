import React, { useState } from 'react';
import '../styles/minesweeper.scss';

function gridFindValue(grid, rx, ry, rw, rh) {
    let val = 0;
    for (let y = Math.max(ry - 1, 0); y < Math.min(ry + 2, rh); y++) {
        for (let x = Math.max(rx - 1, 0); x < Math.min(rx + 2, rw); x++) {
            if (x === rx && y === ry || grid[y] === undefined) continue;
            if (grid[y][x].value === '💣') val++;
        }
    }
    return val;
}

function gridGenerate(width, height) {
    const defCell = {
        hidden: true,
        flag: false,
        value: null
    };

    const grid = Array.from(
        { length: height }, () => Array.from(
            { length: width }, () => ({
                ...defCell,
                value: Math.random() < .1 ? '💣' : null
            })
        )
    );

    return grid.map((row, ry) => row.map((cell, rx) => ({
        ...cell,
        value: cell.value === null ?
            gridFindValue(grid, rx, ry, width - 1, height - 1) || null :
            cell.value
    })));
}

export default function Minesweeper() {
    const [grid, setGrid] = useState(gridGenerate(46, 21));

    const handleCellClick = (e, rx, ry) => setGrid(prev => prev.map((r, y) => r.map((c, x) => {
        if (x === rx && y === ry) {
            console.log(e.button);
            return e.button === 2 ?
                { ...c, flag: !c.flag } :
                { ...c, hidden: !c.hidden };
        }
        return c;
    })));

    return (
        <div className='minesweeper'>
            <table className='game-grid'>
                {grid.map((row, ry) => (
                    <tr key={ry}>
                        {row.map((cell, rx) => (
                            <td
                                key={rx}
                                className={cell.hidden ? 'hidden' : ''}
                                onClick={e => handleCellClick(e, rx, ry)}
                            >
                                {!cell.hidden && cell.value}
                                {cell.flag && <i className='far fa-flag' />}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
