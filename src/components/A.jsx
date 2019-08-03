import React from 'react';
import { Link } from 'react-router-dom';

export default function A(props) {
    return props.to ? (
        <Link
            {...props}
            className={'link ' + (props.className || '')}
            to={props.to}
        />
    ) : <a {...props} className={'link ' + (props.className || '')}>{props.children}</a>;
}
