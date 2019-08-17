import React, { useState, useEffect } from 'react';
import '../styles/autotile.scss';

export default function Autotiling(props) {
    const width  = props.width  || 16;
    const height = props.height || 6;

    const [drawMode, setDrawMode] = useState(null);
    const [tiles, setTiles] = useState((() => {
        const ts = [];
        for (let y = 0; y < height; y++) {
            const tr = [];
            for (let x = 0; x < width; x++) tr.push({
                solid: false,
                bitflag: 0
            });
            ts.push(tr);
        }
        return ts;
    })());

    useEffect(() => {
        const table = document.querySelector('.autotile.squares:not(.squared)');
        table.querySelectorAll('td').forEach(td => {
            td.style = 'height:' + td.offsetWidth + 'px';
        });
        table.classList.add('squared');
        table.oncontextmenu = () => false;
        table.onselectstart = () => false;
    }, []);

    const startDrawing = e => setDrawMode(e.button);
    const stopDrawing = () => setDrawMode(null);
    const draw = (x, y, mode = drawMode) => {
        if (x === undefined || y === undefined || tiles[y] === undefined) return;
        if (tiles[y][x].solid !== (mode === 0)) {
            setTiles(prev => prev.map((row, cy) => row.map((cell, cx) => (x === cx && y === cy) ? ({
                solid:   mode === 0,
                bitflag: mode === 0 ? 1 : 0
            }) : cell)));
        }
    }

    return (
        <table
            className='autotile squares'
            onMouseDown={e => startDrawing(e)}
            onMouseUp={e => stopDrawing(e)}
        >
            <tbody>
                {tiles.map((row, y) => (
                    <tr>
                        {row.map((cell, x) => (
                            <td
                                style={{
                                    backgroundPosition: cell.bitflag * 6.6 + '%'
                                }}
                                onClick={() => draw(x, y, 0)}
                                onContextMenu={() => draw(x, y)}
                                onMouseMove={drawMode !== null ? () => draw(x, y) : null}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // return (
    //     <Table
    //         width={width}
    //         height={height}
    //         tiles={tiles}
    //         onMouseDown={e => startDrawing(e)}
    //         onMouseUp={e => stopDrawing(e)}
    //         onMouseMove={drawMode !== null ? draw : null}
    //         draw={draw}
    //     />
    // );
}

function Table(props) {
    const width  = props.width;
    const height = props.height;
    const rows   = [];

    useEffect(() => {
        const table = document.querySelector('.autotile.squares:not(.squared)');
        table.querySelectorAll('td').forEach(td => {
            td.style = 'height:' + td.offsetWidth + 'px';
            console.log(td.offsetWidth);
        });
        table.classList.add('squared');
        table.oncontextmenu = () => false;
        table.onselectstart = () => false;
    }, []);

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const bitflag = (props.tiles[x + y * width] || {}).bitflag
            row.push(<td
                key={x + y * width}
                index={x + y * width}
                style={{ backgroundPosition: bitflag * 6.6 + '%' }}
                onClick={props.draw}
                onContextMenu={props.draw}
            ></td>);
        }
        rows.push(<tr>{row}</tr>);
    }

    return (
        <table {...props} className='autotile squares'>
            <tbody>{rows}</tbody>
        </table>
    );
}
