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
    rad('匸,亡', 2, 'dead, hiding frame', 'かくしがまえ', '隠構', 17),
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
    { type: 'header-stroke', stroke: 5 },
    rad('玄', 5, 'dark, profound', 'げん', '', 6),
    rad('王,玉,玊,⺩', 4, 'king; ball, jade', 'お; たま', '', 473),
    rad('瓜', 6, 'melon', 'うり', '', 55),
    rad('瓦', 5, 'tile', 'かわら', '', 174),
    rad('甘', 5, 'sweet', 'あまい', '', 22),
    rad('生', 5, 'life, be born', 'うまれる', '', 22),
    rad('用,甩', 5, 'use; (throw)', 'もちいる', '用いる', 10),
    rad('田', 5, 'field', 'た', '', 192),
    rad('疋,⺪', 5, 'bolt of cloth', 'ひき', '', 15),
    rad('疒', 5, 'sickness', 'やまいだれ', '病垂', 526),
    rad('癶', 5, 'footsteps', 'はつがしら', '発頭', 15),
    rad('白', 5, 'white', 'しろ', '', 109),
    rad('皮', 5, 'skin', 'けがわ', '毛皮', 94),
    rad('皿', 5, 'dish', 'さら', '', 129),
    rad('目', 5, 'eye', 'め', '', 647),
    rad('矛', 5, 'spear, pike', 'むのほこ', '', 65),
    rad('矢', 5, 'arrow', 'や', '', 64),
    rad('石', 5, 'stone', 'いし', '', 499),
    rad('示,礻', 5, 'altar, display', 'しめす', '', 213),
    rad('禸', 5, 'track', 'ぐうのあし', '', 12),
    rad('禾', 5, 'two-branch tree', 'のぎ', 'ノ木', 431),
    rad('穴', 5, 'cave', 'あな', '', 298),
    rad('立', 5, 'stand, erect', 'たつ', '', 101),
    { type: 'header-stroke', stroke: 6 },
    rad('竹,⺮', 6, 'bamboo', 'たけ', '', 953),
    rad('米', 6, 'rice', 'こめ', '', 318),
    rad('糸,糹', 6, 'thread, string', 'いと', '', 823),
    rad('缶', 6, 'can, earthenware jar', 'かん', '', 77),
    rad('罒,网,罓,⺲,⺳', 5, 'net', 'あみがしら', '網頭', 163),
    rad('羊,⺶,⺷', 6, 'sheep', 'ひつじ', '', 156),
    rad('羽', 6, 'feather, wing', 'はね', '', 220),
    rad('耂,老,⺹', 4, 'old', 'ろう', '', 22),
    rad('而', 6, 'rake, beard', 'しかして', '', 22),
    rad('耒', 6, 'plow', 'らいすき', '', 84),
    rad('耳', 6, 'ear', 'みみ', '', 172),
    rad('聿,⺻', 6, 'brush', 'ふでづくり', '聿旁', 19),
    rad('肉,⺼,月', 6, 'meat', 'ふでづくり', '', 674),
    rad('臣', 7, 'minister, official', 'しん', '', 16),
    rad('自', 6, 'oneself', 'みずから', '', 34),
    rad('至', 6, 'arrive', 'いたる', '', 24),
    rad('臼', 6, 'mortar', 'うす', '', 71),
    rad('舌', 6, 'tongue', 'した', '', 31),
    rad('舛', 7, 'opposite', 'ます', '', 10),
    rad('舟', 6, 'boat', 'ふね', '', 197),
    rad('艮', 6, 'stopping', 'うしとら', '丑寅', 5),
    rad('色', 6, 'color, prettiness', 'いろ', '', 21),
    rad('艹,艸,䒑', 3, 'grass, vegitation', 'くさ', '草', 1902),
    rad('虍', 6, 'tiger stripes', 'とらかんむり', '虎冠', 114),
    rad('虫', 6, 'insect', 'むし', '虎冠', 1067),
    rad('血', 6, 'blood', 'ち', '', 60),
    rad('行', 6, 'go, do', 'ぎょう', '', 53),
    rad('衣,衤', 6, 'clothes', 'ころも', '', 607),
    rad('西,襾,覀', 6, 'west', 'にし', '', 29),
    { type: 'header-stroke', stroke: 7 },
    rad('見', 7, 'see', 'みる', '', 161),
    rad('角', 7, 'horn', 'つの', '', 158),
    rad('言,訁', 7, 'speech', 'こと', '', 861),
    rad('谷', 7, 'valley', 'たに', '', 54),
    rad('豆', 7, 'bean', 'まめ', '', 68),
    rad('豕', 7, 'pig', 'いのこ', '猪子', 148),
    rad('豸', 7, 'cat, badger', 'むじな', '狢', 140),
    rad('貝', 7, 'shell', 'かい', '', 277),
    rad('赤', 7, 'red, bare', 'あか', '', 31),
    rad('走,赱', 7, 'run', 'はしる', '', 285),
    rad('足,⻊', 7, 'foot', 'あし', '', 580),
    rad('身', 7, 'body', 'み', '', 97),
    rad('車', 7, 'cart, car', 'くるま', '', 361),
    rad('辛', 7, 'spicy, bitter', 'からい', '', 36),
    rad('辰', 7, 'morning', 'しんのたつ', '辰のたつ', 15),
    rad('⻌,辵,辶', 3, 'walk', 'しんにょう', '之繞', 381),
    rad('邑,⻏,阝', 3, 'walk (阝 right)', 'むら', '', 350),
    rad('酉', 7, 'sake (rice-based alcoholic beverage)', 'とり', '', 290),
    rad('釆', 7, 'divide, distinguish, choose', 'のごめ', 'ノ米', 14),
    rad('里', 7, 'village, mile', 'さと', '', 14),
    { type: 'header-stroke', stroke: 8 },
    rad('金,釒', 8, 'metal, gold', 'かね', '', 806),
    rad('長,镸', 8, 'long, grow; leader', 'ながい; ちゅう', '', 55),
    rad('門', 8, 'gate', 'もん', '', 246),
    rad('阜,⻖,阝', 3, 'mound, dam (阝left)', 'ぎふのふ', '岐阜の阜', 348),
    rad('隶', 8, 'slave, capture', 'れいづくり', '隷旁', 12),
    rad('隹', 8, 'old bird', 'ふるとり', '古鳥', 233),
    rad('雨,⻗', 8, 'rain', 'あめ', '', 298),
    rad('青,靑', 8, 'green, blue', 'あお', '', 17),
    rad('非', 8, 'wrong', 'あらず', '', 25),
    { type: 'header-stroke', stroke: 9 },
    rad('面,靣', 9, 'face', 'めん', '', 66),
    rad('革', 9, 'leather, rawhide', 'かくのかわ', '', 305),
    rad('韋', 10, 'tanned leather', 'なめしがわ', '', 100),
    rad('韭', 9, 'leek', 'にら', '', 20),
    rad('音', 9, 'sound', 'おと', '', 43),
    rad('頁', 9, 'big shell', 'おおがい', '大貝', 372),
    rad('風,𠘨', 9, 'wind', 'かぜ', '', 182),
    rad('飛', 9, 'fly', 'とぶ', '', 92),
    rad('食,飠,𩙿', 9, 'eat, food', 'しょく', '', 403),
    rad('首', 9, 'neck, head', 'くび', '', 20),
    rad('香', 9, 'fragrant', 'においこう', '', 37),
    { type: 'header-stroke', stroke: 10 },
    rad('馬', 10, 'horse', 'うま', '', 427),
    rad('骨', 10, 'bone', 'ほね', '', 185),
    rad('高,髙', 10, 'tall, high', 'たかい', '', 34),
    rad('髟', 10, 'hair', 'かみがしら', '髪頭', 243),
    rad('鬥', 10, 'fight', 'とうがまえ', '闘構', 23),
    rad('鬯', 10, 'herbs, sacrificial wine', 'ちょう', '', 8),
    rad('鬲', 10, 'tripod, cauldron', 'かなえ', '', 73),
    rad('鬼', 10, 'ghost, demon', 'おに', '', 141),
    { type: 'header-stroke', stroke: 11 },
    rad('魚', 11, 'fish', 'うお', '', 571),
    rad('鳥', 11, 'bird', 'とり', '', 750),
    rad('鹵', 11, 'salt', 'ろ', '', 44),
    rad('鹿', 11, 'deer', 'しか', '', 104),
    rad('麦,麥', 7, 'wheat', 'むぎ', '麦', 131),
    rad('麻', 11, 'hemp, flax', 'あさ', '', 34),
    { type: 'header-stroke', stroke: 12 },
    rad('黄,黃', 11, 'yellow', 'きいろ', '黄色', 34),
    rad('黍', 12, 'millet', 'きいろ', 'きび', 46),
    rad('黒,黑', 11, 'black', 'くろ', '', 172),
    rad('黹', 12, 'embroidery, needlework', 'ふつ', '黻', 8),
    { type: 'header-stroke', stroke: 13 },
    rad('黽', 13, 'frog, amphibian', 'べん', '', 40),
    rad('鼎', 13, 'sacrificial tripod', 'かなえ', '', 14),
    rad('鼓', 13, 'drum', 'つづみ', '', 46),
    rad('鼠', 13, 'rat, mouse', 'ねずみ', '', 92),
    { type: 'header-stroke', stroke: 14 },
    rad('鼻', 14, 'nose', 'はな', '', 49),
    rad('齊', 14, 'even, uniformly', 'せい', '斉', 18),
    { type: 'header-stroke', stroke: 15 },
    rad('歯,齒', 12, 'tooth, molar', 'は', '', 162),
    { type: 'header-stroke', stroke: 16 },
    rad('竜,龍', 10, 'dragon', 'りゅう', '', 14),
    rad('亀,龜', 11, 'turtle, tortoise', 'かめ', '', 24),
    { type: 'header-stroke', stroke: 17 },
    rad('龠', 17, 'flute', 'やく', '', 19)
];

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

function ArrayToGrid({ array, width, ElmComponent, className }) {
    let trs = [];
    let tr = [];
    for (let i = 0; i < array.length; i++) {
        tr.push(<ElmComponent elm={array[i]} key={i} />);
        if (i % width === width - 1) {
            trs.push(<span key={Math.floor(i / width)} className='stroke-line'>{tr}</span>);
            tr = [];
        }
    }
    if (tr.length) trs.push(tr);
    return <div className={'array-table ' + className}>{trs}</div>;
}

export default function Kanji() {
    const [selectedRad,     setSelectedRad    ] = useState(null);
    const [highlightStroke, setHighlightStroke] = useState(0);
    const [width, setWidth] = useState(16);

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

    // Find rendered width
    useEffect(() => {
        const elm = document.querySelector('#kanjipage .left .radical-table');
        setWidth(Math.floor((elm.offsetWidth) / 44));
        window.addEventListener('resize', () => {
            const elm = document.querySelector('#kanjipage .left .radical-table');
            setWidth(Math.floor((elm.offsetWidth) / 44));
        });
    }, []);

    return (
        <div id='kanjipage'>
            <div className='left'>
                <ArrayToGrid
                    className='radical-table'
                    array={radicals}
                    width={width}
                    ElmComponent={props => (
                        <RadicalCell
                            {...props}
                            selectedRad={selectedRad}
                            onClick={() => setSelectedRad(props.elm)}
                            highlightStroke={(selectedRad && selectedRad.stroke) || highlightStroke}
                            setHighlightStroke={setHighlightStroke}
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

function RadicalCell({ elm, onClick, selectedRad, highlightStroke, setHighlightStroke }) {
    return (
        <div
            onClick={onClick}
            className={
                (selectedRad && elm === selectedRad ? 'selected' : '') +
                ' type-' + elm.type +
                (elm.strokeCount === highlightStroke ? ' hl-stroke' : '')
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
            </div>
        </div>
    );
}
