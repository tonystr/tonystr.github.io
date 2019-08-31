import React, { useState, useEffect } from 'react';
import '../styles/autotile.scss';
import grassT16 from '../images/grass-t16.png';
import grassT47 from '../images/grass-t47.png';
import { ReactComponent as GridIcon } from '../images/border-all-solid.svg';

export default function Autotiling(props) {
    const [drawMode,  setDrawMode ] = useState(null);
    const [tiles,     setTiles    ] = useState(createDefaultTiles(props));
    const [tdHeight,  setTdHeight ] = useState(0);
    const [gridLines, setGridLines] = useState(false);

    const sprite   = props.type === '16' ? grassT16 : grassT47;
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
        <div className='autotile-demo'>
            <table
                className={
                    'autotile squares grass' +
                    (gridLines ? ' grid-lines' : '') +
                    (drawMode !== null ? ' action ' + (drawMode ? 'erasing' : 'drawing') : '')
                }
                onMouseDown={e => startDrawing(e)}
            >
                <tbody>
                    {tiles.map((row, y) => (
                        <tr key={y}>
                            {row.map((cell, x) => (
                                <td
                                    key={x}
                                    style={cell.solid ? {
                                        backgroundImage: `url(${sprite})`,
                                        backgroundPosition: (cell.bitflag) * tileSize + '%',
                                        height: tdHeight
                                    } : {
                                        height: tdHeight
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
            <div className='controls'>
                <GridIcon
                    className='btn grid'
                    style={{ width: '1rem' }}
                    onClick={() => setGridLines(!gridLines)}
                />
            </div>
        </div>
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
                    (!((cy > 0 && tiles[cy - 1][cx]) || oob).solid) * 8 + // top
                    (!((          tiles[cy][cx - 1]) || oob).solid) * 4 + // left
                    (!((          tiles[cy][cx + 1]) || oob).solid) * 1 + // right
                    (!((cy < b && tiles[cy + 1][cx]) || oob).solid) * 2   // bottom
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
        413: 13, 445: 13, 189: 13, 157: 13, 45: 13, 61: 13, 285: 13, 397: 13, 141: 13, 429: 13, 317: 13, 301: 13, 269: 13, 29: 13, 173: 13,
        398: 14, 158: 14, 62: 14, 302: 14, 446: 14, 318: 14, 286: 14, 142: 14, 174: 14, 430: 14, 190: 14, 414: 14, 30: 14, 270: 14, 46: 14,
        295: 7, 423: 7, 311: 7, 439: 7, 407: 7, 391: 7, 263: 7, 39: 7, 167: 7, 183: 7, 23: 7, 135: 7, 55: 7, 279: 7, 151: 7,
        438: 33,
        432: 30,
        434: 40, 178: 40, 146: 40, 402: 40,
        442: 10, 314: 10, 426: 10, 410: 10, 186: 10, 282: 10, 170: 10, 394: 10, 138: 10, 42: 10, 154: 10, 298: 10, 58: 10, 26: 10, 266: 10,
        21: 5, 261: 5, 165: 5, 181: 5, 421: 5, 437: 5, 149: 5, 405: 5, 309: 5, 293: 5, 389: 5, 277: 5, 53: 5, 37: 5, 133: 5,
        440: 46, 312: 46, 424: 46, 296: 46,
        436: 43, 180: 43, 164: 43, 420: 43,
        433: 37, 401: 37, 273: 37, 305: 37,
        182: 33, 166: 33, 134: 33, 390: 33, 406: 33, 150: 33, 422: 33,
        435: 34, 403: 34, 179: 34, 147: 34, 307: 34, 275: 34, 51: 34, 19: 34,
        444: 32, 188: 32, 428: 32, 172: 32, 316: 32, 60: 32, 44: 32, 300: 32,
        441: 31, 425: 31, 313: 31, 297: 31, 409: 31, 393: 31, 281: 31, 265: 31,
        287: 15, 447: 15, 431: 15, 319: 15, 303: 15, 175: 15, 63: 15, 47: 15, 415: 15, 399: 15, 191: 15, 271: 15, 159: 15, 143: 15, 31: 15,
        412: 12, 156: 12, 396: 12, 140: 12, 284: 12, 28: 12, 268: 12,
        185: 9, 169: 9, 57: 9, 41: 9, 153: 9, 137: 9, 25: 9,
        419: 3, 291: 3, 387: 3, 259: 3, 163: 3, 35: 3, 131: 3,
        294: 6, 310: 6, 54: 6, 38: 6, 278: 6, 262: 6, 22: 6,
        161: 1, 33: 1, 129: 1,
        290: 2, 34: 2, 258: 2,
        276: 4, 20: 4, 260: 4,
        152: 8, 136: 8, 24: 8,
        32: 17,
        256: 23,
        128: 19,
        384: 27,
        48: 18,
        404: 42, 148: 42, 132: 42, 388: 42,
        144: 20, 160: 21, 288: 25, 272: 24,
        177: 35, 49: 35, 145: 35, 17: 35,
        417: 36, 289: 36, 385: 36, 257: 36,
        308: 41, 292: 41, 52: 41, 36: 41,
        184: 45, 168: 45, 56: 45, 40: 45,
        408: 44, 392: 44, 280: 44, 264: 44,
        306: 39, 50: 39, 274: 39, 18: 39,
        418: 38, 162: 38, 386: 38, 130: 38,
        416: 29, 304: 26, 400: 28, 176: 22,
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
                    (!((cy > 0 && tiles[cy - 1][cx]) || oob).solid) * 8 + // top
                    (!((          tiles[cy][cx - 1]) || oob).solid) * 4 + // left
                    (!((          tiles[cy][cx + 1]) || oob).solid) * 1 + // right
                    (!((cy < b && tiles[cy + 1][cx]) || oob).solid) * 2 + // bottom

                    (!((cx > 0 && cy > 0 && tiles[cy - 1][cx - 1]) || oob).solid) * 16  + // top left
                    (!((cx < q && cy < b && tiles[cy + 1][cx + 1]) || oob).solid) * 32  + // bottom right
                    (!((cx < q && cy > 0 && tiles[cy - 1][cx + 1]) || oob).solid) * 128 + // top right
                    (!((cx > 0 && cy < b && tiles[cy + 1][cx - 1]) || oob).solid) * 256   // bottom left
                );

                // newCell.bitfrr = bf;
                newCell.bitflag = bitflagMap[bf] || bf;

                return newCell;
            }

            return cell;
        })));
    }
}
