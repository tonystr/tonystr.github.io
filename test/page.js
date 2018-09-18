
document.onscroll = fixHeader;
window.onresize = alignpagecontent;

let isFirefox = typeof InstallTrigger !== 'undefined';

let pgheader = document.getElementById('header');
let pgheaderul = header.getElementsByTagName('ul')[0];
let pgheadlines = document.getElementsByClassName('headline');
let pgpagecontent = document.getElementById('pagecontent');
let pgcurrentHeadline = undefined;

function fixHeader() {
    console.log('fixing header')
    let headerOff = header.getBoundingClientRect();
    if (headerOff.top <= 0) {
        pgheaderul.setAttribute('class', 'fixed');
    } else {
        pgheaderul.setAttribute('class', '');
    }

    let headline = getCurrentHeadline(hl => {
        hl.classList.remove('current');
    });

    if (headline) {
        headline.classList.add('current');

        if (headline.id !== pgcurrentHeadline) {
            currentHeadline = headline.id;
            let current = pgheaderul.querySelector('.current');
            if (current) current.classList.remove('current');
            pgheaderul.querySelector(`[value="${currentHeadline}"]`).classList.add('current');
        }
    }
}

function getCurrentHeadline(func = undefined) {
    lowest = window.innerHeight;
    current = undefined;

    for (let headline of pgheadlines) {
        let rect = headline.getBoundingClientRect();
        if (rect.top < lowest / 1.5 && rect.top >= 20) {
            lowest = rect.top;
            current = headline;
        }
        if (func) func(headline);
    }

    return current;
}

let lis = pgheaderul.getElementsByTagName('li');
for (let delm of lis) {
    delm.addEventListener('click', evt => {
        console.log('click!');
        let posel = document.querySelector(`#${evt.target.getAttribute('value')}`);
        windowScrollTo({
            top: posel.getBoundingClientRect().top + window.pageYOffset - 36,
            behavior: 'smooth'
        });
    });
};

/*
<div class="button up"><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg></div>
<slider>
<div class="button down"><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg></div>
*/

let scrollbar = document.createElement('div');
    scrollbar.setAttribute('class', 'scrollbar');
    scrollbar.innerHTML = `<div class="relative">
        <div class="slider">
            <div class="tracker"></div>
        </div>
    </div>`;
document.body.append(scrollbar);

let pgscrollbar = document.getElementsByClassName('scrollbar')[0];
let pgtracker = pgscrollbar.getElementsByClassName('tracker')[0];
let pgscrollMult = 29 * isFirefox + 1;
let mouseGrabPos = 0;

pgtracker.addEventListener('mousedown', initiateScrollHold);

function initiateScrollHold(evt) {
    let size = (window.innerHeight / document.body.scrollHeight) * window.innerHeight;
    let top = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * (pgtracker.parentElement.offsetHeight - size));
    mouseGrabPos = evt.clientY - top;
    document.body.classList.add('selectPrevention');
    pgtracker.classList.add('drag');
    document.addEventListener('mousemove', scrollMouseMove);
    document.addEventListener('mouseup', scrollRemoveEvents);
}

function scrollMouseMove(evt) {
    let size = (window.innerHeight / document.body.scrollHeight) * window.innerHeight;
    let top = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * (pgtracker.parentElement.offsetHeight - size));

    windowScrollBy(0, ((evt.clientY - top - mouseGrabPos) / (pgtracker.parentElement.offsetHeight - size)) * document.body.scrollHeight);
}

function scrollRemoveEvents(evt) {
    document.removeEventListener('mousemove', scrollMouseMove);
    document.removeEventListener('mouseup', scrollRemoveEvents);
    pgtracker.classList.remove('drag');
    document.body.classList.remove('selectPrevention');
}

document.addEventListener('wheel', evt => {
    windowScrollBy(evt.deltaX * pgscrollMult, evt.deltaY * pgscrollMult);
});

// <!-- begin wwww.htmlcommentbox.com -->
setTimeout(() => {
    let hcbCommentBox = document.querySelector('#HCB_comment_box');
    for (let stl of hcbCommentBox.getElementsByTagName('style')) {
        stl.parentElement.removeChild(stl);
    };

    /*
    let desc = document.querySelector('#HCB_comment_box #hcb_submit');
    let granpa = desc.parentElement.parentElement;
        granpa.removeChild(desc.parentElement);
        granpa.append(desc);*/
}, 1000);

function windowScrollBy(x, y) {
    window.scrollBy(x, y);
    moveScrollbar();
}

function windowScrollTo(obj) {
    window.scrollTo(obj);
    pgtracker.classList.add('fadeout');
    setTimeout(() => {
        moveScrollbar();
        pgtracker.classList.remove('fadeout');
    }, 500);
}

function moveScrollbar() {
    let size = (window.innerHeight / document.body.scrollHeight) * window.innerHeight;
    pgtracker.style = `top:${Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * (pgtracker.parentElement.offsetHeight - size))}px;height:${size}px`;
}

function alignpagecontent() {
    let right = window.innerWidth - pgpagecontent.getBoundingClientRect().right;
    let left = pgpagecontent.getBoundingClientRect().left;
    let cond = left - 1 < pgheader.offsetWidth;
    if (cond && right < left) {
        pgheader.classList.add('inline');
        pgpagecontent.classList.add('left');
    } else {
        pgheader.classList.remove('inline');
        pgpagecontent.classList.remove('left');
    }

    windowScrollBy(0, 0);
}

alignpagecontent();
setTimeout(alignpagecontent, 32);

//window.scrollTo(isFirefox ? { top: window.pageYOffset + evt.deltaY * 40 } : { top: window.pageYOffset + evt.deltaY });
//*/
