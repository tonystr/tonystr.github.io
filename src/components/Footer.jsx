import React from 'react';
import A from '../components/A.jsx';

export default function Footer(props) {
    return (
        <footer>
            <div className='content'>
                This website uses <A to='https://fontawesome.com/'>FontAwesome</A> by
                Dave Gandy, <A to='https://widgetpack.com/comment-system'>Widget Pack</A> comment
                system, <A to='https://prismjs.com/'>Prism.js</A> syntax highlighter by
                Golmote and Jannik Zschiesche, and <A to='https://reactjs.org/'>React.js</A> by
                Facebook.
                <div className='tony'>
                    Designed and developed by <A to='/'>Tony Strømsnæs</A>
                </div>
            </div>
        </footer>
    );
}
