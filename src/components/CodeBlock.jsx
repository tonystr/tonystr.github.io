import React from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";

export default function CodeBlock(props) {
    if (props.inline) return (
        <pre className={`code lang-${props.language || 'auto'} inline`}>
            <code>
                {props.value}
            </code>
        </pre>
    );

    return (
        <SyntaxHighlighter
            className={`code lang-${props.language || 'auto'} codeblock-full`}
            language={props.language || null}
            style={styleOneDark}
        >
            {props.value}
        </SyntaxHighlighter>
    );
}
