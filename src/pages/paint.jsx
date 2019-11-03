import React, { useState, useEffect } from 'react';

window.mousePrevious = { x: null, y: null, down: false };

function canvasDraw(e) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const x = e.clientX;
    const y = e.clientY;
    const px = window.mousePrevious.down ? window.mousePrevious.x : x;
    const py = window.mousePrevious.down ? window.mousePrevious.y : y;
    // const dis = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.moveTo(px, py);
    ctx.lineTo(x, y);
    ctx.stroke();

    window.mousePrevious = {
        x: x,
        y: y,
        down: true
    }
}

export default function Paint() {
    const [canvasSize, setCanvasSize] = useState({
        width:  window.innerWidth,
        height: window.innerHeight - 138
    });

    useEffect(() => {
        const updateCanvasSize = () => setCanvasSize({
            width:  window.innerWidth,
            height: window.innerHeight - 138
        });

        window.addEventListener('resize', updateCanvasSize);

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    return (
        <div className='paint'>
            <canvas
                width={canvasSize.width}
                height={canvasSize.height}
                id='canvas'
                onMouseDown={e => {
                    canvasDraw(e);
                    document.addEventListener('mousemove',  canvasDraw);
                }}
                onMouseUp={() => {
                    document.removeEventListener('mousemove', canvasDraw)
                    window.mousePrevious.down = false;
                }}
                onClick={e => {
                    canvasDraw(e);
                    window.mousePrevious.down = false;
                }}
            />
        </div>
    );
    // <textarea id='copybox' />
}
