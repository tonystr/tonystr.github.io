import React, { useEffect } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import styleOneDark from "react-syntax-highlighter/dist/styles/hljs/atom-one-dark";
import '../styles/codeblock.scss';

export default function CodeBlock(props) {
    if (props.inline) return (
        <pre className={`code lang-${props.language || 'auto'} inline`}>
            <code>{props.value}</code>
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

    console.log(props.value.match(/\/\/\s*#hidecode[\s\S]*?#endhidecode/g));

    const transJSToGML = props.value.includes('#lang=gml');
    console.log("transJSToGML: ", transJSToGML);

    return (
        <SyntaxHighlighter
            className={
                `code lang-${(transJSToGML && 'gml') || props.language || 'auto'} codeblock-full` +
                ((props.language === 'js' || transJSToGML) ? ' executable' : '')
            }
            language={(transJSToGML && 'gml') || props.language || null}
            style={styleOneDark}
            sourceCode={props.value}
        >
            {props.value.replace(/\/\/\s*#hidecode[\s\S]*?#endhidecode([^\n]*\n)?/g, '')}
        </SyntaxHighlighter>
    );
}
