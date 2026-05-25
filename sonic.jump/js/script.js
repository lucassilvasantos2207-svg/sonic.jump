const sonic = document.querySelector('.sonic');
const espinho = document.querySelector('.espinho');

const jump = () => {

    sonic.classList.add('jump');

    setTimeout(() => {

        sonic.classList.remove('jump');

    }, 500);
};

const loop = setInterval(() => {

    const espinhoPosition = espinho.offsetLeft;

    const sonicPosition = +window
        .getComputedStyle(sonic)
        .bottom.replace('px', '');

    if (
        espinhoPosition <= 120 &&
        espinhoPosition > 0 &&
        sonicPosition < 150
    ) {

        /* PARAR ESPINHO */

        espinho.style.animation = 'none';
        espinho.style.left = `${espinhoPosition}px`;

        /* PARAR SONIC */

        sonic.style.animation = 'none';
        sonic.style.bottom = `${sonicPosition}px`;

        /* MORTE */

        sonic.src = './img/sonic-morto.png';
        sonic.style.width = '220px';
        sonic.style.marginLeft = '50px';

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);