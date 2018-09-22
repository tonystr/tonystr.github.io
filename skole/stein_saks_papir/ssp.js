
opponentWins = 0;
playerWins = 0;
roundIndex = 0;
roundCount = 8;
moveCount = 3;

language = 'nor';

lang = {
    eng: {
        title: 'Welcome to <span class="highlight-extreme">&lt;Rock Paper Scissors!&gt;</span>',
        description: 'Click on one of the icons to chose. Best of <input class="round-count" value="8"></input> wins.</p>',
        moves: ['Rock', 'Scissors', 'Paper'],
        opponent: 'Opponent',
        you: 'You',
        tiemessage: 'You tied!',
        winmessage: 'You won!',
        losemessage: 'You lost!',
        scoremessage: 'The final score was',
        retry: 'Play again?'
    },
    nor: {
        title: 'Velkommen til <span class="highlight-extreme">&lt;Stein Saks Papir!&gt;</span>',
        description: 'Trykk på én av ikonene for å velge. Beste av <input class="round-count" value="8"></input> vinner.</p>',
        moves: ['Stein', 'Saks', 'Papir'],
        opponent: 'Motstander',
        you: 'Du',
        tiemessage: 'Uavgjort!',
        winmessage: 'Du vant!',
        losemessage: 'Du tapte!',
        scoremessage: 'Den endelige stillingen var',
        retry: 'Spill igjen?'
    },
    spn: {
        title: 'Bienvinidos a <span class="highlight-extreme">&lt;¡Piedra Papel Tijeras!&gt;</span>',
        description: 'Presione uno de los íconos para elegir. El mejor de <input class="round-count" value="8"></input> triunfos.</p>',
        moves: ['Piedra', 'Tijeras', 'Papel'],
        opponent: 'Adversario',
        you: 'Tú',
        tiemessage: '¡Empataste!',
        winmessage: '¡Ganaste!',
        losemessage: '¡Perdiste!',
        scoremessage: 'El resultado final fue',
        retry: '¿Inténtalo de nuevo?'
    }
}

function initialize() {

    let query = window.location.href.match(/\?(\w*[=&]\w+)+$/);
    let queryParams = query[0].match(/\w+=\w+/g);

    let queryLang = queryParams.find(par => par.match(/^lang=/i)).match(/=(.+)$/)[1];
    if (lang.hasOwnProperty(queryLang)) {
        language = queryLang;

        document.getElementById('pagetitle').innerHTML = lang[language].title;
        document.getElementById('pagesubtitle').innerHTML = lang[language].description;
        document.querySelector('#opponent .name').innerHTML = lang[language].opponent;
        document.querySelector('#player .name').innerHTML = lang[language].you;
        document.querySelector('#gameovermenu .score').innerHTML = `${lang[language].scoremessage} <span class="value"></span>`;
        document.querySelector('#gameovermenu .retry').innerHTML = lang[language].retry;
    }

    document.querySelector('#gameovermenu .retry').addEventListener('click', restartGame);

    for (let elm of document.querySelectorAll('#playfield #player i'))
        elm.addEventListener('mousedown', clickMove);

    let rc = document.getElementsByClassName('round-count')[0];
    rc.addEventListener('keydown', evt => {
        setTimeout(() => {
            let number = Number(evt.target.value);
            if (number) roundCount = number;
        }, 100);
    });

    let number = Number(rc.value);
    if (number) roundCount = number;
}

function clickMove() {
    this.classList.add('clicked');

    let func = () => {
        document.removeEventListener('mouseup', func);

        let oppChoice = Math.floor(Math.random() * moveCount);
        let thisClass = this.getAttribute('class');
        let index = lang.eng.moves.findIndex(val => thisClass.match(val.toLowerCase()));
        let outcome = (oppChoice - index + moveCount) % moveCount;

        if (outcome !== 0) {
            let scoreElm;
            if (outcome === 1) {
                playerWins++;
                scoreElm = document.querySelector('#player .score');
                scoreElm.innerHTML = playerWins;

            } else if (outcome === 2) {
                opponentWins++;
                scoreElm = document.querySelector('#opponent .score');
                scoreElm.innerHTML = opponentWins;
            }
            scoreElm.classList.add('update');
            setTimeout(() => { scoreElm.classList.remove('update'); }, 100);
        }

        roundIndex++;

        let opel = document.querySelector('#opponent');
        opel.classList.add(`game-event-${outcome}`, 'game-event');
        opel.getElementsByTagName('i')[0].setAttribute('class', `far fa-hand-${lang.eng.moves[oppChoice].toLowerCase()}`);

        setTimeout(() => {
            opel.classList.remove(`game-event-${outcome}`, 'game-event');
            this.classList.remove('clicked');
        }, 140);

        if (roundIndex >= roundCount) {
            document.getElementById('playfield').classList.add('gameover');
            let gmovermenu = document.querySelector('#gameovermenu');
            gmovermenu.classList.add('visible');
            gmovermenu.querySelector('.message').innerHTML = (playerWins === opponentWins ?
                lang[language].tiemessage :
                (playerWins > opponentWins ?
                    lang[language].winmessage :
                    lang[language].losemessage));
            gmovermenu.querySelector('.score .value').innerHTML = `${playerWins} - ${opponentWins}`;
        }
    };

    document.addEventListener('mouseup', func);
}

function restartGame(evt) {
    opponentWins = 0;
    playerWins = 0;
    roundIndex = 0;

    document.getElementById('playfield').classList.remove('gameover');
    document.querySelector('#gameovermenu').classList.remove('visible');

}
