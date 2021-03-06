import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ribbons.scss';

export default function Ribbons(props) {
    return (
        <ul className='ribbons'>
            <Link to='/'><li className='l0'><i className='far fa-id-card' /></li></Link>
            <Link to='/articles'><li className='l1'><i className='fas fa-file-invoice' /></li></Link>
            <Link to='/snippets'><li className='l2'><i className='fas fa-code' /></li></Link>
            <a href='https://github.com/tonystr' target='_blank' rel='noopener noreferrer'>
                <li className='l3'><i className='fab fa-github' /></li>
            </a>
            <a href='https://twitter.com/TonyStr_' target='_blank' rel='noopener noreferrer'>
                <li className='l4'><i className='fab fa-twitter' /></li>
            </a>
        </ul>
    );
}
