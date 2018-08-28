
//*/
const url = 'https://us-central1-artful-willow-198817.cloudfunctions.net/obj_podcast_rss_to_json' /*/
const url = 'http://127.0.0.1:6029';
//*/

let req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open('GET', url, true);
req.onreadystatechange = function() {
    if (req.readyState !== 4 || req.status !== 200) return;

    let episodes = document.getElementById('episodes');
    let error = false;
    let res;

    try {
        res = JSON.parse(req.responseText);
    } catch(e) {
        error = true;
    }

    let loader = document.getElementById('loader-rss');
    loader.parentElement.removeChild(loader);

    if (error || !res.items || !res.items.length) {
        let div = document.createElement('div');
            div.setAttribute('class', 'ERROR');
            div.innerHTML = 'Failed to load RSS feed. Try again later, or contact a website administrator if the issue persists';
        return episodes.append(div);
    }

    let jsonList = [];
    for (let entry of res.items) {
        let div = document.createElement('div');
            div.setAttribute('id', entry.title.toLowerCase().match(/[\w\s]+/g).join('').replace(/\s+/g, '_'));
        let audio = document.createElement('audio');
            audio.src = entry.enclosure.url;

        jsonList.push(entry);
        div.append(audio);
        episodes.append(div);
    }
    audioplayerInit(jsonList);
};
req.send(null);
