import React, { useState } from 'react';
import '../styles/minesweeper.scss';

export default function Minesweeper() {
    const [grid, setGrid] = useState(Array.from(
        { length: 21 },
        () => Array.from(
            { length: 46 },
            () => ({ hidden: true })
        )
    ));

    // { ...c, hidden: !c.hidden }

    return (
        <div className='minesweeper'>
            <table className='game-grid'>
                {grid.map((row, ry) => (
                    <tr key={ry}>
                        {row.map((cell, rx) => (
                            <td
                                key={rx}
                                className={cell.hidden ? 'hidden' : ''}
                                onClick={() => setGrid(prev => prev.map((r, y) => r.map((c, x) => (
                                    x === rx && y === ry ? { ...c, hidden: !c.hidden } : c
                                ))))}
                            />
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
