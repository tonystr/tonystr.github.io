import React, { useState, useEffect } from 'react';
import A from '../components/A.jsx';
import '../styles/kanji.scss';

let radNum = 1;
const radicals = [
    { type: 'header-stroke', stroke: 1 },
    rad('一', 1, 'one', 'いち', '一', 42),
    rad('丨', 1, 'line, stick', 'ぼう', '棒', 21),
    rad('丶', 1, 'dot', 'てん', '点', 10),
    rad('丿', 1, 'bend, slash, possessive particle *no*', 'の', 'ノ', 33),
    rad('乙,乛,⺄,乚,乙,乀', 1, 'second, latter', 'おつ', '乙', 42),
    rad('亅', 1, 'hook, hooked stick', 'はねぼう', '撥棒', 19),
    { type: 'header-stroke', stroke: 2 },
    rad('二', 2, 'two', 'に', 'ニ', 29),
    rad('亠', 2, 'pot lid', 'なべぶた', '鍋蓋', 38),
    rad('人,⺅,𠆢', 2, 'human', 'ひと', '人', 794),
    rad('儿', 2, 'legs, human underneath', 'にんにょう', '人繞', 52),
    rad('入,𠆢', 2, 'enter, insert', 'いる', '入', 28),
    rad('八', 2, 'eight, eight-head', 'はちがしら', '八頭', 44),
    rad('冂', 2, 'inverted box, window frame', 'まきがまえ', '牧構', 50),
    rad('冖', 2, 'cover, *wa* crown', 'わかんむり', 'ワ冠', 30),
    rad('冫', 2, 'ice, 2-stroke water', 'にすい', '二水', 115),
    rad('几,⺇', 2, 'desk', 'つくえ', '机', 38),
    rad('凵', 2, 'container, inbox', 'うけばこ', '受け箱', 23),
    rad('刀,⺉,⺈', 2, 'sword', 'かたな', '刀', 377),
    rad('力', 2, 'power, force', 'ちから', '力', 163),
    rad('勹', 2, 'embrace, wrap frame', 'つつみがまえ', '包構', 64),
    rad('匕', 2, 'spoon *hi*', 'さじのひ', '匕のヒ', 19),
    rad('匚', 2, 'box frame', 'はこがまえ', '匚構', 64),
    rad('匸,亡', 3, 'dead, hiding frame', 'かくしがまえ', '隠構', 17),
    rad('十', 2, 'ten, complete', 'じゅう', '十', 55),
    rad('卜,⺊', 2, 'divination, *to*', 'ぼくのと', '卜のト', 45),
    rad('卩,㔾', 2, 'seal', 'ふしづくり', '節旁', 40),
    rad('厂', 2, 'cliff', 'がんだれ', '雁垂', 129),
    rad('厶', 2, 'private, *mu*', 'む', '', 40),
    rad('又', 2, 'again, right hand', 'また', '', 91),
    { type: 'header-stroke', stroke: 3 },
    rad('口', 3, 'mouth, opening', 'くち', '', 1146),
    rad('囗', 3, 'enclosure', 'くにがまえ', '国構', 118),
    rad('土', 3, 'earth', 'つち', '', 580),
    rad('士', 3, 'scholar, bachelor', 'さむらい', '侍', 24),
    rad('夂', 3, 'winter, go', 'ふゆがしら', '冬頭', 34),
    rad('夊', 3, 'winter variant, go slowly', 'すいにょう', '夊繞', null),
    rad('夕', 3, 'evening, sunset', 'ゆうべ', '', 34),
    rad('大', 3, 'big, very', 'だい', '大', 132),
    rad('女', 3, 'woman, female', 'おんあ', '', 681),
    rad('子', 3, 'child', 'こ', '', 83),
    rad('宀', 3, 'roof', 'うかんむり', 'ウ冠', 246),
    rad('寸', 3, 'sun (unit of measurement)', 'すん', '', 40),
    rad('小,⺌,⺍', 3, 'small, insignificant', 'ちいさい', '小さい', 41),
    rad('尢,尤,尣', 3, 'lame', 'まげあし', '', 66),
    rad('尸', 3, 'corpse', 'しかばね', '屍', 148),
    rad('屮', 3, 'sprout', 'てつ', '', 38),
    rad('山', 3, 'mountain', 'やま', '', 636),
    rad('巛,川,巜', 3, 'river', 'かわ', '', 29),
    rad('工', 3, 'work', 'たくみ', '', 17),
    rad('已,己,巳', 3, 'oneself', 'おのれ', '', 20),
    rad('巾', 3, 'cloth, turban, scarf', 'はば', '', 295),
    rad('干', 3, 'dry', 'ほし', '', 9),
    rad('幺', 3, 'short thread', 'いとがしら', '', 50),
    rad('广', 3, 'dotted cliff', 'まだれ', '麻垂', 15),
    rad('廴', 3, 'long stride', 'いんにょう', '延繞', 9),
    rad('廾', 3, 'two hands, twenty', 'にじゅうあし', '二十脚', 50),
    rad('弋', 3, 'ceremony, shoot, arrow', 'しきがまえ', '式構', 15),
    rad('弓', 3, 'bow', 'ゆみ', '式構', 165),
    rad('彐,彑', 3, 'pig\'s head', 'けいがしら', '彑頭', 25),
    rad('彡', 3, 'hair, bristle, stubble, beard', 'さんづくり', '三旁', 62),
    rad('彳', 3, 'step', 'ぎょうにんべん', '行人偏', 215),
    { type: 'header-stroke', stroke: 4 },
    rad('心,忄,⺗', 4, 'heart', 'りっしんべん', '立心偏', 1115),
    rad('戈', 4, 'spear, halberd', 'かのほこ', '', 116),
    rad('戶,戸,户', 4, 'door, house', 'とびらのと', '', 44),
    rad('手,扌,龵', 4, 'hand', 'て', '', 1203),
    rad('支', 4, 'branch', 'しにょう', '支繞', 26),
    rad('攵,攴', 4, 'strike, whip', 'のぶん', 'ノ文', 296),
    rad('文', 4, 'script, literature', 'ぶん', '', 26),
    rad('斗', 4, 'dipper, measuring scoop', 'とます', '', 32),
    rad('斤', 4, 'axe', 'おの', '斧', 55),
    rad('方', 4, 'way, square, raft', 'ほう', '', 92),
    rad('无,旡', 4, 'have not', 'むにょう', '', 12),
    rad('日', 4, 'sun, day', 'にち', '', 453),
    rad('曰', 4, 'say', 'いわく', '', 37),
    rad('月,⺝', 4, 'moon, month, body, flesh', 'つき', '', 69),
    rad('木', 4, 'tree', 'き', '', 1369),
    rad('欠', 4, 'yawn, lack', 'あくび', '', 235),
    rad('止', 4, 'stop', 'とめる', '', 99),
    rad('歹,歺', 4, 'death, decay', 'がつへん', '歹偏', 231),
    rad('殳', 4, 'weapon, lance', 'ほこつくり', '', 93),
    rad('毋,母,⺟', 4, 'do not; mother', 'なかれ; はは', '', 93),
    rad('比', 4, 'compare, compete', 'くらべる', '', 21),
    rad('毛', 4, 'fur, hair', 'け', '', 211),
    rad('氏', 4, 'clan', 'うじ', '', 10),
    rad('气', 4, 'steam, breath', 'きがまえ', '気構', 17),
    rad('水,氵,氺', 4, 'water', 'みず', '', 1595),
    rad('火,灬', 4, 'fire', 'ひ', '', 639),
    rad('爪,爫,⺥,⺤', 4, 'claw, nail, talon', 'つめ', '', 36),
    rad('父', 4, 'father', 'ちち', '', 10),
    rad('爻', 4, 'mix, twine, cross', 'こう', '', 16),
    rad('爿,丬', 4, 'split wood', 'しょうへん', '爿偏', 48),
    rad('片', 4, '(a) slice', 'かた', '', 77),
    rad('牙', 5, 'fang', 'きばへん', '牙編', 9),
    rad('牛,牜,⺧', 4, 'cow', 'うし', '', 233),
    rad('犬,犭', 4, 'dog', 'いぬ', '', 444),
    rad('玄', 5, 'dark, profound', 'げん', '', 6),
    rad('王,玉,玊,⺩', 4, 'king; ball, jade', 'お; たま', '', 473),
];

// eslint-disable-next-line
const rads = '⼥  ⼦  ⼧ ⼨  ⼩ ⺌ ⺐ ⼫ ⼬ ⼭   ⼮ 川 ⼯  ⼰ ⼱  ⼲ ⺓ ⼴ ⼵ ⼶ ⼷ ⼸  ⼹ ⺕ ⺔ ⼺ ⼻ ⺾ ⻌ ⻏ ⻖ ⺍ ⺖ ⺘ ⺡ ⺨ ⼼ ⺗ ⼽ ⼾  ⼿ ⽀ ⽁ ⺙ ⽂ ⽃ ⽄ ⽅  ⽆ ⽇  ⽈ ⽉ ⺝  ⽊  ⽋ ⽌ ⽍  ⽎ ⽏ ⽐ ⽑ ⽒ ⽓ ⽔ ⽕  ⺣ ⽖ ⺤ 爫 ⽗ ⽘ ⽙ ⽚   ⽜  ⽝  ⺭ 㓁 ⺹ ⽞ ⽟  ⽡ ⽢ ⽣ ⽤ ⽥  ⽦ ⺪ ⽧ ⽨ ⽩  ⽪ ⽫ ⽬   ⽭  ⽮  ⽯  ⽰ ⽱ ⽲ ⽳  ⽴    氺 ⺫ 𦉰 ⻂ ⺛ ⽵ ⺮ ⽶  ⽷  ⽸ ⽹ ⽺ ⺷ 羽 ⽻ ⽼ ⽽ ⽾ ⽿  ⾀ ⾁ ⾂ ⾃ ⾄  ⾅ ⾆ ⾇ ⾈  ⾉ ⾊ ⾋ ⾌ ⾍  ⾎ ⾏ ⾐ ⾑ ⻃ ⽠ ⾒ ⾓  ⾔  ⾕  ⾖  ⾗ ⾘ ⾙  ⾚ ⾛  ⾜ ⻊ ⾝  ⾞  ⾟ ⾠ ⾡ ⾢ ⾣  ⾤  ⾥  ⾂  ⻨ ⾦  ⻑ ⾨ ⾩ ⾪ ⾫ ⾬ ⻗ ⾭ ⻘ ⾮ ⻟ ⻫ ⾯ ⾰  ⾲ ⾳ ⾴ ⾵ ⾶ ⾷ ⾸ ⾹ ⾺  ⾻  ⾼ ⾽ ⾾ ⾿ ⿀ ⿁ ⾱ ⿂  ⿃ ⿄ ⿅ ⿆ ⿇  ⻩ 黒 ⻲ ⿈ ⿉ ⿊ ⿋ ⻭ ⿌ ⿍ ⿎ ⿏ ⿐ ⿑ ⿒ ⿓ ⿔ ⿕';

function rad(chr, strokeCount, meaning, reading, kanji, frequency) {
    const chrSplit = chr.split(',');
    return {
        type: 'radical',
        chr: chrSplit[0],
        chrs: chrSplit,
        strokeCount: strokeCount,
        meaning: meaning,
        reading: reading,
        kanji: kanji,
        frequency: frequency,
        number: radNum++
    };
}

function ArrayToTable({ array, width, TDComponent, className }) {
    let trs = [];
    let tr = [];
    for (let i = 0; i < array.length; i++) {
        tr.push(<TDComponent elm={array[i]} key={i} />);
        if (i % width === width - 1) {
            trs.push(<tr key={Math.floor(i / width)}>{tr}</tr>);
            tr = [];
        }
    }
    if (tr.length) trs.push(tr);
    return <table className={className}><tbody>{trs}</tbody></table>;
}

export default function Kanji() {
    const [selectedRad,     setSelectedRad    ] = useState(null);
    const [highlightStroke, setHighlightStroke] = useState(0);
    const width = 16;

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
            let ni = (index + x + y * width + radicals.length) % radicals.length;
            while (radicals[ni].type === 'header-stroke') {
                ni = (ni + x + y * width + radicals.length) % radicals.length;
            }
            setSelectedRad(radicals[ni]);
        };
        document.addEventListener('keydown', f);
        return () => document.removeEventListener('keydown', f);
    });

    return (
        <div id='kanjipage'>
            <div className='left'>
                <ArrayToTable
                    array={radicals}
                    width={width}
                    TDComponent={({ elm }) => (
                        <td
                            onClick={() => setSelectedRad(elm)}
                            className={
                                (selectedRad && elm.chr === selectedRad.chr ? 'selected' : '') +
                                ' type-' + elm.type +
                                (elm.strokeCount === highlightStroke ? ' hl-stroke' : '')
                            }
                            onMouseEnter={elm.type === 'header-stroke' && (e => {
                                setHighlightStroke(elm.stroke);
                            })}
                            onMouseLeave={elm.type === 'header-stroke' && (e => {
                                setHighlightStroke(0);
                            })}
                        >
                            <div className='chr'>{elm.chr || elm.stroke}</div>
                            <div className='num'>{elm.number}</div>
                        </td>
                    )}
                    className='radical-table'
                />
            </div>
            <div className='right'>
                {selectedRad && selectedRad.type === 'radical' && <RadicalPanel rad={selectedRad} />}
            </div>
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
                            <li>{l[0].toUpperCase() + l.slice(1)}</li>
                        ))}
                    </ul>
                </div>
                <div className='chrs'>{rad.chrs}</div>
                <div className='num'>{rad.number}</div>
            </div>
        </div>
    );
}
