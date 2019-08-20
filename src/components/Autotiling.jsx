import React, { useState, useEffect, lazy } from 'react';
import '../styles/autotile.scss';
import grassT16 from '../images/grass-t16.png';
import grassT47 from '../images/grass-t47.png';

export default function Autotiling(props) {
    const [drawMode, setDrawMode] = useState(null);
    const [sprite,   setSprite  ] = useState(props.type === '16' ? grassT16 : grassT47);
    const [tiles,    setTiles   ] = useState(createDefaultTiles(props));
    const [tdHeight, setTdHeight] = useState(0);

    const tileSize = props.type === '16' ? (1 / 15) * 100 : (1 / 46) * 100;

    const resize = () => setTdHeight(document.querySelector('.autotile.squares td').offsetWidth);

    useEffect(() => {
        resize();
        document.querySelector('.autotile').addEventListener('contextmenu', e => e.preventDefault());
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const preventEvent = e => e.preventDefault();

    const startDrawing = e => {
        document.addEventListener('contextmenu', preventEvent);
        document.addEventListener('mouseup', stopDrawing);
        setDrawMode(e.button);
    }

    const stopDrawing = () => {
        setTimeout(() => document.removeEventListener('contextmenu', preventEvent), 40);
        document.removeEventListener('mouseup', stopDrawing);
        setDrawMode(null);
    }

    const draw = props.type === '16' ?
        (x, y, d = drawMode) => draw16(x, y, d, tiles, setTiles) :
        (x, y, d = drawMode) => draw47(x, y, d, tiles, setTiles);

    return (
        <table
            className='autotile squares grass'
            onMouseDown={e => startDrawing(e)}
        >
            <tbody>
                {tiles.map((row, y) => (
                    <tr key={y}>
                        {row.map((cell, x) => (
                            <td
                                key={x}
                                style={{
                                    backgroundImage: `url(${sprite})`,
                                    backgroundPosition: (cell.bitflag) * tileSize + '%',
                                    opacity: Number(cell.solid),
                                    height: tdHeight
                                }}
                                onClick={() => draw(x, y, 0)}
                                onContextMenu={() => draw(x, y)}
                                onMouseMove={drawMode !== null ? () => draw(x, y) : null}
                            >
                             {cell.bitfrr}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function createDefaultTiles(props) {
    return props.defaultTiles ? JSON.parse(
        props.defaultTiles.replace(
            /\s+/g, ''
        ).replace(
            /S/g, '{"solid":true'
        ).replace(
            /E/g, '{"solid":false'
        ).replace(
            /:(\d+)/gi, ',"bitflag":$1}'
        )
    ) : Array.from(
        { length: props.height || 6 },
        () => Array.from(
            { length: props.width || 16 },
            () => ({ solid: false, bitflag: 0 })
        )
    );
}


function draw16(x, y, mode, tiles, setTiles) {
    //////////////////////////////// Important Debug Stuff ////////////////////////////////
    // if (x === undefined || y === undefined || tiles[y] === undefined) return;
    // if (x === 0 && y === 0 && tiles[y][x].solid) console.log(JSON.stringify(tiles)
    //     .replace(/{\w*"solid":true/gi, 'S')
    //     .replace(/{\w*"solid":false/gi, 'E')
    //     .replace(/,"bitflag":(\d+)\w*}/gi, ':$1')
    // );
    ///////////////////////////////////////////////////////////////////////////////////////
    if (tiles[y][x].solid !== (mode === 0)) {
        tiles[y][x].solid = (mode === 0);
        setTiles(prev => prev.map((row, cy) => row.map((cell, cx) => {

            if (cell.solid && (
                (y === cy && cx <= x + 1 && cx >= x - 1) ||
                (x === cx && cy <= y + 1 && cy >= y - 1)
            )) {
                let newCell = {
                    solid:   cell.solid,
                    bitflag: cell.bitflag
                };

                if (x === cx && y === cy) newCell.solid = mode === 0

                const b = tiles.length - 1;
                const oob = { solid: true };

                newCell.bitflag = (
                    (!(cy > 0 && tiles[cy - 1][cx] || oob).solid) * 8 + // top
                    (!(          tiles[cy][cx - 1] || oob).solid) * 4 + // left
                    (!(          tiles[cy][cx + 1] || oob).solid) * 1 + // right
                    (!(cy < b && tiles[cy + 1][cx] || oob).solid) * 2   // bottom
                );

                return newCell;
            }

            return cell;
        })));
    }
}

function draw47(x, y, mode, tiles, setTiles) {

    const bitflagMap = {
        171: 11, 187: 11, 427: 11, 443: 11, 43: 11, 139: 11, 395: 11, 411: 11, 283: 11, 315: 11, 299: 11, 27: 11, 267: 11, 155: 11, 59: 11,
        413: 13, 445: 13, 189: 13, 157: 13, 45: 13, 61: 13, 21: 13, 285: 13, 397: 13, 141: 13, 429: 13, 317: 13, 301: 13, 269: 13, 29: 13, 173: 13,
        446: 14, 318: 14, 286: 14, 319: 14, 415: 14, 142: 14, 174: 14, 430: 14, 190: 14, 414: 14, 286: 14, 174: 14, 30: 14, 270: 14, 46: 14,
        438: 33,
        447: 15,
    }
    //////////////////////////////// Important Debug Stuff ////////////////////////////////
    // if (x === undefined || y === undefined || tiles[y] === undefined) return;
    // if (x === 0 && y === 0 && tiles[y][x].solid) console.log(JSON.stringify(tiles)
    //     .replace(/{\w*"solid":true/gi, 'S')
    //     .replace(/{\w*"solid":false/gi, 'E')
    //     .replace(/,"bitflag":(\d+)\w*}/gi, ':$1')
    // );
    ///////////////////////////////////////////////////////////////////////////////////////
    if (tiles[y][x].solid !== (mode === 0)) {
        tiles[y][x].solid = (mode === 0);
        setTiles(prev => prev.map((row, cy) => row.map((cell, cx) => {

            if (cell.solid && (
                (cx <= x + 1 && cx >= x - 1) &&
                (cy <= y + 1 && cy >= y - 1)
            )) {
                let newCell = {
                    solid:   cell.solid,
                    bitflag: cell.bitflag,
                    bitfrr: cell.bitfrr
                };

                if (x === cx && y === cy) newCell.solid = mode === 0

                const b = tiles.length - 1;
                const q = tiles[0].length - 1;
                const oob = { solid: true };

                const bf = (
                    (!(cy > 0 && tiles[cy - 1][cx] || oob).solid) * 8 + // top
                    (!(          tiles[cy][cx - 1] || oob).solid) * 4 + // left
                    (!(          tiles[cy][cx + 1] || oob).solid) * 1 + // right
                    (!(cy < b && tiles[cy + 1][cx] || oob).solid) * 2 + // bottom

                    (!(cx > 0 && cy > 0 && tiles[cy - 1][cx - 1] || oob).solid) * 16  + // top left
                    (!(cx < q && cy < b && tiles[cy + 1][cx + 1] || oob).solid) * 32  + // bottom right
                    (!(cx < q && cy > 0 && tiles[cy - 1][cx + 1] || oob).solid) * 128 + // top right
                    (!(cx > 0 && cy < b && tiles[cy + 1][cx - 1] || oob).solid) * 256   // bottom left
                );

                newCell.bitfrr = bf;
                newCell.bitflag = bitflagMap[bf] || bf;

                return newCell;
            }

            return cell;
        })));
    }
}
