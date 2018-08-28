
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
    let audioTags = document.getElementsByTagName('audio');
    let i = 0;
    for (let audioTag of audioTags) {
        let json = jsonList[i++];
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
        let titleURI = encodeURIComponent(desc.getElementsByClassName('title')[0].innerHTML.match(/.+?(?=<)/)[0].trim());
        let tools = document.createElement('div');
            tools.setAttribute('class', 'tools');
            tools.innerHTML =  `<span class="section-header">download</span>
                                <div class="download">
                                    <a download target="_blank" href="${dlpath + filename}">ogg  <i class="fas fa-download"></i></a>
                                    <a download target="_blank" href="${dlpath + filename.replace('ogg', 'mp3')}">mp3  <i class="fas fa-download"></i></a>
                                </div>
                                <span class="section-header">share</span>
                                <div class="share">
                                    <a target="_blank" href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fobjpodcast.com%2F&ref_src=twsrc%5Etfw&text=${titleURI}&tw_p=tweetbutton&url=https%3A%2F%2Fobjpodcast.com%2F">Twitter <i class="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://www.facebook.com/sharer.php?t=${titleURI}&u=${encodeURI(audioTag.src)}">Facebook <i class="fab fa-facebook"></i></a>
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

        if (false && desc.offsetHeight > tools.offsetHeight) {
            let description = desc.getElementsByClassName('description')[0];
                description.style = `height:${description.offsetHeight + tools.offsetHeight - desc.offsetHeight}px;overflow-y:hidden`;
            let bar = document.createElement('div');
                bar.setAttribute('class', 'showmorebar');
                bar.innerHTML = '<a>Show More</a>'
            desc.append(bar);
        }
    }
}
