import React, { useEffect } from 'react';
import '../styles/autotile.scss';

export default function Autotiling(props) {

    return (
        <Table
            width ={props.width  || 16}
            height={props.height || 6}
        />
    );
}

function Table({ width, height }) {
    const rows = [];

    useEffect(() => {
        const table = document.querySelector('.autotile.squares:not(.squared)');
        table.querySelectorAll('td').forEach(td => {
            td.style = 'height:' + td.offsetWidth + 'px';
            console.log(td.offsetWidth);
        });
        table.classList.add('squared');
    });

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push(<td></td>);
        }
        rows.push(<tr>{row}</tr>);
    }

    return <table className='autotile squares'><tbody>{rows}</tbody></table>;
}
