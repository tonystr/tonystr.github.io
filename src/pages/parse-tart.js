import React, { useState, useEffect } from 'react';

export default function ParseTart(props) {

    const parsed = [];

    if (!props.source) return <div />;

    if (Array.isArray(props.source)) {
        for (const item of props.source) {
            parsed.push(parseSource(item));
        }
    } else parsed.push(parseSource(props.source));

    console.log(parsed);

    return (
        <div {...props}>
            {parsed}
        </div>
    );
}

const tags = {
    'strong': /(?:^|[^\\])\*{2}(?<text>[\s\S]*?[^\\])\*{2}/i,
    'em': /(?:^|[^\\])([\*_])(?<text>[\s\S]*?[^\\])\1/i,
    'h1': /(?:^|[^\\])#(?<text>[\s\S]*?)[\n\r]/
}

function parseSource(source) {
    let array = source.split(/\n\r?/g);

    for (const tag in tags) {
        for (let i = 0; i < array.length; i++) {
            const string = array[i];
            if (typeof string !== 'string') continue;
            const match = string.match(tags[tag]);
            if (match) {
                array.splice(
                    i,
                    1,
                    string.slice(0, match.index + 1),
                    React.createElement(
                        tag,
                        null,
                        match.groups.text
                    ),
                    string.slice(match.index + match[0].length)
                );
            }
        }
    }

    return array;
}
