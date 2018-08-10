
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
        console.log(progress.value);
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

function scrubbermove(progress) { // div
    let scrubber = progress.getElementsByClassName('scrubber')[0];
    let hoverbar = progress.getElementsByClassName('hoverbar')[0];
    scrubber.style = `left:${window.event.pageX}px`;
    console.log(((window.event.pageX - progress.offsetLeft) / progress.offsetWidth) * progress.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('audio')[0].duration);
    scrubber.childNodes[0].innerHTML = parseTime(((window.event.pageX - progress.offsetLeft) / progress.offsetWidth) * progress.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('audio')[0].duration);
    hoverbar.style = `width:${window.event.pageX - hoverbar.offsetLeft}px`;
}

function setAudioDuration() {
    let audioTags = document.getElementsByTagName('audio');
    for (let audioTag of audioTags) {
        setAuDur(audioTag);
    }
}

function setAuDur(audioTag) {
    if (isNaN(audioTag.duration)) {
        setTimeout(() => {setAuDur(audioTag)}, 500);
    } else audioTag.parentElement.getElementsByClassName('time duration')[0].innerHTML = parseTime(audioTag.duration);
}

const srcextensions = ['png', 'jpg'];

function changesrc(element) {
    let srcattempt = parseInt(element.getAttribute('imgsrcattempt'));

    if (srcattempt < srcextensions.length) {
        element.setAttribute('src', element.src.replace(/\.\w+$/, `.${srcextensions[srcattempt]}`));
        element.setAttribute('imgsrcattempt', srcattempt + 1);
    } else element.parentNode.parentNode.removeChild(element.parentNode);
}

let audioTags = document.getElementsByTagName('audio');
for (let audioTag of audioTags) {
    let jsonPath = audioTag.src.replace(/\.\w+$/, '.json');
    loadJSON(jsonPath, res => {
        let json = JSON.parse(res);
        let link = audioTag.src;
        let filename = audioTag.src.match(/\/(\w+)\.\w+$/)[1].trim();
        console.log(filename);
        audioTag.setAttribute('ontimeupdate', 'progressbarupdate(this)');

        let audioPlayerDiv = document.createElement('div');
            audioPlayerDiv.setAttribute('class', 'audioplayer');
        let buttonPlay = document.createElement('div');
            buttonPlay.setAttribute('class', 'play');
            buttonPlay.innerHTML = `<i class="far fa-play-circle" onClick="playAudio(this)"></i>`;
        let content = document.createElement('div');
            content.setAttribute('class', 'content');
        let image = document.createElement('img');
            image.setAttribute('src', `../src/assets/${filename}.png`);
            image.setAttribute('class', 'wonkey-resize');
            image.setAttribute('imgsrcattempt', 0);
            image.setAttribute('onerror', 'changesrc(this)');
        let desc = document.createElement('div');
            desc.setAttribute('class', 'desc');
            desc.innerHTML = `<h2 class="title">${json.title}</h2><p class="description">${json.description}</p>`
        let titleURI = encodeURI(desc.getElementsByClassName('title')[0].innerHTML).replace('#', '%23');
        let tools = document.createElement('div');
            tools.setAttribute('class', 'tools');
            tools.innerHTML =  `<span class="section-header">download</span>
                                <div class="download">
                                    <a download href="${link}">mp3  <i class="fas fa-download"></i></a>
                                    <a download href="${link}">odg  <i class="fas fa-download"></i></a>
                                    <a download href="${link}">xplt <i class="fas fa-download"></i></a>
                                </div>
                                <span class="section-header">share</span>
                                <div class="share">
                                    <a target="_new" href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fobjpodcast.com%2F&ref_src=twsrc%5Etfw&text=${titleURI}&tw_p=tweetbutton&url=https%3A%2F%2Fobjpodcast.com%2F">Twitter <i class="fab fa-twitter"></i></a>
                                    <a target="_new" href=" https://www.facebook.com/sharer.php?t=${titleURI}&u=${encodeURI(audioTag.src)}">Facebook <i class="fab fa-facebook"></i></a>
                                </div>`;

        let currentTime = document.createElement('span');
            currentTime.setAttribute('class', 'time current');
            currentTime.innerHTML = '00:00'
        let duration = document.createElement('span');
            duration.setAttribute('class', 'time duration');
            duration.innerHTML = '00:00'
        let progressContent = document.createElement('div');
            progressContent.setAttribute('class', 'progress-content');
        let progressbar = document.createElement('progress');
            progressbar.setAttribute('value', 0);
            progressbar.setAttribute('max', 1);
        let progress = document.createElement('div');
            progress.setAttribute('class', 'progressbar');
            progress.setAttribute('onmousemove', 'scrubbermove(this)');
            progress.innerHTML = `<div class="hoverbar"></div><div class="scrubber"><div class="hovertime">01:26</div></div>`
            progress.append(progressbar);
        let aprog = document.createElement('div');
            aprog.setAttribute('class', 'aprog');
        let main = document.createElement('div');
            main.setAttribute('class', 'main');
        let fade = document.createElement('div');
            fade.setAttribute('class', 'fade');

        aprog.append(desc);
        aprog.append(tools);;
        content.append(aprog);
        progressContent.append(currentTime);
        progressContent.append(progress);
        progressContent.append(duration)
        content.append(progressContent);
        if (image) fade.append(image);
        main.append(fade);
        main.append(content);
        audioPlayerDiv.append(buttonPlay);
        audioPlayerDiv.append(main);
        audioTag.parentElement.append(audioPlayerDiv);
        audioPlayerDiv.append(audioTag);
        progressbarupdate(audioTag);
        document.getElementsByTagName('body')[0].setAttribute('onload', 'setAudioDuration()');
        fade.style = `width:${image.offsetHeight}px`;
    });
}

function resizeAudioImages() {
    let images = document.getElementsByClassName('wonkey-resize');
    for (let image of images) {
        images.parentElement.style = `width:${image.offsetHeight}px`;
    }
}

window.onresize = resizeAudioImages

function loadJSON(path, callback) {

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }
