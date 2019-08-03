import React, { useEffect } from 'react';
import WindowCenter from '../components/WindowCenter.jsx';
import '../styles/articlelogin.scss';

export default function ArticleLogin(props) {

    useEffect(() => {
        const input = document.querySelector('#article-login .input input');
        input.focus();

        document.querySelector('#article-login .input i').addEventListener('click', () => {
            props.attemptLogin(input.value);
        });

        input.addEventListener('keydown', e => {
            if (e.key.toLowerCase() === 'enter') props.attemptLogin(input.value);
        })
    }, []);

    return (
        <WindowCenter id="article-login">
            <div>You found an article, but it hasn't been published yet.</div>
            <div>
                Enter access code:&nbsp;
                <span className='input'>
                    <input name='access' />
                    <i className='far fa-arrow-alt-circle-right' />
                </span>
            </div>
        </WindowCenter>
    );
}
