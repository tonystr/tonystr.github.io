import React from 'react';
import '../styles/kanji.scss';

function rad(chr, strokeCount, meaning, reading, kanji, frequency) {
    const chrSplit = chr.split(',');
    return {
        chr: chrSplit[0],
        chrs: chrSplit,
        strokeCount: strokeCount,
        meaning: meaning,
        reading: reading,
        kanji: kanji,
        frequency: frequency
    };
}

export default function Kanji() {
    const radicals = [
        rad('⼀', 1, 'one', 'いち', '一', 42),
        rad('⼁', 1, 'line, stick', 'ぼう', '棒', 21),
        rad('⼂', 1, 'dot', 'てん', '点', 10),
        rad('⼃,', 1, 'bend, possessive particle *no*', 'の', 'ノ', 33),
        rad('⼄,⺃', 1, 'second, latter', 'おつ', '乙', 42),
        rad('⼅', 1, 'hook, hooked stick', 'はねぼう', '撥棒', 19),
        rad('二', 2, 'two', 'に', 'ニ', 29),
        rad('亠', 2, 'pot lid', 'なべぶた', '鍋蓋', 38),
        rad('⼈,⺅,𠆢', 2, 'human', 'ひと', '人', 794),
        rad('⼉', 2, 'legs, human underneath', 'にんにょう', '人繞', 52),
        rad('⼊,𠆢', 2, 'enter', 'いる', '入', 28),
        rad('⼋,', 2, 'eight, eight-head', 'はちがしら', '八頭', 44),
        rad('冂', 2, 'inverted box, window frame', 'まきがまえ', '牧構', 50),
        rad('冖', 2, 'cover, *wa* crown', 'わかんむり', 'ワ冠', 30),
        rad('⼎', 2, 'ice, 2-stroke water', 'にすい', '二水', 115),
        rad('⼏,⺇', 2, 'desk', 'つくえ', '机', 38),
        rad('凵', 2, 'container, inbox', 'うけばこ', '受け箱', 23),
        rad('⼑,⺉,⺈', 2, 'sword, axe', 'かたな', '刀', 377),
        rad('⼒', 2, 'power, force', 'ちから', '力', 163),
        rad('⼓', 2, 'embrace, wrap frame', 'つつみがまえ', '包構', 64),
        rad('⼔', 2, 'spoon *hi*', 'さじのひ', '匕のヒ', 19),
        rad('⼕', 2, 'box frame', 'はこがまえ', '匚構', 64),
        rad('亡,⼖', 3, 'dead, hiding frame', 'かくしがまえ', '隠構', 17),
        rad('⼗', 2, 'ten, complete', 'じゅう', '十', 55),
        rad('⼘,卜,⺊', 2, 'divination, *to*', 'ぼくのと', '卜のト', 45),
        rad('⼙,㔾', 2, 'seal', 'ふしづくり', '節旁', 40),
        rad('⼚', 2, 'cliff', 'がんだれ', '雁垂', 129),
        rad('⼛', 2, 'private, *mu*', 'む', '', 40),
        rad('⼜', 2, 'again, right hand', 'また', '', 91),
        rad('⼝,', 3, 'mouth, opening', 'くち', '', 1146),
        rad('⼞', 3, 'enclosure', 'くにがまえ', '国構', 118),
        rad('⼟,', 3, 'earth', 'つち', '', 580),
        rad('⼠,', 3, 'scholar, bachelor', 'さむらい', '侍', 24),
        rad('⼡', 3, 'winter', 'ふゆがしら', '冬頭', 34),
        rad('⼢', 3, 'winter variant', 'すいにょう', '夊繞', null),
        rad('⼣', 3, 'evening, sunset', 'ゆうべ', '', 34),
        rad('⼤', 3, 'big, very', 'だい', '大', 132),
        rad('⼥', 3, 'woman, female', 'おんあ', '', 681),
    ];
    const rads = '⼥  ⼦  ⼧ ⼨  ⼩ ⺌ ⺐ ⼫ ⼬ ⼭   ⼮ 川 ⼯  ⼰ ⼱  ⼲ ⺓ ⼴ ⼵ ⼶ ⼷ ⼸  ⼹ ⺕ ⺔ ⼺ ⼻ ⺾ ⻌ ⻏ ⻖ ⺍ ⺖ ⺘ ⺡ ⺨ ⼼ ⺗ ⼽ ⼾  ⼿ ⽀ ⽁ ⺙ ⽂ ⽃ ⽄ ⽅  ⽆ ⽇  ⽈ ⽉ ⺝  ⽊  ⽋ ⽌ ⽍  ⽎ ⽏ ⽐ ⽑ ⽒ ⽓ ⽔ ⽕  ⺣ ⽖ ⺤ 爫 ⽗ ⽘ ⽙ ⽚   ⽜  ⽝  ⺭ 㓁 ⺹ ⽞ ⽟  ⽡ ⽢ ⽣ ⽤ ⽥  ⽦ ⺪ ⽧ ⽨ ⽩  ⽪ ⽫ ⽬   ⽭  ⽮  ⽯  ⽰ ⽱ ⽲ ⽳  ⽴    氺 ⺫ 𦉰 ⻂ ⺛ ⽵ ⺮ ⽶  ⽷  ⽸ ⽹ ⽺ ⺷ 羽 ⽻ ⽼ ⽽ ⽾ ⽿  ⾀ ⾁ ⾂ ⾃ ⾄  ⾅ ⾆ ⾇ ⾈  ⾉ ⾊ ⾋ ⾌ ⾍  ⾎ ⾏ ⾐ ⾑ ⻃ ⽠ ⾒ ⾓  ⾔  ⾕  ⾖  ⾗ ⾘ ⾙  ⾚ ⾛  ⾜ ⻊ ⾝  ⾞  ⾟ ⾠ ⾡ ⾢ ⾣  ⾤  ⾥  ⾂  ⻨ ⾦  ⻑ ⾨ ⾩ ⾪ ⾫ ⾬ ⻗ ⾭ ⻘ ⾮ ⻟ ⻫ ⾯ ⾰  ⾲ ⾳ ⾴ ⾵ ⾶ ⾷ ⾸ ⾹ ⾺  ⾻  ⾼ ⾽ ⾾ ⾿ ⿀ ⿁ ⾱ ⿂  ⿃ ⿄ ⿅ ⿆ ⿇  ⻩ 黒 ⻲ ⿈ ⿉ ⿊ ⿋ ⻭ ⿌ ⿍ ⿎ ⿏ ⿐ ⿑ ⿒ ⿓ ⿔ ⿕';
    return (
        <div id='kanjipage'>
            <ul>
                {rads.split(' ').map(r => (
                    <li key={r}>
                        {r}
                    </li>
                ))}
            </ul>
        </div>
    );
}
