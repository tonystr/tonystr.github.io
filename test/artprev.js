
// <div class="articleprev" id="">
let template = `<div class="info">
                    <div class="header">
                        <div class="title"></div>
                        <div class="date"></div>
                    </div>
                    <div class="description"></div>
                    <img class="artimg">
                </div>`;

loadContent();

function loadContent() {
    let req = new XMLHttpRequest();
    req.addEventListener('load', res => {
        let json = JSON.parse(res.target.response);
        for (let art of json.articles) {
            let inner = template.replace('<div class="title"></div>',       art.title)
                                .replace('<div class="date"></div>',        art.date)
                                .replace('<div class="description"></div>', art.description)
                                .replace('<img class="artimg">',            art.image ? `<img class="artimg" src="${art.image}">` : '');

            let div  = document.createElement('div');
                div.setAttribute('class', 'info');
                div.setAttribute('id', art.filename);
                div.innerHTML = inner;

            document.getElementById('articles').append(div);
        }
    });
    req.open('GET', window.location.href.replace(/\/\w*$/, '/generated/generated.json'));
    console.log(window.location.href.replace(/\/\w*$/, '/generated/generated.json'));
    req.send();
}
