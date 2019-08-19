import React, { useState, useEffect } from 'react';
import '../styles/autotile.scss';

export default function Autotiling(props) {
    const [drawMode, setDrawMode] = useState(null);
    const [tiles,    setTiles   ] = useState(createDefaultTiles(props));
    const [tdHeight, setTdHeight] = useState(0);

    console.log('props.type: ' + props.type);

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
    const draw = (x, y, mode = drawMode) => {
        //////////////////////////////// Important Debug Stuff ////////////////////////////////
        //
        // if (x === undefined || y === undefined || tiles[y] === undefined) return;
        // if (x === 0 && y === 0 && tiles[y][x].solid) console.log(JSON.stringify(tiles)
        //     .replace(/{\w*"solid":true/gi, 'S')
        //     .replace(/{\w*"solid":false/gi, 'E')
        //     .replace(/,"bitflag":(\d+)\w*}/gi, ':$1')
        // );
        //
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

                    const top    = !((cy > 0 && tiles[cy - 1][cx] || oob).solid);
                    const left   = !((          tiles[cy][cx - 1] || oob).solid);
                    const right  = !((          tiles[cy][cx + 1] || oob).solid);
                    const bottom = !((cy < b && tiles[cy + 1][cx] || oob).solid);

                    newCell.bitflag = right + bottom * 2 + left * 4 + top * 8

                    return newCell;
                }

                return cell;
            })));
        }
    }

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
                                    backgroundPosition: (cell.bitflag) * (10 / 1.5) + '%',
                                    opacity: Number(cell.solid),
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
