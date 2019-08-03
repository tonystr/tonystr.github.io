import React from 'react';

export default function StandardPage({ className, ...props }) {
    return <div className={'standard-page ' + (className || '')} {...props}/>;
}
