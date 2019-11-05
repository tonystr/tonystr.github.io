import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import A from '../components/A.jsx';
import radicalSrc from '../data/radicals.js';
import kanjiSrc from '../data/kanji.js';
import '../styles/kanji.scss';

const kanji = kanjiSrc.map(kan => ({
    number:  kan[0],
    kanji:   kan[1],
    radical: kan[2],
    strokes: kan[3],
    meaning: kan[4],
    reading: kan[5]
}));

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
        <div className={'search-radicals' + (value.length > 0 ? ' has-text' : '')}>
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
    const hashNum = window.location.href.match(/#(\d+)/);
    const [selectedRad, setSelectedRadInt] = useState(hashNum !== null ?
        radicals.find(rad => rad.number === +hashNum[1]) :
        null
    );
    const [highlightStroke, setHighlightStroke] = useState(0);
    const [listView,        setListView       ] = useState('grid');
    const [width,           setWidth          ] = useState(16);
    const [sepLines,        setSepLines       ] = useState(false);
    const [strokeHeader,    setStrokeHeader   ] = useState(true);
    const [searchResults,   setSearchResults  ] = useState([]);
    const [focus,           setFocus          ] = useState(null);

    const setSelectedRad = rad => {
        rad.kanjis = kanji.filter(kan => rad.chrs.includes(kan.radical));

        const sortedKanjis = [rad.kanjis[0]];
        for (let ki = 1; ki < rad.kanjis.length; ki++) {
            const kan = rad.kanjis[ki];
            for (let i = 0; i < sortedKanjis.length; i++) {
                if (kan.strokes < sortedKanjis[i].strokes || (
                    kan.strokes === sortedKanjis[i].strokes &&
                    kan.number < sortedKanjis[i].number
                )) {
                    sortedKanjis.splice(i, 0, kan);
                    break;
                }
            }
        }
        console.log(sortedKanjis);

        rad.kanjis = sortedKanjis;

        setSelectedRadInt(rad);
        document.location = rad && rad.number ? `#${rad.number}` : '#';
    }

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
            const table   = document.querySelector('#kanjipage .left .radical-table');
            const radCell = document.querySelector('#kanjipage .left .array-table > div');
            // Each cell has -2px margin on one side
            setWidth(Math.floor((table.offsetWidth) / (radCell.offsetWidth - 2)));
        }
        updateWidth();
        setTimeout(updateWidth, 10);
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    });

    return (
        <>
            <Header />
            <div id='kanjipage' className={focus ? 'blur' : ''}>
                <div className='left'>
                    <div className='header' style={{ width: width * 44 }}>
                        <div className='title'>
                            Kangxi Radicals
                        </div>
                        <div className='controls'>
                            <div className='help' onClick={() => setFocus(<HelpMenu dismount={() => setFocus(null)} />)}>help</div>
                            <Search setSelectedRad={setSelectedRad} setResults={setSearchResults} />
                            <i onClick={() => setStrokeHeader(!strokeHeader)} title='Toggle stroke-count headers' className='fas stroke-header'>S</i>
                            {listView === 'grid' ?
                                <i onClick={() => setListView('list')} title='View as list'  className='fas fa-list-ul' /> :
                                <i onClick={() => setListView('grid')} title='View as grid'  className='fas fa-grid'>田</i>}
                            <i onClick={() => setSepLines(!sepLines)}  title='Separate lines' className={'fas fa-grip-lines' + (listView !== 'list' ? ' disabled' : '')} />
                        </div>
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
            {focus && <Focus dismount={() => setFocus(null)} comp={focus} />}
        </>
    );
}

function Focus(props) {
    const handleClick = e => {
        if (!document.querySelector('.focus .content').contains(e.target)) {
            props.dismount();
        }
    }

    return <div className='focus' onClick={handleClick}>{props.comp}</div>;
}

function HelpMenu(props) {
    return (
        <div className='help-menu content'>
            <div className='inner'>
                <div className='title'>Help</div>
                <h2> What are Kangxi Radicals? </h2>
                <p>
                    <A to='https://en.wikipedia.org/wiki/Radical_(Chinese_characters)'>Radicals</A> [部首 (ぶしゅ)] are symbols that represent objects and ideas, and can be combined to create <A to='https://en.wikipedia.org/wiki/Kanji'>Kanji</A> (Chinese characters).
                    Japanese Kanji is based on the <A to='https://en.wikipedia.org/wiki/Kangxi_Dictionary'>Kangxi Dictionary</A>, which has a total of 213 radicals. Some radicals are also Kanji on their own, but most Kanji (over 90%) are classified as "<A to='https://en.wikipedia.org/wiki/Chinese_character_classification#Phono-semantic_compound_characters'>phono-semantic compound characters</A>".
                    These characters consist of a <i>rebus</i> (phonetic part; approximate pronunciation) and a <i>determinative</i> (meaning). In most cases, the determinative is also the radical of a kanji. The determinative is typically either the left [偏 (へん)], upper [冠 (かんむり)] or surrounding [構え (かまえ)] part of a kanji.
                </p>
                <h2> How to use this tool </h2>
                <p>
                    This tool was designed to help look up radicals (and possibly search kanji by radical; not implemented yet). Above the Radical table, is a searchbar. This can be used to highlight radicals by reading (Hiragana), meaning (English) or number. If you wish to find a radical by its stroke count (as is more common), look for the numbered cells, and hover over one to highlight all Radicals that many strokes. The radicals are ordered (left to right, top to bottom) by the official radical numbers, which are in turn <i>mostly</i> ordered by stroke count (some characters have been simplified/changed since the original Kangxi dictionary).
                </p>
                <p>
                    When you click on a radical in the grid, more details about that radical appear on the right. There you'll see the possible alternations of the radical in the top left, the radical number in a darker gray in the top left of the square, and the meaning(s) of the radical to the right. The radical itself is displayed in illustrious green right in the center of the square. Below the square is the radical's reading in <A to='https://en.wikipedia.org/wiki/Hiragana'>hiragana</A>. Below that again, are some links for more information related to that radical. The "Wiki" link directs to the radical number's page, the "厶" page (where "厶" is whatever radical you clicked on) directs to *wiktionary* for that character, and the "index" page directs to a wikipedia page that lists all Kanjis using that Radical, ordered by stroke count.
                </p>
            </div>
            <div onClick={() => props.dismount()} className='close'></div>
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

const haniCache = {};

function RadicalPanel({ rad }) {
    const [hanis, setHanis] = useState(null);

    return (
        <div className='selected-rad'>
            <div className='foc'>
                <div className='chr'>
                    <A to={`https://en.wiktionary.org/wiki/Index:Chinese_radical/${rad.chr}`}>{rad.chr}</A>
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
                    <div className='kanji-results'>
                        {rad.kanjis && rad.kanjis.map(kan => (
                            <div className='kanji'>{kan.kanji}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
