import React from 'react';
import WindowCenter from './WindowCenter.jsx';

export default function PageLoading(props) {
    return (
        <WindowCenter className='page-loading'>
            Loading...
            <div className='loader' />
        </WindowCenter>
    );
}
