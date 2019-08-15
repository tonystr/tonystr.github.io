import React, { useState, useEffect } from 'react';
import '../styles/autotile.scss';

export default function Autotiling(props) {
    const width  = props.width  || 16;
    const height = props.height || 6;

    const [drawMode, setDrawMode] = useState(null);
    const [tiles, setTiles] = useState([]);

    const startDrawing = e => setDrawMode(e.button);
    const stopDrawing = () => setDrawMode(null);
    const draw = e => {
        e.target.classList.add('state-on');
    }

    return (
        <Table
            width={width}
            height={height}
            tiles={tiles}
            onMouseDown={e => startDrawing(e)}
            onMouseUp={e => stopDrawing(e)}
            onMouseMove={drawMode !== null ? draw : null}
            draw={draw}
        />
    );
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
            row.push(<td
                className={(props.tiles[x + y * width] || {}).class}
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
