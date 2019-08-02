import React from 'react';
import Ribbons from './Ribbons.jsx';

export default function Header(props) {
    // let rootURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    // rootURL = rootURL.replace('localhost', '127.0.0.1');
    return (
        <header>
            <Ribbons />
            <div className='tony'>
                <img src={`${window.location.origin.toString()}/images/window.png`} />
                Tony Strømsnæs
            </div>
        </header>
    );
}
