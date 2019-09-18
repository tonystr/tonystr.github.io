import React, { useState } from 'react';
import '../styles/minesweeper.scss';

export default function Minesweeper() {
    const defCell = {
        hidden: true,
        flag: false
    };
    const [grid, setGrid] = useState(Array.from(
        { length: 21 },
        () => Array.from(
            { length: 46 },
            () => ({ ...defCell })
        )
    ));

    const handleCellClick = (e, rx, ry) => setGrid(prev => prev.map((r, y) => r.map((c, x) => {
        if (x === rx && y === ry) {
            console.log(e.button);
            return e.button === 0 ?
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
                                {cell.flag && <i className='far fa-flag' />}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
