import React from 'react';

export default function WindowCenter(props) {
    return (
        <div {...props} className={(props.className || '') + ' window-center'}>
            <div className='center'>{props.children}</div>
        </div>
    );
}
