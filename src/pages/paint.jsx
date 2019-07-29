import React, { useState, useEffect } from 'react';

window.mousePrevious = { x: null, y: null, down: false };

function canvasDraw(e) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const x = e.clientX;
    const y = e.clientY;
    const px = window.mousePrevious.down ? window.mousePrevious.x : x;
    const py = window.mousePrevious.down ? window.mousePrevious.y : y;
    const dis = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = "#ffffff";
    for (let i = 0; i < dis; i += 3) {
        const f = i / dis;
        context.arc(px + (x - px) * f, py + (y - py) * f, 3, 0, Math.PI * 2, false);
    }
    context.stroke();

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
                onMouseDown={() => window.addEventListener('mousemove',  canvasDraw)}
                onMouseUp={() => {
                    window.removeEventListener('mousemove', canvasDraw)
                    window.mousePrevious.down = false;
                }}
            />
        </div>
    );
}
