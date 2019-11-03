import React, { useState, useEffect } from 'react';
import A from '../components/A.jsx';
import radicalSrc from '../data/radicals.js';
import '../styles/kanji.scss';

const radicals = radicalSrc.map(rad => Array.isArray(rad) ?
    generateRadical(...rad) :
    rad
);

function generateRadical(number, chr, strokeCount, meaning, reading, kanji, frequency, isPart) {
    const chrSplit = chr.split(',');
    return {
        type: 'radical',
        chr: chrSplit[0],
        chrs: chrSplit,
        chrText: chr,
        strokeCount: strokeCount,
        meaning: meaning,
        reading: reading,
        kanji: kanji,
        frequency: frequency,
        number: number,
        isPart: isPart || false
    };
}

function ArrayToGrid({ array, ElmComponent, className, breakOn }) {
    let trs = [];
    let tr = [];
    for (let i = 0; i < array.length; i++) {
        if (tr.length && breakOn && breakOn(array[i])) {
            trs.push(<div key={array[i].stroke} className='array-table'>{tr}</div>);
            tr = [];
        }
        tr.push(<ElmComponent elm={array[i]} key={i} />);
    }
    if (trs.length) {
        if (tr.length) trs.push(<div key={-23} className='array-table'>{tr}</div>);
        return <div className={className}>{trs}</div>;
    }
    return <div className={'array-table list ' + className}>{tr}</div>;
}

function calcNi(index, width, x, y, listView, strokeHeader) {
    let addNi = true;
    let ni;
    let wh = width;

    if (listView === 'list' && y !== 0) {
        let i = index;
        addNi = false;
        while (i >= 0 && radicals[--i].type !== 'header-stroke') {};
        let nyi = i + y;
        while (nyi >= 0 && nyi < radicals.length) {
            if (radicals[nyi].type === 'header-stroke') {
                ni = nyi + Math.abs(i - index);
                break;
            }
            nyi += y;
        }
    } else if (y !== 0 && (
        (y < 0 && index < width + 2 * !strokeHeader) ||
        (y > 0 && index >= radicals.length - width - 6 * !strokeHeader)
    )) {
        const diff = radicals.length % width;
        wh += radicals.length % width;
        if (index < diff + 2 * !strokeHeader) wh -= width;
        if (index >= radicals.length - diff - 6 * !strokeHeader) wh -= width;

    } else if (!strokeHeader && y !== 0) {
        // Count headers between index and target index
        for (let i = index + x; i !== index + x + y * wh; i += y) {
            if (radicals[i].type === 'header-stroke') wh++;
        }
        ni = (index + x + y * wh + radicals.length) % radicals.length;
        addNi = false;
        while (radicals[ni].type === 'header-stroke') {
            ni += y;
        }
    }
    if (addNi) ni = (index + x + y * wh + radicals.length) % radicals.length;
    if (radicals[ni].type === 'header-stroke') {
        return calcNi(ni, width, x, y, listView, strokeHeader);
        // ni = (ni + (
        //     !strokeHeader && y !== 0 ? y : x + y * wh
        // ) + radicals.length) % radicals.length;
    }
    return ni;
}

function Search({ setResults, setSelectedRad }) {
    const [value, setValue] = useState('');

    const handleReset = () => {
        setValue('');
        setResults([]);
    };

    return (
        <div className='search-radicals'>
            <input
                type='text'
                placeholder='Search Radicals...'
                value={value}
                onChange={e => {
                    const val = e.target.value;
                    setValue(val);
                    if (val.length < 1) {
                        setSelectedRad(null);
                        setResults([]);
                        return;
                    }
                    const results = radicals.filter(rad => rad.type === 'radical' && (
                        rad.meaning.includes(val) ||
                        rad.chrText.includes(val) ||
                        rad.reading.includes(val) ||
                        rad.kanji.includes(val) ||
                        `${rad.number}` === val
                    ));
                    setResults(results);
                    setSelectedRad(results[0]);
                }}
            />
            {value.length > 0 && <div onClick={handleReset} className='cancel-text'>×</div>}
        </div>
    );
}

export default function Kanji() {
    const [selectedRad,     setSelectedRad    ] = useState(null);
    const [highlightStroke, setHighlightStroke] = useState(0);
    const [listView,        setListView       ] = useState('grid');
    const [width,           setWidth          ] = useState(16);
    const [sepLines,        setSepLines       ] = useState(false);
    const [strokeHeader,    setStrokeHeader   ] = useState(true);
    const [searchResults,   setSearchResults  ] = useState([]);

    // Handle keyboard radical select
    useEffect(() => {
        const f = e => {
            const k = e.key.toUpperCase();
            let x = (k === 'D') - (k === 'A');
            let y = (k === 'S') - (k === 'W');
            if (e.key.startsWith('Arrow')) {
                const d = e.key[5];
                x = (d === 'R') - (d === 'L');
                y = (d === 'D') - (d === 'U');
            }
            const index = radicals.findIndex(r => r === selectedRad);

            const ni = calcNi(index, width, x, y, listView, strokeHeader);

            setSelectedRad(radicals[ni]);
        };
        document.addEventListener('keydown', f);
        return () => document.removeEventListener('keydown', f);
    });

    // Find rendered width
    useEffect(() => {
        const updateWidth = () => {
            const elm = document.querySelector('#kanjipage .left .radical-table');
            setWidth(Math.floor((elm.offsetWidth) / 44));
        }
        updateWidth();
        setTimeout(updateWidth, 10);
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    });

    return (
        <div id='kanjipage'>
            <div className='left'>
                <div className='controls' style={{ width: width * 44 }}>
                    <Search setSelectedRad={setSelectedRad} setResults={setSearchResults} />
                    <i onClick={() => setStrokeHeader(!strokeHeader)} title='Toggle stroke-count headers' className='fas stroke-header'>S</i>
                    {listView === 'grid' ?
                        <i onClick={() => setListView('list')} title='View as list'  className='fas fa-list-ul' /> :
                        <i onClick={() => setListView('grid')} title='View as grid'  className='fas fa-grid'>田</i>}
                    <i onClick={() => setSepLines(!sepLines)}  title='Separate lines' className={'fas fa-grip-lines' + (listView !== 'list' ? ' disabled' : '')} />
                </div>
                <ArrayToGrid
                    className={
                        'radical-table' +
                        (sepLines ? ' separate-arrays' : '') +
                        (strokeHeader ? ' stroke-headers' : '')}
                    array={radicals}
                    width={width}
                    breakOn={listView === 'list' ? (e => e.type === 'header-stroke') : null}
                    ElmComponent={props => (
                        <RadicalCell
                            {...props}
                            selectedRad={selectedRad}
                            onClick={props.elm.type === 'header-stroke' && selectedRad === props.elm ?
                                (() => setSelectedRad(null)) :
                                (() => setSelectedRad(props.elm))}
                            highlightStroke={(selectedRad && selectedRad.stroke) || highlightStroke}
                            setHighlightStroke={setHighlightStroke}
                            searchHiglight={searchResults.find(res => res === props.elm) && true}
                        />
                    )}
                />
            </div>
            <div className='right'>
                {selectedRad && selectedRad.type === 'radical' && <RadicalPanel rad={selectedRad} />}
            </div>
        </div>
    );
}

function RadicalCell({ elm, onClick, selectedRad, highlightStroke, setHighlightStroke, searchHiglight }) {
    return (
        <div
            onClick={onClick}
            className={
                (selectedRad && elm === selectedRad ? 'selected' : '') +
                ' type-' + elm.type +
                (elm.strokeCount === highlightStroke ? ' hl-stroke' : '') +
                (searchHiglight ? ' hl-search' : '')
            }
            onMouseEnter={(elm.type === 'header-stroke' && highlightStroke !== elm.stroke) ?
                (e => setHighlightStroke(elm.stroke)) : null
            }
            onMouseLeave={(elm.type === 'header-stroke') ?
                (e => setHighlightStroke(0)) : null
            }
        >
            <div className='chr'>{elm.chr || elm.stroke}</div>
            <div className='num'>{elm.number}</div>
        </div>
    );
}

function RadicalPanel({ rad }) {
    return (
        <div className='selected-rad'>
            <div className='foc'>
                <div className='chr'>
                    <A to={`https://en.wiktionary.org/wiki/Index:Chinese_radical/${rad.chr}`}>
                        {rad.chr}
                    </A>
                </div>
                <div className='reading'>{rad.reading}</div>
                <div className='meaning'>
                    <ul>
                        {rad.meaning.split(/,\s+/g).map(l => (
                            <li key={l}>{l[0].toUpperCase() + l.slice(1)}</li>
                        ))}
                    </ul>
                </div>
                <div className='chrs'>{rad.chrs}</div>
                <div className='num'>{rad.number}</div>
                <div className='wikipedia'>
                    <A to={`https://en.wikipedia.org/wiki/Radical_${rad.number}`}>Wiki</A>
                    &nbsp;&bull;&nbsp;
                    <A to={`https://en.wiktionary.org/wiki/${rad.chr}`}>{rad.chr}</A>
                    &nbsp;&bull;&nbsp;
                    <A to={`https://en.wiktionary.org/wiki/Index:Chinese_radical/${rad.chr}`}>index</A>
                </div>
                <div className='wikipedia'>
                    <A to='https://en.wikipedia.org/wiki/List_of_kanji_by_concept'>Kanji by concept</A>
                </div>
            </div>
        </div>
    );
}
