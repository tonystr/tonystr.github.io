
document.onscroll = fixHeader;
window.onresize = alignpagecontent;

let pgheader = document.getElementById('header');
let pgheaderul = header.getElementsByTagName('ul')[0];
let pgheadlines = document.getElementsByClassName('headline');
let pgpagecontent = document.getElementById('pagecontent');
let pgcurrentHeadline = undefined;

function fixHeader() {
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

function alignpagecontent() {
    console.log('aligning');
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
}

alignpagecontent();
setTimeout(alignpagecontent, 32);

for (let delm of pgheaderul.getElementsByTagName('li')) {
    delm.addEventListener('click', () => {
        let posel = document.querySelector(`#${delm.getAttribute('value')}`);
        window.scrollTo({
            top: posel.getBoundingClientRect().top + window.pageYOffset - 36,
            behavior: 'smooth'
        });
    });
};
