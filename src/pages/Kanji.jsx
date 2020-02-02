import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import '../styles/kanji.scss';

const CANVAS_SIZE = 36 * 36;

window.mousePrevious = { x: null, y: null, down: false };

function canvasDraw(e, setCoords) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (e.target === undefined || e.target.tagName !== 'CANVAS') {
        // document.removeEventListener('mousemove', canvasDraw);
        // window.mousePrevious.down = false;
        return false;
    }

    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;
    const px = window.mousePrevious.down ? window.mousePrevious.x : x;
    const py = window.mousePrevious.down ? window.mousePrevious.y : y;
    // const dis = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

    ctx.beginPath();
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.moveTo(px, py);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (Math.abs(x - px) > 3 || Math.abs(y - py) > 3) {
        setCoords(prev => {
            const newCoords = prev.map(list => list.slice());
            newCoords[newCoords.length - 1].push({
                x: Math.floor((x / rect.width)  * CANVAS_SIZE),
                y: Math.floor((y / rect.height) * CANVAS_SIZE)
            });
            return newCoords;
        });
    }

    window.mousePrevious = {
        x: x,
        y: y,
        down: true
    }

    return true;
}

function base36(coord) {
    if (isNaN(coord) || coord < 0 || coord >= CANVAS_SIZE) {
        throw 'bad coordinate ' + coord;
    }
    let str = coord.toString(36);
    return str.length === 1 ? '0' + str : str;
}

export default function KanjiPage() {
    const [canvasSize, setCanvasSize] = useState({
        width:  window.innerHeight - 374,
        height: window.innerHeight - 374
    });
    const [coords,  setCoords ] = useState([]);
    const [strokes, setStrokes] = useState(0);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const updateCanvasSize = () => setCanvasSize({
            width:  window.innerHeight - 374,
            height: window.innerHeight - 374
        });

        window.addEventListener('resize', updateCanvasSize);

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    useEffect(() => {
        if (strokes <= 0) return;

        let req = coords.reduce((req, list) =>
            list.length ? req + list.reduce((acc, coord) => acc + base36(coord.x) + base36(coord.y), '') + '\n' : req,
            'hL '
        );

        // Another scary API request, but omg the results are amazing
        fetch(`https://urlreq.appspot.com/req?method=POST&url=https://kanji.sljfaq.org/hw-17.cgi&body=${encodeURIComponent(req)}`).then(
            res => !res.bodyUsed && res.text().then(res => {
                console.log(res);
                try {
                    let out = JSON.parse(res);
                    setResults(out.results);
                } catch (e) {
                    console.error(e);
                }
            })
        );
    }, [strokes]);

    const draw = e => canvasDraw(e, setCoords);

    return (
        <>
            <Header />
            <div className='kanji-page'>
                <div className='results' style={{
                    width:  Math.min(window.innerWidth - canvasSize.width, 500),
                    height: canvasSize.height 
                }}>
                    {results.map(kanji => <span>{kanji}</span>)}
                </div>
                <canvas
                    width={canvasSize.width}
                    height={canvasSize.height}
                    id='canvas'
                    className='kanji-canvas'
                    onMouseDown={e => {
                        setCoords(prev => [...prev.map(list => list.slice()), []]);
                        canvasDraw(e, setCoords);
                        document.addEventListener('mousemove', draw);
                        const clearMouseListener = () => {
                            window.mousePrevious.down = false;
                            setStrokes(prev => prev + 1);
                            document.removeEventListener('mousemove', draw);
                            document.removeEventListener('mouseup', clearMouseListener);
                        }
                        document.addEventListener('mouseup', clearMouseListener);
                    }}
                    onClick={e => {
                        canvasDraw(e, setCoords);
                        window.mousePrevious.down = false;
                    }}
                />
            </div>
        </>
    );
    // <textarea id='copybox' />
}
