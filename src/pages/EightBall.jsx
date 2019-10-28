import React, { useState } from 'react';
import '../styles/eightball.scss';

function generateAnswer() {
    return 'You are dumb';
}

export default function EightBall() {
    const [answer, setAnswer] = useState(generateAnswer);

    return (
        <div id='eight-ball' className='page'>
            <div className='eightball'>
                {answer}
            </div>
        </div>
    );
}
