
windowResizeEvents = [checkAboutResizeCapability];

window.onresize = function() {
    for (let eve of windowResizeEvents) {
        eve();
    }
}

function showless(thisElement) {
    let moreButton = thisElement.parentElement.parentElement.getElementsByClassName('show-more-btn')[0];
    let clas = moreButton.getAttribute('class');
    if (clas) moreButton.setAttribute('class', clas.replace(/\s*\bclicked\b/, ''));

    thisElement.parentElement.parentElement.parentElement.setAttribute('class', '');
    thisElement.parentElement.parentElement.parentElement.setAttribute('style', '');

    thisElement.parentElement.removeChild(thisElement);
}

function showmore(thisElement) {
    thisElement.setAttribute('class', thisElement.getAttribute('class').replace(/\s*\bclicked\b/, '') + ' clicked');
    thisElement.parentElement.parentElement.setAttribute('class', 'expand');
    windowResizeEvents.push(resizeAbout);
    resizeAbout();

    let shrink = document.createElement('div');
        shrink.setAttribute('class', 'center');
        shrink.innerHTML = `
            <div class="shrink" onclick="showless(this)">
                <i class="fas fa-angle-up"></i> &nbsp; Click to show less &nbsp; <i class="fas fa-angle-up"></i>
            </div>
        `;
    let about = thisElement.parentElement;
        about.append(shrink);
}

function checkAboutResizeCapability() {
    let about = document.getElementById('about');
    let clas = about.getAttribute('class');
    if (clas && clas.match(/\bexpand\b/)) return;
    let info = about.getElementsByClassName('info')[0];

    if (info.getElementsByClassName('content')[0].offsetHeight > about.offsetHeight) {
        if (info.getElementsByClassName('show-more-btn')[0]) return;
        let btn = document.createElement('div');
            btn.setAttribute('onclick', 'showmore(this)');
            btn.setAttribute('class', 'show-more-btn');
            btn.innerHTML = `
                <div class="fade-down"></div>
                <div class="fade-down"><div class="text">Read more</div></div>`;
        info.append(btn);
    } else {
        let btn = info.getElementsByClassName('show-more-btn');
        if (!btn[0]) return;
        btn[0].parentElement.removeChild(btn[0]);
    }
}

function resizeAbout() {
    let about = document.getElementById('about');
    let clas = about.getAttribute('class');
    if (clas && clas.match(/\bexpand\b/)) {
        let content = about.getElementsByClassName('content')[0];
        about.setAttribute('style', `height:${content.offsetHeight + 40}px`);
    }
}

function querysrctime() {
    let elms = document.getElementsByClassName('querysrctime');
    for (let i = 0; i < elms.length; i++) {
        let elm = elms[i];
        let src = elm.getAttribute('src');

        elm.setAttribute('src', `${window.location.href.match(/\?.*?\bwawwwli\b/i) ? src.replace('gif', 'png') : src}?${new Date()}`);
    }
}

function playAudio(thisElement) {
    let attrib = thisElement.getAttribute('class');
    let audio = thisElement.parentElement.parentElement.getElementsByTagName('audio')[0];

    if (attrib.indexOf('play') !== -1) { // play
        thisElement.setAttribute('class', attrib.replace('play', 'pause'));
        audio.play();

    } else { // pause
        thisElement.setAttribute('class', attrib.replace('pause', 'play'));
        audio.pause();
    }
}

function parseTime(time) {
    if (isNaN(time)) return `Loading`;
    if (time < 0) return `00:00`;
    let seconds = new String(Math.floor(time) % 60);
    if (seconds.length === 1) seconds = `0${seconds}`;
    let minutes = new String(Math.floor(time / 60) % 60);
    if (minutes.length === 1) minutes = `0${minutes}`;
    let hours = Math.floor(time / 3600);
    if (hours && hours.length === 1) hours = `0${hours}`;

    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

function copyText(text, evt) {
    let textArea = document.createElement('textarea');
        textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.parentElement.removeChild(textArea);
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    let div = document.createElement('div');
        div.setAttribute('class', 'cheese');
        div.setAttribute('style', `top:${Math.floor(evt.clientY + top + 16)}px;left:${Math.floor(evt.clientX)}px;`);
        div.innerHTML = `Copied link to clipboard`;
    document.body.append(div);
    loadunload(div, 60, 3000);
}

function loadunload(div, startTime, endTime) {
    let clas = div.getAttribute('class');
    if (clas.match(/\bload\b/)) {
        div.setAttribute('class', clas.replace(/\s*\bload\b\s*/, ' '));
        setTimeout(() => { div.parentElement.removeChild(div); }, endTime / 2);

    } else setTimeout(() => {
        div.setAttribute('class', clas + ' load');
        setTimeout(() => { loadunload(div, startTime, endTime); }, endTime);
    }, '', startTime);
}

function progressbarupdate(audioTag) {
    let progress = audioTag.parentElement.getElementsByTagName('progress')[0];
    if (!isNaN(audioTag.duration)) {
        audioTag.parentElement.getElementsByClassName('time current')[0].innerHTML = parseTime(audioTag.currentTime);
        progress.value = audioTag.currentTime / audioTag.duration;
        if (progress.value >= 1) {
            let thisElement = audioTag.parentElement.getElementsByClassName('play')[0].childNodes[0];
            let attrib = thisElement.getAttribute('class');
            let audio = thisElement.parentElement.parentElement.getElementsByTagName('audio')[0];
            thisElement.setAttribute('class', attrib.replace('pause', 'play'));
        }
    }

    progress.parentElement.addEventListener('click', timetravel);

    function timetravel(evt) {
        let percent = evt.offsetX / this.offsetWidth;
        progress.value = percent;
        audioTag.currentTime = percent * audioTag.duration;
    }
}

function scrubbermove(progress, ev) { // div
    let scrubber = progress.getElementsByClassName('scrubber')[0];
    let hoverbar = progress.getElementsByClassName('hoverbar')[0];
    let width = window.innerWidth;
    scrubber.style = `left:${width > 725 ? ev.pageX : ev.offsetX}px`;
    scrubber.childNodes[0].innerHTML = parseTime((((width > 725 ? ev.pageX : ev.offsetX) - progress.offsetLeft) / progress.offsetWidth) * progress.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('audio')[0].duration);
    hoverbar.style = `width:${width > 725 ? ev.pageX - progress.offsetLeft : ev.offsetX}px`;
}

function audioplayerInit(jsonList) {
    const dlpath = 'http://traffic.libsyn.com/forcedn/objpodcast/';
    let scrollTo = undefined;
    const loc = window.location;
    let audioTags = document.getElementsByTagName('audio');
    for (let i = 0; i < audioTags.length; i++) {
        let audioTag = audioTags[i];
        let json = jsonList[i++];
        let thisId = audioTag.parentElement.getAttribute('id');
        let podURL = `${loc.protocol}//${loc.hostname + loc.pathname}#${thisId}`;

        let link = audioTag.src;
        let filename = link.match(/[^\/]\/[\w-]+\.\w+/)[0].slice(2);
        audioTag.setAttribute('ontimeupdate', 'progressbarupdate(this)');

        audioTag.onloadstart = (ev) => {
            let playbtn = ev.target.parentElement.getElementsByClassName('play')[0].childNodes[0];
                playbtn.setAttribute('class', playbtn.getAttribute('class').replace('fa-play-circle', 'fa-cog fa-spin'));
        };

        audioTag.onloadeddata = (ev) => {
            let playbtn = ev.target.parentElement.getElementsByClassName('play')[0].childNodes[0];
                playbtn.setAttribute('class', playbtn.getAttribute('class').replace('fa-cog fa-spin', 'fa-play-circle'));
                playbtn.parentElement.getElementsByClassName('loading-txt')[0].style = 'opacity:0;';
        };

        let audioPlayerDiv = document.createElement('div');
            audioPlayerDiv.setAttribute('class', 'audioplayer');
        let buttonPlay = document.createElement('div');
            buttonPlay.setAttribute('class', 'play');
            buttonPlay.innerHTML = `<i class="far fa-play-circle" onClick="playAudio(this)"></i><p class="loading-txt">Loading</p>`;
        let content = document.createElement('div');
            content.setAttribute('class', 'content');
        let date = new Date(json.pubDate);
        date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        date.text = `${date.getUTCDate()}. ${date.months[date.getMonth()]} ${1900 + date.getYear()}`;
        let desc = document.createElement('div');
            desc.setAttribute('class', 'desc');
            desc.innerHTML = `<h2 class="title"><a target="_blank" href="${json.enclosure.url}">${json.title}</a><span class="date">${date.text}</span></h2>`;
        let descr = document.createElement('p');
            descr.setAttribute('class', 'description');
            descr.innerHTML = json.content;
        desc.append(descr);
        let titleURI = encodeURIComponent(`Listen to episode "${desc.getElementsByClassName('title')[0].innerHTML.match(/>.+?(?=<)/)[0].slice(1).trim()}" on `);
        let tools = document.createElement('div');
            tools.setAttribute('class', 'tools');
            tools.innerHTML =  `<span class="section-header">download</span>
                                <div class="download">
                                    <a download target="_blank" href="${dlpath + filename}">ogg  <i class="fas fa-download"></i></a>
                                    <a download target="_blank" href="${dlpath + filename.replace('ogg', 'mp3')}">mp3  <i class="fas fa-download"></i></a>
                                </div>
                                <span class="section-header">share</span>
                                <div class="share">
                                    <a target="_blank" href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fobjpodcast.com%2F&ref_src=twsrc%5Etfw&text=${titleURI}&tw_p=tweetbutton&url=${encodeURIComponent(podURL)}">Twitter <i class="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://www.facebook.com/sharer.php?t=${titleURI}&u=${encodeURIComponent(podURL)}">Facebook <i class="fab fa-facebook"></i></a>
                                    <span class="fake-link" href="${podURL}" onclick="copyText('${podURL}',event)">Copy link <i class="fas fa-link"></i></span>
                                </div>`;

        let currentTime = document.createElement('span');
            currentTime.setAttribute('class', 'time current');
            currentTime.innerHTML = '00:00'
        let duration = document.createElement('span');
            duration.setAttribute('class', 'time duration');
            duration.innerHTML = json.itunes.duration;
        let progressContent = document.createElement('div');
            progressContent.setAttribute('class', 'progress-content');
        let progressbar = document.createElement('progress');
            progressbar.setAttribute('value', 0);
            progressbar.setAttribute('max', 1);
        let progress = document.createElement('div');
            progress.setAttribute('class', 'progressbar');
            progress.setAttribute('onmousemove', 'scrubbermove(this, event)');
            progress.innerHTML = `<div class="hoverbar"></div><div class="scrubber"><div class="hovertime">01:26</div></div>`
            progress.append(progressbar);
        let aprog = document.createElement('div');
            aprog.setAttribute('class', 'aprog');
        let main = document.createElement('div');
            main.setAttribute('class', 'main');

        aprog.append(desc);
        aprog.append(tools);
        content.append(aprog);
        progressContent.append(currentTime);
        progressContent.append(progress);
        progressContent.append(duration);
        content.append(progressContent);
        main.append(content);
        audioPlayerDiv.append(buttonPlay);
        audioPlayerDiv.append(main);
        audioTag.parentElement.append(audioPlayerDiv);
        audioPlayerDiv.append(audioTag);
        progressbarupdate(audioTag);

        /*  //////////////////////////////////////////////////////////////////////////////////
            //////////// This does not work as JS is not executed before metadata ////////////
            //////////// is retrieved. Could be done with PHP, or serverside JS   ////////////
            //////////////////////////////////////////////////////////////////////////////////

            // Also, this'll run for every podcast, only the latest podcast needs to do this

            let metaDesc = `Latest episode hosted at obj_podacst: ${json.title}  \n\n${json.content}`
                .replace(/<\s*\/?\s*[a-zA-Z]\w*\b.*?>/g, '');
            if (metaDesc.length > 256) metaDesc = metaDesc.slice(0, 253) + '...';
            let metas = document.getElementsByTagName('meta');//.item(tag => tag.getAttribute('name') && tag.getAttribute('name') === 'description');
            for (let i = 0; i < metas.length; i++) {
                let meta = metas[i];
                let name = meta.getAttribute('name');
                if (name && (name === 'description' || name === 'twitter:description')) {
                    let parent = meta.parentElement;
                    parent.removeChild(meta);
                    let newMeta = document.createElement('meta');
                    newMeta.setAttribute('name', name);
                    newMeta.setAttribute('content', metaDesc);
                    parent.append(newMeta);
                }
            }
        */

        //if (thisId && !!~window.location.href.indexOf(`#${thisId}`)) scrollTo = audioTag;
    }
    //if (scrollTo) scrollTo.scrollIntoView({ behavior: 'smooth' });
}
