const trainScene = document.querySelector('[data-train-scene]');
const spaceScene = document.querySelector('[data-space-scene]');
const starField = document.querySelector('[data-star-field]');
const showTrain = new URLSearchParams(window.location.search).get('scene') === 'train';

if (showTrain && trainScene) {
    const firstTrain = trainScene.querySelector('.ascii-train__art');

    if (firstTrain) {
        const secondTrain = firstTrain.cloneNode(true);
        secondTrain.classList.add('ascii-train__art--second');
        trainScene.appendChild(secondTrain);
    }
}

const trainFrames = showTrain
    ? document.querySelectorAll('[data-train-frame]')
    : [];
const trainBody = trainFrames.length > 0
    ? trainFrames[0].textContent.split('\n').slice(0, 7).join('\n')
    : '';

if (trainScene && spaceScene) {
    trainScene.hidden = !showTrain;
    spaceScene.hidden = showTrain;
}

if (!showTrain && starField) {
    const starCharacters = ['.', '*', '+'];

    for (let index = 0; index < 34; index += 1) {
        const star = document.createElement('span');
        star.className = 'space-scene__star';
        star.textContent = starCharacters[index % starCharacters.length];
        star.style.setProperty('--star-x', ((index * 37 + 7) % 96) + '%');
        star.style.setProperty('--star-y', ((index * 61 + 11) % 88) + '%');
        star.style.setProperty('--star-size', (0.55 + (index % 3) * 0.16) + 'rem');
        star.style.setProperty('--star-speed', (1.5 + (index % 5) * 0.45) + 's');
        star.style.setProperty('--star-delay', (-((index * 17) % 32) / 10) + 's');
        starField.appendChild(star);
    }
}

if (spaceScene && !showTrain && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const trailCharacters = ['.', '+', '*'];
    let lastTrailAt = 0;
    let lastTrailX = 0;
    let lastTrailY = 0;
    let trailIndex = 0;

    spaceScene.addEventListener('pointermove', (event) => {
        const now = performance.now();
        const distance = Math.hypot(event.clientX - lastTrailX, event.clientY - lastTrailY);

        if ((event.pointerType && event.pointerType !== 'mouse') || now - lastTrailAt < 45 || distance < 9) {
            return;
        }

        const bounds = spaceScene.getBoundingClientRect();
        const trailStar = document.createElement('span');

        trailStar.className = 'space-scene__trail';
        trailStar.textContent = trailCharacters[trailIndex % trailCharacters.length];
        trailStar.style.left = `${event.clientX - bounds.left}px`;
        trailStar.style.top = `${event.clientY - bounds.top}px`;
        spaceScene.appendChild(trailStar);
        trailStar.addEventListener('animationend', () => trailStar.remove(), { once: true });

        lastTrailAt = now;
        lastTrailX = event.clientX;
        lastTrailY = event.clientY;
        trailIndex += 1;
    });
}

if (trainFrames.length > 0 && showTrain) {
    const wheelFrames = [
        [
            '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
            ' |/-=|___|=    ||    ||    ||    |_____/~\\___/',
            '  \\_/      \\O=====O=====O=====O_/      \\_/'
        ].join('\n'),
        [
            '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
            ' |/-=|___|=O=====O=====O=====O   |_____/~\\___/',
            '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/'
        ].join('\n'),
        [
            '__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__',
            ' |/-=|___|=    ||    ||    ||    |_____/~\\___/',
            '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/'
        ].join('\n'),
        [
            '__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__',
            ' |/-=|___|=    ||    ||    ||    |_____/~\\___/',
            '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/'
        ].join('\n'),
        [
            '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
            ' |/-=|___|=   O=====O=====O=====O|_____/~\\___/',
            '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/'
        ].join('\n'),
        [
            '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
            ' |/-=|___|=    ||    ||    ||    |_____/~\\___/',
            '  \\_/      \\_O=====O=====O=====O/      \\_/'
        ].join('\n')
    ];

    let frame = 0;

    window.setInterval(() => {
        frame = (frame + 1) % wheelFrames.length;
        trainFrames.forEach((trainFrame) => {
            trainFrame.textContent = trainBody + '\n' + wheelFrames[frame];
        });
    }, 90);
}
