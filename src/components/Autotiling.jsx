import React, { useState, useEffect } from 'react';
import '../styles/autotile.scss';

export default function Autotiling(props) {
    const width  = props.width  || 16;
    const height = props.height || 6;

    const [drawMode, setDrawMode] = useState(null);

    const startDrawing = e => setDrawMode(e.button);
    const stopDrawing = () => setDrawMode(null);

    return (
        <Table
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            drawMode={drawMode}
        />
    );
}

function Tile(props) {
    // onClick={props.draw}
    // onMouseMove={props.draw}
    // onContextMenu={props.draw}

    const [bitflag, setBitflag] = useState(0);

    const setTile = t => {
        setBitflag(t);
    };

    return (
        <td
            style={{ backgroundPosition: bitflag * (10 / 1.5) + '%' }}
            onClick={() => setTile(props.drawMode !== 0)}
            onContextMenu={() => setTile(props.drawMode === 0)}
            onMouseMove={props.drawMode !== null && (() => setTile(props.drawMode === 0))}
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
            row.push(<Tile
                key={x + y * width}
                index={x + y * width}
                drawMode={props.drawMode}
            />);
        }
        rows.push(<tr>{row}</tr>);
    }

    return (
        <table {...props} className='autotile squares'>
            <tbody>{rows}</tbody>
        </table>
    );
}
