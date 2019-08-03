import React from 'react';

export default function SectionTitle(props) {
    return (
        <div {...props} className={
            'section-title section-header ' +
            (props.className || '') +
            (props.children ? ' ttt-' + encodeURIComponent(props.children[0].props.value) : '')
        }>
            <div />
            <span>{props.content} {props.children}</span>
            <div />
        </div>
    );
}
