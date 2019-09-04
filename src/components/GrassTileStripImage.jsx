import React from 'react';
import '../styles/grasstilestripimage.scss';

export default function GrassTileStripImage(props) {
    let numbers = [];
    for (let i = 0; i < 16; i++) numbers.push(i);
    const src = props.src.startsWith('./') ?
        `${
            (document.location.pathname.match(/\//g) || ['/']).join('..').slice(1)
        }articles/${props._article.name.toLowerCase()}${props.src.slice(1)}` :
        props.src;
    return (
        <section className='grasstilestripimage'>
            <div className='number'>{numbers.map(n => <span>{n}</span>)}</div>
            <img src={src} />
            <div className='number binary'>{numbers.map(n => <span>{n.toString(2)}</span>)}</div>
        </section>
    );
}
