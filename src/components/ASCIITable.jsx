import React from 'react';

export default function ASCIITable(props) {

    const showDecimal = props.showDecimal !== undefined ? props.showDecimal : true;
    const showHex     = props.showHex     !== undefined ? props.showHex     : true;
    const showChar    = props.showChar    !== undefined ? props.showChar    : true;

    const specialCharDescs = [
        'null', 'start of heading', 'start of text', 'end of text', 'end of transmission',
        'enquiry', 'acknowledge', 'bell', 'backspace', 'horizontal tab', 'new line feed',
        'vertical tab', 'new page feed', 'carriage return', 'shit out', 'shift in',
        'data link escape', 'device control 1', 'device control 2', 'device control 3',
        'device control 4', 'negative acknowledge', 'synchronous idle', 'end of trans. block',
        'cancel', 'end of medium', 'substitute', 'escape', 'file separator', 'group separator',
        'record separator', 'unit separator', 'space'
    ];
    specialCharDescs[127] = 'delete';
    const specialChars = [
        'NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'TAB', 'LF', 'VT', 'FF',
        'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM',
        'SUB', 'ESC', 'FS', 'GS', 'RS', 'US', 'Space'
    ];
    specialChars[127] = 'DEL';

    const renderRow = i => {
        const tds = [];
        for (let j = 0; j < 4; j++) {
            const dec = i + j * 32;
            if (showDecimal) tds.push(<td>{dec}</td>);
            if (showHex    ) tds.push(<td>{dec.toString(16)}</td>);
            if (showChar   ) tds.push(<td title={specialCharDescs[dec] || ''}>{
                specialChars[dec] || String.fromCharCode(dec)
            }</td>);
        }
        return <tr>{tds}</tr>;
    }

    const renderRows = () => {
        const headers = [];
        for (let i = 0; i < 4; i++) {
            if (showDecimal) headers.push(<th title='decimal'>    Dec </th>);
            if (showHex    ) headers.push(<th title='hexadecimal'>Hex </th>);
            if (showChar   ) headers.push(<th title='character'>  Char</th>);
        }

        const rows = [<tr>{headers}</tr>];
        for (let i = 0; i < 32; i++) {
            rows.push(renderRow(i));
        }
        return rows;
    }

    return (
        <table className={props.className ? 'ascii-table ' + props.className : 'ascii-table'}>
            {renderRows()}
        </table>
    );
}
