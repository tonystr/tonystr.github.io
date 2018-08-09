
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

function progressbarupdate(audioTag) {
    let progress = audioTag.parentElement.getElementsByTagName('progress')[0];
    if (!isNaN(audioTag.duration)) {
        progress.value = audioTag.currentTime / audioTag.duration;
        if (progress.value >= 1) {
            playAudio(audioTag.parentElement.getElementsByClassName('play')[0].childNodes[0]);
        }
    }

    progress.addEventListener('click', timetravel);

    function timetravel(evt) {
        let percent = evt.offsetX / this.offsetWidth;
        console.log(percent);
        progress.value = percent;
        audioTag.currentTime = percent * audioTag.duration;
    }
}

function scrubbermove(progress) { // div
    progress.getElementsByClassName('scrubber')[0].style = `left:${window.event.pageX}px`;
    let hoverbar = progress.getElementsByClassName('hoverbar')[0];
    hoverbar.style = `width:${window.event.pageX - hoverbar.offsetLeft}px`;
    console.log(`width:${window.event.pageX - hoverbar.offsetLeft}px`);
}


let audioTags = document.getElementsByTagName('audio');
for (let audioTag of audioTags) {
    let jsonPath = audioTag.src.replace(/\.\w+$/, '.json');
    loadJSON(jsonPath, res => {
        let json = JSON.parse(res);
        let link = audioTag.src;
        audioTag.setAttribute('ontimeupdate', 'progressbarupdate(this)');

        let audioPlayerDiv = document.createElement('div');
            audioPlayerDiv.setAttribute('class', 'audioplayer');
        let buttonPlay = document.createElement('div');
            buttonPlay.setAttribute('class', 'play');
            buttonPlay.innerHTML = `<i class="far fa-play-circle" onClick="playAudio(this)"></i>`;
        let content = document.createElement('div');
            content.setAttribute('class', 'content');
        let desc = document.createElement('div');
            desc.setAttribute('class', 'desc');
            desc.innerHTML = `<h2 class="title">${json.title}</h2><p class="description">${json.description}</p>`
        let tools = document.createElement('div');
            tools.setAttribute('class', 'tools');
            tools.innerHTML =  `<a class="download" download target="_new" href="${link}">Download mp3  <i class="fas fa-download"></i></a>
                                <a class="download" download target="_new" href="${link}">Download odg  <i class="fas fa-download"></i></a>
                                <a class="download" download target="_new" href="${link}">Download xplt <i class="fas fa-download"></i></a>`;

        let progressbar = document.createElement('progress');
            progressbar.setAttribute('value', 0);
            progressbar.setAttribute('max', 1);
        let progress = document.createElement('div');
            progress.setAttribute('class', 'progressbar');
            progress.setAttribute('onmousemove', 'scrubbermove(this)');
            progress.innerHTML = `<div class="hoverbar"></div><div class="scrubber"></div>`
            progress.append(progressbar);

        let aprog = document.createElement('div');
            aprog.setAttribute('class', 'aprog');


        audioPlayerDiv.append(buttonPlay);
        aprog.append(desc);
        aprog.append(tools);
        content.append(aprog);
        content.append(progress);
        audioPlayerDiv.append(content);
        audioTag.parentElement.append(audioPlayerDiv);
        audioPlayerDiv.append(audioTag);
        progressbarupdate(audioTag);
    });
}

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
