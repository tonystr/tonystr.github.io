import React from 'react';
import { Link } from 'react-router-dom';

export default function A(props) {
    return props.to && !/^https?:\/\//i.test(props.to) ? (
        <Link
            {...props}
            className={'link ' + (props.className || '')}
            to={props.to}
        />
    ) : (
        <a
            {...props}
            className={'link ' + (props.className || '')}
            href={props.to || props.href}
            target={'_blank' || props.target}
        >
            {props.children}
        </a>
    );
}
