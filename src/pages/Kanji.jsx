import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import classNames from 'class-names';
import '../styles/kanji.scss';
import kanjis from '../data/kanji.js';

const CANVAS_SIZE = 36 * 36;

window.mousePrevious = { x: null, y: null, down: false };

function canvasDraw(e, setCoords) {
    const target = e.target;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    console.log(e);

    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

    if (target === undefined || target.tagName !== 'CANVAS') {
        // document.removeEventListener('mousemove', canvasDraw);
        // window.mousePrevious.down = false;
        return false;
    }

    const rect = target.getBoundingClientRect();

    const x = clientX - rect.x;
    const y = clientY - rect.y;
    const px = window.mousePrevious.down ? window.mousePrevious.x : x;
    const py = window.mousePrevious.down ? window.mousePrevious.y : y;
    // const dis = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

    ctx.beginPath();
    ctx.lineWidth = 8;
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
    // if (isNaN(coord) || coord < 0 || coord >= CANVAS_SIZE) {
    //     throw 'bad coordinate ' + coord;
    // }
    let str = coord.toString(36);
    return str.length === 1 ? '0' + str : str;
}

function KanjiInspector({ kanji }) {
    return (
        <div className='inspector'>
            <div className='foc'>
                {['number', 'character', 'radical', 'stroke-count', 'meaning', 'reading'].map(
                    (type, index) => <div className={type} key={type}>{kanji[index]}</div>
                )}
            </div>
        </div>
    );
}

export default function KanjiPage() {
    const [canvasSize, setCanvasSize] = useState({
        width:  window.innerHeight - 374,
        height: window.innerHeight - 374
    });
    const [coords,  setCoords ] = useState([]);
    const [strokes, setStrokes] = useState(0);
    const [results, setResults] = useState([]);
    const [inspect, setInspect] = useState(null);
    const [strokeBased, setStrokeBased] = useState(false);

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

        let req = coords.reduce(
            (req, list) => list.length ?
                req + list.reduce((acc, coord) => acc + base36(coord.x) + base36(coord.y), '') + '\n' :
                req,
            strokeBased ? 'HL ' : 'hL '
        );

        // Another scary API request, but omg the results are amazing
        fetch(`https://urlreq.appspot.com/req?method=POST&url=https://kanji.sljfaq.org/hw-17.cgi&body=${encodeURIComponent(req)}`).then(
            res => !res.bodyUsed && res.text().then(res => {
                console.log(res);
                try {
                    let out = JSON.parse(res);
                    if (!out.results || !out.results.length) throw 'No results';
                    setResults(out.results);
                } catch (e) {
                    console.error(e);
                }
            })
        );
    }, [strokes, strokeBased]);

    const clearCanvas = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCoords([]);
        setStrokes(0);
    }

    const draw = e => canvasDraw(e, setCoords);

    const clearMouseListener = () => {
        window.mousePrevious.down = false;
        setStrokes(prev => prev + 1);
        document.removeEventListener('mousemove', draw);
        document.removeEventListener('mouseup', clearMouseListener);
    }

    return (
        <>
            <Header />
            <div className='kanji-page'>
                <div
                    className='canvas-container'
                    width={canvasSize.width}
                    height={canvasSize.height}
                >
                    <canvas
                        id='canvas'
                        className='kanji-canvas'
                        width={canvasSize.width - 11}
                        height={canvasSize.height - 11}
                        onMouseDown={e => {
                            setCoords(prev => [...prev.map(list => list.slice()), []]);
                            canvasDraw(e, setCoords);
                            document.addEventListener('mousemove', draw);
                            document.addEventListener('mouseup', clearMouseListener);
                        }}
                        onTouchStart={e => {
                            setCoords(prev => [...prev.map(list => list.slice()), []]);
                            canvasDraw(e, setCoords);
                            document.addEventListener('touchmove', draw);
                            document.addEventListener('touchend', clearMouseListener);
                        }}
                        onClick={e => {
                            canvasDraw(e, setCoords);
                            window.mousePrevious.down = false;
                        }}
                    />
                    <div className='controls'>
                        <i
                            title='Clear'
                            className='fas fa-redo'
                            onClick={clearCanvas}
                        />
                        <i
                            title={strokeBased ? 'Match by image' : 'Match by stroke'}
                            className={`fas fa-${strokeBased ? 'random' : 'paint-brush'}`}
                            onClick={() => setStrokeBased(prev => !prev)}
                        />
                    </div>
                </div>
                <div className='results' style={{
                    width:  Math.min(window.innerWidth - canvasSize.width, 500),
                    height: canvasSize.height
                }}>
                <div className={classNames('search-results', { 'small': !!inspect })}>
                        {results.map((kanji, i) => (
                            <span
                                key={i}
                                onClick={() => setInspect(kanjis.find(k => k[1] === kanji))}
                            >
                                {kanji}
                            </span>
                        ))}
                    </div>
                    {inspect && <KanjiInspector kanji={inspect} />}
                </div>
            </div>
        </>
    );
    // <textarea id='copybox' />
}
