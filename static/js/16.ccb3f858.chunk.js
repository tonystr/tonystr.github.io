(this["webpackJsonptonystr.github.io"]=this["webpackJsonptonystr.github.io"]||[]).push([[16],{456:function(e,t,a){"use strict";(function(){var e,a=this,r=a.romaji;(e=t).version="0.2.1",e.mode="hepburn";var i=function(e){var t,a={};for(t in e)e.hasOwnProperty(t)&&(a[e[t]]=t);return a},n=function(e,t,a){return a.replace(new RegExp(e,"g"),t)},s={hiragana:{"\u304d\u3083":"kya","\u3057\u3083":"sha","\u3061\u3083":"cha","\u306b\u3083":"nya","\u3072\u3083":"hya","\u307f\u3083":"mya","\u308a\u3083":"rya","\u304e\u3083":"gya","\u3075\u3085":"fyu","\u3073\u3083":"bya","\u3074\u3083":"pya","\u304d\u3085":"kyu","\u3057\u3085":"shu","\u3061\u3085":"chu","\u306b\u3085":"nyu","\u3072\u3085":"hyu","\u307f\u3085":"myu","\u308a\u3085":"ryu","\u304e\u3085":"gyu","\u3073\u3085":"byu","\u3074\u3085":"pyu","\u304d\u3087":"kyo","\u3057\u3087":"sho","\u3061\u3087":"cho","\u306b\u3087":"nyo","\u3072\u3087":"hyo","\u307f\u3087":"myo","\u308a\u3087":"ryo","\u304e\u3087":"gyo","\u3073\u3087":"byo","\u3074\u3087":"pyo","\u3064\u3041":"tsa","\u3064\u3043":"tsi","\u3064\u3047":"tse","\u3064\u3049":"tso","\u3061\u3047":"che","\u3057\u3047":"she","\u3058\u3083":"ja","\u3058\u3085":"ju","\u3058\u3087":"jo","\u3075\u3041":"fa","\u3075\u3043":"fi","\u3075\u3047":"fe","\u3075\u3049":"fo","\u3046\u3043":"wi","\u3091":"we","\u3046\u3047":"we","\u3046\u3049":"wo","\u3094\u3041":"va","\u3094\u3043":"vi","\u3094\u3047":"ve","\u3094\u3049":"vo","\u3058\u3047":"je","\u3066\u3043":"ti","\u3067\u3043":"di","\u3067\u3085":"du","\u3068\u3045":"tu","\u3057":"shi","\u3061":"chi","\u3064":"tsu","\u304b":"ka","\u3055":"sa","\u305f":"ta","\u306a":"na","\u306f":"ha","\u307e":"ma","\u3089":"ra","\u304d":"ki","\u306b":"ni","\u3072":"hi","\u307f":"mi","\u308a":"ri","\u304f":"ku","\u3059":"su","\u306c":"nu","\u3075":"fu","\u3080":"mu","\u308b":"ru","\u3051":"ke","\u305b":"se","\u3066":"te","\u306d":"ne","\u3078":"he","\u3081":"me","\u308c":"re","\u3053":"ko","\u305d":"so","\u3068":"to","\u306e":"no","\u307b":"ho","\u3082":"mo","\u308d":"ro","\u308f":"wa","\u3092":"wo","\u304c":"ga","\u3056":"za","\u3060":"da","\u3070":"ba","\u3071":"pa","\u304e":"gi","\u3062":"ji","\u3058":"ji","\u3073":"bi","\u3074":"pi","\u3050":"gu","\u305a":"zu","\u3065":"zu","\u3076":"bu","\u3077":"pu","\u3052":"ge","\u305c":"ze","\u3067":"de","\u3079":"be","\u307a":"pe","\u3054":"go","\u305e":"zo","\u3069":"do","\u307c":"bo","\u307d":"po","\u3084":"ya","\u3086":"yu","\u3088":"yo","\u3042":"a","\u3044":"i","\u3046":"u","\u3048":"e","\u304a":"o","\u3093":"n"},katakana:{"\u30ad\u30e3":"kya","\u30b7\u30e3":"sha","\u30c1\u30e3":"cha","\u30cb\u30e3":"nya","\u30d2\u30e3":"hya","\u30df\u30e3":"mya","\u30ea\u30e3":"rya","\u30ae\u30e3":"gya","\u30d3\u30e3":"bya","\u30d4\u30e3":"pya","\u30ad\u30e5":"kyu","\u30b7\u30e5":"shu","\u30c1\u30e5":"chu","\u30cb\u30e5":"nyu","\u30d2\u30e5":"hyu","\u30df\u30e5":"myu","\u30ea\u30e5":"ryu","\u30ae\u30e5":"gyu","\u30d3\u30e5":"byu","\u30d4\u30e5":"pyu","\u30ad\u30e7":"kyo","\u30b7\u30e7":"sho","\u30c1\u30e7":"cho","\u30cb\u30e7":"nyo","\u30d2\u30e7":"hyo","\u30df\u30e7":"myo","\u30ea\u30e7":"ryo","\u30ae\u30e7":"gyo","\u30d3\u30e7":"byo","\u30d4\u30e7":"pyo","\u30d5\u30e5":"fyu","\u30c4\u30a1":"tsa","\u30c4\u30a3":"tsi","\u30c4\u30a7":"tse","\u30c4\u30a9":"tso","\u30c1\u30a7":"che","\u30b7\u30a7":"she","\u30b7":"shi","\u30c1":"chi","\u30c4":"tsu","\u30b8\u30e7":"jo","\u30b8\u30e3":"ja","\u30b8\u30e5":"ju","\u30d5\u30a1":"fa","\u30d5\u30a3":"fi","\u30d5\u30a7":"fe","\u30d5\u30a9":"fo","\u30a6\u30a3":"wi","\u30a6\u30a7":"we","\u30a6\u30a9":"wo","\u30f4\u30a1":"va","\u30f4\u30a3":"vi","\u30f4\u30a7":"ve","\u30f4\u30a9":"vo","\u30b8\u30a7":"je","\u30c6\u30a3":"ti","\u30c7\u30a3":"di","\u30c7\u30e5":"du","\u30c8\u30a5":"tu","\u30ab":"ka","\u30b5":"sa","\u30bf":"ta","\u30ca":"na","\u30cf":"ha","\u30de":"ma","\u30e9":"ra","\u30ad":"ki","\u30cb":"ni","\u30d2":"hi","\u30df":"mi","\u30ea":"ri","\u30af":"ku","\u30b9":"su","\u30cc":"nu","\u30d5":"fu","\u30e0":"mu","\u30eb":"ru","\u30b1":"ke","\u30bb":"se","\u30c6":"te","\u30cd":"ne","\u30d8":"he","\u30e1":"me","\u30ec":"re","\u30b3":"ko","\u30bd":"so","\u30c8":"to","\u30ce":"no","\u30db":"ho","\u30e2":"mo","\u30ed":"ro","\u30ef":"wa","\u30f2":"wo","\u30ac":"ga","\u30b6":"za","\u30c0":"da","\u30d0":"ba","\u30d1":"pa","\u30ae":"gi","\u30b8":"ji","\u30c2":"ji","\u30d3":"bi","\u30d4":"pi","\u30b0":"gu","\u30ba":"zu","\u30c5":"zu","\u30d6":"bu","\u30d7":"pu","\u30b2":"ge","\u305c":"ze","\u30c7":"de","\u30d9":"be","\u30da":"pe","\u30b4":"go","\u30be":"zo","\u30c9":"do","\u30dc":"bo","\u30dd":"po","\u30e3":"ya","\u30e4":"ya","\u30e5":"yu","\u30e6":"yu","\u30e7":"yo","\u30e8":"yo","\u30f3":"n","\u30a2":"a","\u30a4":"i","\u30a6":"u","\u30a8":"e","\u30aa":"o","\u30f1":"we","\u30f9":"ve"}},o={a:"\u0101",e:"\u0113",i:"\u012b",o:"\u014d",u:"\u016b"},c=i(s.hiragana),l=i(s.katakana),d=i(o);e.noConflict=function(){return a.romaji=r,this},e.toHiragana=function(e){var t=e.toLowerCase();for(var a in t=t.replace(/((?![aeiou])[a-z])\1{1}/g,"\u3063$1"),c)t=n(a,c[a],t);return t},e.toKatakana=function(e){var t=e.toLowerCase();for(var a in t=t.replace(/([\u0101\u0113\u012b\u014d\u016b])/g,(function(e,t){return d[t]+"\u30fc"})),l)t=n(a,l[a],t);return t},e.fromKana=function(e){var t=e;for(var a in s)for(var r in s[a])t=n(r,s[a][r],t);return t=(t=t.replace(/([aeiou])\u30fc/g,(function(e,t){return o[t]}))).replace(/(\u30c3|\u3063)([a-z])/g,"$2$2")},e.convert=function(t){return console.warn("WARNING: romaji.convert() is deprecated, please use romjia.fromKana()"),e.fromKana(t)}}).call(this)},457:function(e,t){e.exports=[{type:"header-stroke",stroke:1},[1,"\u4e00",1,"one","\u3044\u3061","\u4e00",42],[2,"\u4e28",1,"line, stick","\u307c\u3046","\u68d2",21],[3,"\u4e36",1,"dot","\u3066\u3093","\u70b9",10],[4,"\u4e3f",1,"bend, slash, possessive particle *no*","\u306e","\u30ce",33],[5,"\u4e59,\u4e5a",1,"second, latter","\u304a\u3064","\u4e59",42],[6,"\u4e85",1,"hook, hooked stick","\u306f\u306d\u307c\u3046","\u64a5\u68d2",19],{type:"header-stroke",stroke:2},[7,"\u4e8c",2,"two","\u306b","\u30cb",29],[8,"\u4ea0",2,"pot lid","\u306a\u3079\u3076\u305f","\u934b\u84cb",38],[9,"\u4eba,\u2e85,\ud840\udda2",2,"human","\u3072\u3068","\u4eba",794],[10,"\u513f",2,"legs, human underneath","\u306b\u3093\u306b\u3087\u3046","\u4eba\u7e5e",52],[11,"\u5165,\ud840\udda2",2,"enter, insert","\u3044\u308b","\u5165",28],[12,"\u516b",2,"eight, eight-head","\u306f\u3061\u304c\u3057\u3089","\u516b\u982d",44],[13,"\u5182",2,"inverted box, window frame","\u307e\u304d\u304c\u307e\u3048","\u7267\u69cb",50],[14,"\u5196",2,"cover, *wa* crown","\u308f\u304b\u3093\u3080\u308a","\u30ef\u51a0",30],[15,"\u51ab",2,"ice, 2-stroke water","\u306b\u3059\u3044","\u4e8c\u6c34",115],[16,"\u51e0,\u2e87",2,"desk","\u3064\u304f\u3048","\u673a",38],[17,"\u51f5",2,"container, inbox","\u3046\u3051\u3070\u3053","\u53d7\u3051\u7bb1",23],[18,"\u5200,\u2e89,\u2e88",2,"sword","\u304b\u305f\u306a","\u5200",377],[19,"\u529b",2,"power, force","\u3061\u304b\u3089","\u529b",163],[20,"\u52f9",2,"embrace, wrap frame","\u3064\u3064\u307f\u304c\u307e\u3048","\u5305\u69cb",64],[21,"\u5315",2,"spoon *hi*","\u3055\u3058\u306e\u3072","\u5315\u306e\u30d2",19],[22,"\u531a",2,"box frame","\u306f\u3053\u304c\u307e\u3048","\u531a\u69cb",64],[23,"\u5338,\u4ea1",2,"dead, hiding frame","\u304b\u304f\u3057\u304c\u307e\u3048","\u96a0\u69cb",17],[24,"\u5341",2,"ten, complete","\u3058\u3085\u3046","\u5341",55],[25,"\u535c,\u2e8a",2,"divination, *to*","\u307c\u304f\u306e\u3068","\u535c\u306e\u30c8",45],[26,"\u5369,\u353e",2,"seal","\u3075\u3057\u3065\u304f\u308a","\u7bc0\u65c1",40],[27,"\u5382",2,"cliff","\u304c\u3093\u3060\u308c","\u96c1\u5782",129],[28,"\u53b6",2,"private, *mu*","\u3080","",40],[29,"\u53c8",2,"again, right hand","\u307e\u305f","",91],{type:"header-stroke",stroke:3},[30,"\u53e3",3,"mouth, opening","\u304f\u3061","",1146],[31,"\u56d7",3,"enclosure","\u304f\u306b\u304c\u307e\u3048","\u56fd\u69cb",118],[32,"\u571f",3,"earth","\u3064\u3061","",580],[33,"\u58eb",3,"scholar, bachelor","\u3055\u3080\u3089\u3044","\u4f8d",24],[34,"\u5902",3,"winter, go","\u3075\u3086\u304c\u3057\u3089","\u51ac\u982d",34],[35,"\u590a",3,"winter variant, go slowly","\u3059\u3044\u306b\u3087\u3046","\u590a\u7e5e",null],[36,"\u5915",3,"evening, sunset","\u3086\u3046\u3079","",34],[37,"\u5927",3,"big, very","\u3060\u3044","\u5927",132],[38,"\u5973",3,"woman, female","\u304a\u3093\u3042","",681],[39,"\u5b50",3,"child","\u3053","",83],[40,"\u5b80",3,"roof","\u3046\u304b\u3093\u3080\u308a","\u30a6\u51a0",246],[41,"\u5bf8",3,"sun (unit of measurement]","\u3059\u3093","",40],[42,"\u5c0f,\u2e8c,\u2e8d",3,"small, insignificant","\u3061\u3044\u3055\u3044","\u5c0f\u3055\u3044",41],[43,"\u5c22,\u5c24,\u5c23",3,"lame","\u307e\u3052\u3042\u3057","",66],[44,"\u5c38",3,"corpse","\u3057\u304b\u3070\u306d","\u5c4d",148],[45,"\u5c6e",3,"sprout","\u3066\u3064","",38],[46,"\u5c71",3,"mountain","\u3084\u307e","",636],[47,"\u5ddb,\u5ddd,\u5ddc",3,"river","\u304b\u308f","",29],[48,"\u5de5",3,"work","\u305f\u304f\u307f","",17],[49,"\u5df2,\u5df1,\u5df3",3,"oneself","\u304a\u306e\u308c","",20],[50,"\u5dfe",3,"cloth, turban, scarf","\u306f\u3070","",295],[51,"\u5e72",3,"dry","\u307b\u3057","",9],[52,"\u5e7a",3,"short thread","\u3044\u3068\u304c\u3057\u3089","",50],[53,"\u5e7f",3,"dotted cliff","\u307e\u3060\u308c","\u9ebb\u5782",15],[54,"\u5ef4",3,"long stride","\u3044\u3093\u306b\u3087\u3046","\u5ef6\u7e5e",9],[55,"\u5efe",3,"two hands, twenty","\u306b\u3058\u3085\u3046\u3042\u3057","\u4e8c\u5341\u811a",50],[56,"\u5f0b",3,"ceremony, shoot, arrow","\u3057\u304d\u304c\u307e\u3048","\u5f0f\u69cb",15],[57,"\u5f13",3,"bow","\u3086\u307f","\u5f0f\u69cb",165],[58,"\u5f50,\u5f51",3,"pig's snout","\u3051\u3044\u304c\u3057\u3089","\u5f51\u982d",25],[59,"\u5f61",3,"hair, bristle, stubble, beard","\u3055\u3093\u3065\u304f\u308a","\u4e09\u65c1",62],[60,"\u5f73",3,"step","\u304e\u3087\u3046\u306b\u3093\u3079\u3093","\u884c\u4eba\u504f",215],{type:"header-stroke",stroke:4},[61,"\u5fc3,\u5fc4,\u2e97",4,"heart","\u308a\u3063\u3057\u3093\u3079\u3093","\u7acb\u5fc3\u504f",1115],[62,"\u6208",4,"spear, halberd","\u304b\u306e\u307b\u3053","",116],[63,"\u6236,\u6238,\u6237",4,"door, house","\u3068\u3073\u3089\u306e\u3068","",44],[64,"\u624b,\u624c,\u9fb5",4,"hand","\u3066","",1203],[65,"\u652f",4,"branch","\u3057\u306b\u3087\u3046","\u652f\u7e5e",26],[66,"\u6535,\u6534",4,"strike, whip","\u306e\u3076\u3093","\u30ce\u6587",296],[67,"\u6587",4,"script, literature","\u3076\u3093","",26],[68,"\u6597",4,"dipper, measuring scoop","\u3068\u307e\u3059","",32],[69,"\u65a4",4,"axe","\u304a\u306e","\u65a7",55],[70,"\u65b9",4,"way, square, raft","\u307b\u3046","",92],[71,"\u65e0,\u65e1",4,"have not","\u3080\u306b\u3087\u3046","",12],[72,"\u65e5",4,"sun, day","\u306b\u3061","",453],[73,"\u66f0",4,"say","\u3044\u308f\u304f","",37],[74,"\u6708,\u2e9d",4,"moon, month, body, flesh","\u3064\u304d","",69],[75,"\u6728",4,"tree","\u304d","",1369],[76,"\u6b20",4,"yawn, lack","\u3042\u304f\u3073","",235],[77,"\u6b62",4,"stop","\u3068\u3081\u308b","",99],[78,"\u6b79,\u6b7a",4,"death, decay","\u304c\u3064\u3078\u3093","\u6b79\u504f",231],[79,"\u6bb3",4,"weapon, lance","\u307b\u3053\u3064\u304f\u308a","",93],[80,"\u6bcb,\u6bcd,\u2e9f",4,"do not; mother","\u306a\u304b\u308c; \u306f\u306f","",93],[81,"\u6bd4",4,"compare, compete","\u304f\u3089\u3079\u308b","",21],[82,"\u6bdb",4,"fur, hair","\u3051","",211],[83,"\u6c0f",4,"clan","\u3046\u3058","",10],[84,"\u6c14",4,"steam, breath","\u304d\u304c\u307e\u3048","\u6c17\u69cb",17],[85,"\u6c34,\u6c35,\u6c3a",4,"water","\u307f\u305a","",1595],[86,"\u706b,\u706c",4,"fire","\u3072","",639],[87,"\u722a,\u722b,\u2ea5,\u2ea4",4,"claw, nail, talon","\u3064\u3081","",36],[88,"\u7236",4,"father","\u3061\u3061","",10],[89,"\u723b",4,"mix, twine, cross","\u3053\u3046","",16],[90,"\u723f,\u4e2c",4,"split wood","\u3057\u3087\u3046\u3078\u3093","\u723f\u504f",48],[91,"\u7247",4,"(a] slice","\u304b\u305f","",77],[92,"\u7259",5,"fang","\u304d\u3070\u3078\u3093","\u7259\u7de8",9],[93,"\u725b,\u725c,\u2ea7",4,"cow","\u3046\u3057","",233],[94,"\u72ac,\u72ad",4,"dog","\u3044\u306c","",444],{type:"header-stroke",stroke:5},[95,"\u7384",5,"dark, profound","\u3052\u3093","",6],[96,"\u7389,\u738b,\u738a,\u2ea9",4,"king; ball, jade","\u304a; \u305f\u307e","",473],[97,"\u74dc",6,"melon","\u3046\u308a","",55],[98,"\u74e6",5,"tile","\u304b\u308f\u3089","",174],[99,"\u7518",5,"sweet","\u3042\u307e\u3044","",22],[100,"\u751f",5,"life, be born","\u3046\u307e\u308c\u308b","",22],[101,"\u7528,\u7529",5,"use; (throw]","\u3082\u3061\u3044\u308b","\u7528\u3044\u308b",10],[102,"\u7530",5,"field","\u305f","",192],[103,"\u758b,\u2eaa",5,"bolt of cloth","\u3072\u304d","",15],[104,"\u7592",5,"sickness","\u3084\u307e\u3044\u3060\u308c","\u75c5\u5782",526],[105,"\u7676",5,"footsteps","\u306f\u3064\u304c\u3057\u3089","\u767a\u982d",15],[106,"\u767d",5,"white","\u3057\u308d","",109],[107,"\u76ae",5,"skin","\u3051\u304c\u308f","\u6bdb\u76ae",94],[108,"\u76bf",5,"dish","\u3055\u3089","",129],[109,"\u76ee",5,"eye","\u3081","",647],[110,"\u77db",5,"spear, pike","\u3080\u306e\u307b\u3053","",65],[111,"\u77e2",5,"arrow","\u3084","",64],[112,"\u77f3",5,"stone","\u3044\u3057","",499],[113,"\u793a,\u793b",5,"altar, display","\u3057\u3081\u3059","",213],[114,"\u79b8",5,"track","\u3050\u3046\u306e\u3042\u3057","",12],[115,"\u79be",5,"two-branch tree","\u306e\u304e","\u30ce\u6728",431],[116,"\u7a74",5,"cave","\u3042\u306a","",298],[117,"\u7acb",5,"stand, erect","\u305f\u3064","",101],{type:"header-stroke",stroke:6},[118,"\u7af9,\u2eae",6,"bamboo","\u305f\u3051","",953],[119,"\u7c73",6,"rice","\u3053\u3081","",318],[120,"\u7cf8,\u7cf9",6,"thread, string","\u3044\u3068","",823],[121,"\u7f36",6,"can, earthenware jar","\u304b\u3093","",77],[122,"\u7f52,\u7f51,\u7f53,\u2eb2,\u2eb3",5,"net","\u3042\u307f\u304c\u3057\u3089","\u7db2\u982d",163],[123,"\u7f8a,\u2eb6,\u2eb7",6,"sheep","\u3072\u3064\u3058","",156],[124,"\u7fbd",6,"feather, wing","\u306f\u306d","",220],[125,"\u8001,\u8002,\u2eb9",4,"old","\u308d\u3046","",22],[126,"\u800c",6,"rake, beard","\u3057\u304b\u3057\u3066","",22],[127,"\u8012",6,"plow","\u3089\u3044\u3059\u304d","",84],[128,"\u8033",6,"ear","\u307f\u307f","",172],[129,"\u807f,\u2ebb",6,"brush","\u3075\u3067\u3065\u304f\u308a","\u807f\u65c1",19],[130,"\u8089,\u2ebc,\u6708",6,"meat","\u3075\u3067\u3065\u304f\u308a","",674],[131,"\u81e3",7,"minister, official","\u3057\u3093","",16],[132,"\u81ea",6,"oneself","\u307f\u305a\u304b\u3089","",34],[133,"\u81f3",6,"arrive","\u3044\u305f\u308b","",24],[134,"\u81fc",6,"mortar","\u3046\u3059","",71],[135,"\u820c",6,"tongue","\u3057\u305f","",31],[136,"\u821b",7,"opposite","\u307e\u3059","",10],[137,"\u821f",6,"boat","\u3075\u306d","",197],[138,"\u826e",6,"stopping","\u3046\u3057\u3068\u3089","\u4e11\u5bc5",5],[139,"\u8272",6,"color, prettiness","\u3044\u308d","",21],[140,"\u8279,\u8278,\u4491",3,"grass, vegitation","\u304f\u3055","\u8349",1902],[141,"\u864d",6,"tiger stripes","\u3068\u3089\u304b\u3093\u3080\u308a","\u864e\u51a0",114],[142,"\u866b",6,"insect","\u3080\u3057","\u864e\u51a0",1067],[143,"\u8840",6,"blood","\u3061","",60],[144,"\u884c",6,"go, do","\u304e\u3087\u3046","",53],[145,"\u8863,\u8864",6,"clothes","\u3053\u308d\u3082","",607],[146,"\u897f,\u897e,\u8980",6,"west","\u306b\u3057","",29],{type:"header-stroke",stroke:7},[147,"\u898b",7,"see","\u307f\u308b","",161],[148,"\u89d2",7,"horn","\u3064\u306e","",158],[149,"\u8a00,\u8a01",7,"speech","\u3053\u3068","",861],[150,"\u8c37",7,"valley","\u305f\u306b","",54],[151,"\u8c46",7,"bean","\u307e\u3081","",68],[152,"\u8c55",7,"pig","\u3044\u306e\u3053","\u732a\u5b50",148],[153,"\u8c78",7,"cat, badger","\u3080\u3058\u306a","\u72e2",140],[154,"\u8c9d",7,"shell","\u304b\u3044","",277],[155,"\u8d64",7,"red, bare","\u3042\u304b","",31],[156,"\u8d70,\u8d71",7,"run","\u306f\u3057\u308b","",285],[157,"\u8db3,\u2eca",7,"foot","\u3042\u3057","",580],[158,"\u8eab",7,"body","\u307f","",97],[159,"\u8eca",7,"cart, car","\u304f\u308b\u307e","",361],[160,"\u8f9b",7,"spicy, bitter","\u304b\u3089\u3044","",36],[161,"\u8fb0",7,"morning","\u3057\u3093\u306e\u305f\u3064","\u8fb0\u306e\u305f\u3064",15],[162,"\u2ecc,\u8fb5,\u8fb6",3,"walk","\u3057\u3093\u306b\u3087\u3046","\u4e4b\u7e5e",381],[163,"\u9091,\u2ecf,\u961d",3,"walk (\u961d right]","\u3080\u3089","",350],[164,"\u9149",7,"sake (rice-based alcoholic beverage]","\u3068\u308a","",290],[165,"\u91c6",7,"divide, distinguish, choose","\u306e\u3054\u3081","\u30ce\u7c73",14],[166,"\u91cc",7,"village, mile","\u3055\u3068","",14],{type:"header-stroke",stroke:8},[167,"\u91d1,\u91d2",8,"metal, gold","\u304b\u306d","",806],[168,"\u9577,\u9578",8,"long, grow; leader","\u306a\u304c\u3044; \u3061\u3085\u3046","",55],[169,"\u9580",8,"gate","\u3082\u3093","",246],[170,"\u961c,\u2ed6,\u961d",3,"mound, dam (\u961dleft]","\u304e\u3075\u306e\u3075","\u5c90\u961c\u306e\u961c",348],[171,"\u96b6",8,"slave, capture","\u308c\u3044\u3065\u304f\u308a","\u96b7\u65c1",12],[172,"\u96b9",8,"old bird","\u3075\u308b\u3068\u308a","\u53e4\u9ce5",233],[173,"\u96e8,\u2ed7",8,"rain","\u3042\u3081","",298],[174,"\u9752,\u9751",8,"green, blue","\u3042\u304a","",17],[175,"\u975e",8,"wrong","\u3042\u3089\u305a","",25],{type:"header-stroke",stroke:9},[176,"\u9762,\u9763",9,"face","\u3081\u3093","",66],[177,"\u9769",9,"leather, rawhide","\u304b\u304f\u306e\u304b\u308f","",305],[178,"\u97cb",10,"tanned leather","\u306a\u3081\u3057\u304c\u308f","",100],[179,"\u97ed",9,"leek","\u306b\u3089","",20],[180,"\u97f3",9,"sound","\u304a\u3068","",43],[181,"\u9801",9,"big shell","\u304a\u304a\u304c\u3044","\u5927\u8c9d",372],[182,"\u98a8,\ud841\ude28",9,"wind","\u304b\u305c","",182],[183,"\u98db",9,"fly","\u3068\u3076","",92],[184,"\u98df,\u98e0,\ud865\ude7f",9,"eat, food","\u3057\u3087\u304f","",403],[185,"\u9996",9,"neck, head","\u304f\u3073","",20],[186,"\u9999",9,"fragrant","\u306b\u304a\u3044\u3053\u3046","",37],{type:"header-stroke",stroke:10},[187,"\u99ac",10,"horse","\u3046\u307e","",427],[188,"\u9aa8",10,"bone","\u307b\u306d","",185],[189,"\u9ad8,\u9ad9",10,"tall, high","\u305f\u304b\u3044","",34],[190,"\u9adf",10,"hair","\u304b\u307f\u304c\u3057\u3089","\u9aea\u982d",243],[191,"\u9b25",10,"fight","\u3068\u3046\u304c\u307e\u3048","\u95d8\u69cb",23],[192,"\u9b2f",10,"herbs, sacrificial wine","\u3061\u3087\u3046","",8],[193,"\u9b32",10,"tripod, cauldron","\u304b\u306a\u3048","",73],[194,"\u9b3c",10,"ghost, demon","\u304a\u306b","",141],{type:"header-stroke",stroke:11},[195,"\u9b5a",11,"fish","\u3046\u304a","",571],[196,"\u9ce5",11,"bird","\u3068\u308a","",750],[197,"\u9e75",11,"salt","\u308d","",44],[198,"\u9e7f",11,"deer","\u3057\u304b","",104],[199,"\u9ea6,\u9ea5",7,"wheat","\u3080\u304e","\u9ea6",131],[200,"\u9ebb",11,"hemp, flax","\u3042\u3055","",34],{type:"header-stroke",stroke:12},[201,"\u9ec4,\u9ec3",11,"yellow","\u304d\u3044\u308d","\u9ec4\u8272",34],[202,"\u9ecd",12,"millet","\u304d\u3044\u308d","\u304d\u3073",46],[203,"\u9ed2,\u9ed1",11,"black","\u304f\u308d","",172],[204,"\u9ef9",12,"embroidery, needlework","\u3075\u3064","\u9efb",8],{type:"header-stroke",stroke:13},[205,"\u9efd",13,"frog, amphibian","\u3079\u3093","",40],[206,"\u9f0e",13,"sacrificial tripod","\u304b\u306a\u3048","",14],[207,"\u9f13",13,"drum","\u3064\u3065\u307f","",46],[208,"\u9f20",13,"rat, mouse","\u306d\u305a\u307f","",92],{type:"header-stroke",stroke:14},[209,"\u9f3b",14,"nose","\u306f\u306a","",49],[210,"\u9f4a",14,"even, uniformly","\u305b\u3044","\u6589",18],{type:"header-stroke",stroke:15},[211,"\u6b6f,\u9f52",12,"tooth, molar","\u306f","",162],{type:"header-stroke",stroke:16},[212,"\u7adc,\u9f8d",10,"dragon","\u308a\u3085\u3046","",14],[213,"\u4e80,\u9f9c",11,"turtle, tortoise","\u304b\u3081","",24],{type:"header-stroke",stroke:17},[214,"\u9fa0",17,"flute","\u3084\u304f","",19]]},458:function(e,t,a){},474:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return O}));var r=a(9),i=a(17),n=a(57),s=a(0),o=a(456),c=a.n(o),l=a(46),d=a(7),h=a(457),u=a.n(h),b=a(115),j=a.n(b),m=(a(458),a(1)),p=j.a.map((function(e){return{number:e[0],kanji:e[1],radical:e[2],strokes:e[3],meaning:e[4],reading:e[5]}})),f=u.a.map((function(e){return Array.isArray(e)?k.apply(void 0,Object(n.a)(e)):e}));function k(e,t,a,r,i,n,s,o){var c=t.split(",");return{type:"radical",chr:c[0],chrs:c,chrText:t,strokeCount:a,meaning:r,reading:i,kanji:n,frequency:s,number:e,isPart:o||!1}}function g(e){for(var t=e.array,a=e.ElmComponent,r=e.className,i=e.breakOn,n=[],s=[],o=0;o<t.length;o++)s.length&&i&&i(t[o])&&(n.push(Object(m.jsx)("div",{className:"array-table",children:s},t[o].stroke)),s=[]),s.push(Object(m.jsx)(a,{elm:t[o]},o));return n.length?(s.length&&n.push(Object(m.jsx)("div",{className:"array-table",children:s},-23)),Object(m.jsx)("div",{className:r,children:n})):Object(m.jsx)("div",{className:"array-table list "+r,children:s})}function y(e,t,a,r,i,n){var s,o=!0,c=t;if("list"===i&&0!==r){var l=e;for(o=!1;l>=0&&"header-stroke"!==f[--l].type;);for(var d=l+r;d>=0&&d<f.length;){if("header-stroke"===f[d].type){s=d+Math.abs(l-e);break}d+=r}}else if(0!==r&&(r<0&&e<t+2*!n||r>0&&e>=f.length-t-6*!n)){var h=f.length%t;c+=f.length%t,e<h+2*!n&&(c-=t),e>=f.length-h-6*!n&&(c-=t)}else if(!n&&0!==r){for(var u=e+a;u!==e+a+r*c;u+=r)"header-stroke"===f[u].type&&c++;for(s=(e+a+r*c+f.length)%f.length,o=!1;"header-stroke"===f[s].type;)s+=r}return o&&(s=(e+a+r*c+f.length)%f.length),"header-stroke"===f[s].type?y(s,t,a,r,i,n):s}function v(e){var t=e.setResults,a=e.setSelectedRad,r=Object(s.useState)(""),n=Object(i.a)(r,2),o=n[0],l=n[1];return Object(m.jsxs)("div",{className:"search-radicals"+(o.length>0?" has-text":""),children:[Object(m.jsx)("input",{type:"text",placeholder:"Search Radicals...",value:o,onChange:function(e){var r=e.target.value;if(l(r),r.length<1)return a(null),void t([]);var i=f.filter((function(e){return"radical"===e.type&&(e.meaning.includes(r)||e.chrText.includes(r)||e.reading.includes(r)||e.reading.includes(c.a.toHiragana(r))||e.kanji.includes(r)||"".concat(e.number)===r)}));t(i),a(i[0])}}),o.length>0&&Object(m.jsx)("div",{onClick:function(){l(""),t([])},className:"cancel-text",children:"\xd7"})]})}function w(e){var t=p.filter((function(t){return e.chrs.includes(t.radical)}))||null;if(e.kanjis&&e.kanjis.length>1){for(var a=[e.kanjis[0]],r=1;r<e.kanjis.length;r++){for(var i=e.kanjis[r],n=!1,s=0;s<a.length;s++)if(i.strokes<a[s].strokes||i.strokes===a[s].strokes&&i.number<a[s].number){a.splice(s,0,i),n=!0;break}n||a.push(i)}t=a}return t}function O(){var e=Object(s.useState)(function(e){if(null===e)return null;var t=f.find((function(t){return t.number===+e[1]}));return t.kanjis=w(t),t}(window.location.href.match(/#(\d+)/))),t=Object(i.a)(e,2),a=t[0],n=t[1],o=Object(s.useState)(0),c=Object(i.a)(o,2),d=c[0],h=c[1],u=Object(s.useState)("grid"),b=Object(i.a)(u,2),j=b[0],p=b[1],k=Object(s.useState)(16),O=Object(i.a)(k,2),R=O[0],K=O[1],z=Object(s.useState)(!1),T=Object(i.a)(z,2),E=T[0],H=T[1],_=Object(s.useState)(!0),W=Object(i.a)(_,2),q=W[0],L=W[1],A=Object(s.useState)([]),I=Object(i.a)(A,2),D=I[0],M=I[1],J=Object(s.useState)(null),P=Object(i.a)(J,2),U=P[0],$=P[1],B=function(e){e&&"radical"===e.type&&(e.kanjis=w(e)),n(e),document.location=e&&e.number?"#".concat(e.number):"#"};return Object(s.useEffect)((function(){var e=function(e){var t=e.key.toUpperCase(),r=("D"===t)-("A"===t),i=("S"===t)-("W"===t);if(e.key.startsWith("Arrow")){var n=e.key[5];r=("R"===n)-("L"===n),i=("D"===n)-("U"===n)}var s=y(f.findIndex((function(e){return e===a})),R,r,i,j,q);B(f[s])};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}})),Object(s.useEffect)((function(){var e=function(){var e=document.querySelector("#radicalpage .radical-table"),t=document.querySelector("#radicalpage .array-table > div");K(Math.floor(e.offsetWidth/(t.offsetWidth-2)))};return e(),setTimeout(e,10),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}})),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(l.default,{}),Object(m.jsxs)("div",{id:"radicalpage",className:U?"blur":"",children:[Object(m.jsxs)("div",{className:"header",style:{width:44*R},children:[Object(m.jsx)("div",{className:"title",children:" Kangxi Radicals "}),Object(m.jsxs)("div",{className:"controls",children:[Object(m.jsx)("div",{className:"help",onClick:function(){return $(Object(m.jsx)(N,{dismount:function(){return $(null)}}))},children:"help"}),Object(m.jsx)(v,{setSelectedRad:B,setResults:M}),Object(m.jsx)("i",{onClick:function(){return L(!q)},title:"Toggle stroke-count headers",className:"fas stroke-header",children:"S"}),"grid"===j?Object(m.jsx)("i",{onClick:function(){return p("list")},title:"View as list",className:"fas fa-list-ul"}):Object(m.jsx)("i",{onClick:function(){return p("grid")},title:"View as grid",className:"fas fa-grid",children:"\u7530"}),Object(m.jsx)("i",{onClick:function(){return H(!E)},title:"Separate lines",className:"fas fa-grip-lines"+("list"!==j?" disabled":"")})]})]}),Object(m.jsx)(g,{className:"radical-table"+(E?" separate-arrays":"")+(q?" stroke-headers":""),array:f,width:R,breakOn:"list"===j?function(e){return"header-stroke"===e.type}:null,ElmComponent:function(e){return Object(m.jsx)(C,Object(r.a)({},e,{selectedRad:a,onClick:"header-stroke"===e.elm.type&&a===e.elm?function(){return B(null)}:function(){return B(e.elm)},highlightStroke:a&&a.stroke||d,setHighlightStroke:h,searchHiglight:D.find((function(t){return t===e.elm}))&&!0}))}}),a&&"radical"===a.type&&Object(m.jsx)(S,{rad:a})]}),U&&Object(m.jsx)(x,{dismount:function(){return $(null)},comp:U})]})}function x(e){return Object(m.jsx)("div",{className:"focus",onClick:function(t){document.querySelector(".focus .content").contains(t.target)||e.dismount()},children:e.comp})}function N(e){return Object(m.jsxs)("div",{className:"help-menu content",children:[Object(m.jsxs)("div",{className:"inner",children:[Object(m.jsx)("div",{className:"title",children:"Help"}),Object(m.jsx)("h2",{children:" What are Kangxi Radicals? "}),Object(m.jsxs)("p",{children:[Object(m.jsx)(d.a,{to:"https://en.wikipedia.org/wiki/Radical_(Chinese_characters)",children:"Radicals"})," [\u90e8\u9996 (\u3076\u3057\u3085)] are symbols that represent objects and ideas, and can be combined to create ",Object(m.jsx)(d.a,{to:"https://en.wikipedia.org/wiki/Kanji",children:"Kanji"})," (Chinese characters). Japanese Kanji is based on the ",Object(m.jsx)(d.a,{to:"https://en.wikipedia.org/wiki/Kangxi_Dictionary",children:"Kangxi Dictionary"}),', which has a total of 213 radicals. Some radicals are also Kanji on their own, but most Kanji (over 90%) are classified as "',Object(m.jsx)(d.a,{to:"https://en.wikipedia.org/wiki/Chinese_character_classification#Phono-semantic_compound_characters",children:"phono-semantic compound characters"}),'". These characters consist of a ',Object(m.jsx)("i",{children:"rebus"})," (phonetic part; approximate pronunciation) and a ",Object(m.jsx)("i",{children:"determinative"})," (meaning). In most cases, the determinative is also the radical of a kanji. The determinative is typically either the left [\u504f (\u3078\u3093)], upper [\u51a0 (\u304b\u3093\u3080\u308a)] or surrounding [\u69cb\u3048 (\u304b\u307e\u3048)] part of a kanji."]}),Object(m.jsx)("h2",{children:" How to use this tool "}),Object(m.jsxs)("p",{children:["This tool was designed to help look up radicals (and possibly search kanji by radical; not implemented yet). Above the Radical table, is a searchbar. This can be used to highlight radicals by reading (Hiragana), meaning (English) or number. If you wish to find a radical by its stroke count (as is more common), look for the numbered cells, and hover over one to highlight all Radicals that many strokes. The radicals are ordered (left to right, top to bottom) by the official radical numbers, which are in turn ",Object(m.jsx)("i",{children:"mostly"})," ordered by stroke count (some characters have been simplified/changed since the original Kangxi dictionary)."]}),Object(m.jsxs)("p",{children:["When you click on a radical in the grid, more details about that radical appear on the right. There you'll see the possible alternations of the radical in the top left, the radical number in a darker gray in the top left of the square, and the meaning(s) of the radical to the right. The radical itself is displayed in illustrious green right in the center of the square. Below the square is the radical's reading in ",Object(m.jsx)(d.a,{to:"https://en.wikipedia.org/wiki/Hiragana",children:"hiragana"}),'. Below that again, are some links for more information related to that radical. The "Wiki" link directs to the radical number\'s page, the "\u53b6" page (where "\u53b6" is whatever radical you clicked on) directs to *wiktionary* for that character, and the "index" page directs to a wikipedia page that lists all Kanjis using that Radical, ordered by stroke count.']})]}),Object(m.jsx)("div",{onClick:function(){return e.dismount()},className:"close"})]})}function C(e){var t=e.elm,a=e.onClick,r=e.selectedRad,i=e.highlightStroke,n=e.setHighlightStroke,s=e.searchHiglight;return Object(m.jsxs)("div",{onClick:a,className:(r&&t===r?"selected":"")+" type-"+t.type+(t.strokeCount===i?" hl-stroke":"")+(s?" hl-search":""),onMouseEnter:"header-stroke"===t.type&&i!==t.stroke?function(e){return n(t.stroke)}:null,onMouseLeave:"header-stroke"===t.type?function(e){return n(0)}:null,children:[Object(m.jsx)("div",{className:"chr",children:t.chr||t.stroke}),Object(m.jsx)("div",{className:"num",children:t.number})]})}function S(e){var t=e.rad,a=Object(s.useState)(null),r=Object(i.a)(a,2),n=r[0],o=r[1];return Object(m.jsx)("div",{className:"selected-rad",children:Object(m.jsxs)("div",{className:"foc",children:[Object(m.jsx)("div",{className:"chr",children:Object(m.jsx)(d.a,{to:"https://en.wiktionary.org/wiki/Index:Chinese_radical/".concat(t.chr),children:t.chr})}),Object(m.jsx)("div",{className:"reading",children:t.kanji?"".concat(t.kanji," (").concat(t.reading,")"):t.reading}),Object(m.jsx)("div",{className:"meaning",children:Object(m.jsx)("ul",{children:t.meaning.split(/,\s+/g).map((function(e){return Object(m.jsx)("li",{children:e[0].toUpperCase()+e.slice(1)},e)}))})}),Object(m.jsx)("div",{className:"chrs",children:t.chrs}),Object(m.jsx)("div",{className:"num",children:t.number}),Object(m.jsx)("div",{className:"strokes",children:t.strokeCount}),Object(m.jsxs)("div",{className:"wikipedia",children:[Object(m.jsx)(d.a,{to:"https://en.wikipedia.org/wiki/Radical_".concat(t.number),children:"Wiki"}),"\xa0\u2022\xa0",Object(m.jsx)(d.a,{to:"https://en.wiktionary.org/wiki/".concat(t.chr),children:t.chr}),"\xa0\u2022\xa0",Object(m.jsx)(d.a,{to:"https://en.wiktionary.org/wiki/Index:Chinese_radical/".concat(t.chr),children:"index"})]}),Object(m.jsx)("div",{className:"wikipedia",children:Object(m.jsxs)("div",{className:"kanji-results",children:[t.kanjis&&t.kanjis.length&&t.kanjis.map((function(e){return Object(m.jsx)("div",{className:"kanji",onClick:function(){return o(e)},children:e.kanji},e.number)})),n&&Object(m.jsxs)("div",{className:"selected-kanji",children:[Object(m.jsx)("div",{className:"chr",children:n.kanji}),Object(m.jsx)("div",{className:"number",children:n.number}),Object(m.jsx)("div",{className:"strokes",children:n.strokes}),Object(m.jsx)("div",{className:"meaning",children:n.meaning}),Object(m.jsx)("div",{className:"reading",children:n.reading})]})]})})]})})}}}]);
//# sourceMappingURL=16.ccb3f858.chunk.js.map