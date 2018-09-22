
const fs = require('fs');

const template = fs.readFileSync('../templates/article.html').toString();
const json = parsetart(fs.readFileSync('../json/digitocracy.tart'));
const scoredTitle = json.title.trim().toLowerCase().replace(/\s+/g, '_');

let text = template.replace('<title></title>', `<title>${json.title}</title>`)
    .replace('<div class="title"></div>', `<div class="title">${json.title}</div>`)
    .replace('<div class="description"></div>', `<div class="description">${json.description}</div>`)
    .replace('<div class="illustration"></div>', json.image ? `<div class="illustration"><img src="${json.image}"></div>` : '')
    .replace('<div id="pagecontent"></div>', `<div id="pagecontent">${json.content}</div>`);

let sliced = '';
let header = '';

while (true) {
    let match = text.match(/<\s*headline\b([^>]*)>([^<]+)<\s*\/\s*headline\s*>/i);

    if (!match) {
        sliced += text;
        break;
    }

    sliced += text.slice(0, match.index);
    text = text.slice(match.index + match[0].length);

    let id = match[2].trim().toLowerCase().replace(/\s+/g, '_').match(/\w+/g).join('');
    let elmtype = match[1] && match[1].trim() || 'span';

    sliced += `<${elmtype} class="headline" id="${id}">${match[2]}</${elmtype}>`;
    header += `<li value="${id}">${match[2]}</li>`;
}

sliced = sliced.replace(/<(div\b[^>]*?\bid="header"[^>]*)><\/div>/i, `<$1><ul>${header}</ul></div>`);

fs.writeFile(`./${scoredTitle}.html`, sliced, (err) => { console.log(err ? err : 'success writing html document') });
fs.readFile('./generated.json', (err, file) => {
    if (err) return console.log(err);

    let genson = JSON.parse(file);
    let match = genson.articles.findIndex(art => art.filename === scoredTitle);

    let obj = {
        title: json.title,
        filename: scoredTitle,
        description: json.description,
        image: json.image
    };

    if (!!~match) {
        genson.articles[match] = obj;
    } else genson.articles.push(obj);

    fs.writeFile(`./generated.json`, JSON.stringify(genson), (err) => { console.log(err ? err : 'success updating generated.json') });
});
function parsetart(tart) {
    if (typeof tart !== 'string') tart = tart.toString();

    let fields = tart.match(/[a-z]\w*\s*[=:]\s*"[\s\S]+?(?<!\\)"/gi);
    let out = {};

    for (let field of fields) {
        let match = field.match(/([a-z]\w*)\s*[=:]\s*"([\s\S]+?)(?<!\\)"/i);
        out[match[1]] = match[2];
    }

    return out;
}
