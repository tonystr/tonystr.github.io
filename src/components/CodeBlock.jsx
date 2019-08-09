import React, { useEffect } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import '../styles/codeblock.scss';

export default function CodeBlock(props) {
    if (props.inline) return (
        <pre className={`code lang-${props.language || 'auto'} inline`}>
            <code>
                {props.value}
            </code>
        </pre>
    );

    useEffect(() => {
        const block = document.querySelector('.codeblock-full:not(.fixed)');
        if (!block) return;
        block.innerHTML = block.innerHTML.replace(
            /\n<span style="color: rgb\(92, 99, 112\); font-style: italic;">\/\*(\w+)\*\/<\/span>([^\n]*)/g,
            '\n<span class="blob-code-$1">$2&nbsp;</span>'
        );
        block.classList.add('fixed');
    });

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
