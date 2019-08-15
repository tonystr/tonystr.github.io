import React, { useState, useEffect } from 'react';
import '../styles/autotile.scss';

export default function Autotiling(props) {
    const width  = props.width  || 16;
    const height = props.height || 6;

    const [drawMode, setDrawMode] = useState(null);
    const [tiles, setTiles] = useState((() => {
        const ts = [];
        for (let i = 0; i < width * height; i++) ts.push({
            solid: false,
            style: ''
        });
        return ts;
    })());

    const startDrawing = e => setDrawMode(e.button);
    const stopDrawing = () => setDrawMode(null);
    const draw = e => {
        if (drawMode === 0) {
            tiles[+e.target.getAttribute('index')] = {
                solid: true,
                bitflag: 1
            }
        } else {
            tiles[+e.target.getAttribute('index')] = {
                solid: false,
                bitflag: 0
            }
        }
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
