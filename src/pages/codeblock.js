import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import { Scrollbars } from 'react-custom-scrollbars';

export default function CodeBlock(props) {
    return (
        <SyntaxHighlighter
            className={'code ' + (props.inline ? 'inline' : 'block')}
            language={props.language || null}
            style={styleOneDark}
            children={props.value}
        />
    );
}
