import React from 'react';

export default function WindowCenter(props) {
    return (
        <div {...props}>
            <div className='window-center'>
                <div className='center'>{props.children}</div>
            </div>
        </div>
    );
}
