document.addEventListener('DOMContentLoaded', () => {
    // Referências do DOM
    const sonic = document.getElementById('sonic');
    const espinho = document.getElementById('espinho');
    const moeda = document.getElementById('moeda');
    const scoreElement = document.getElementById('score');
    const gameBoard = document.getElementById('gameBoard');
    const menu = document.getElementById('menu');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const btnPlay = document.getElementById('btnPlay');
    const btnJump = document.getElementById('btnJump');
    const btnRestart = document.getElementById('btnRestart');

    let score = 0;
    let isDead = false;

    // --- FUNÇÕES DO JOGO ---

    const jump = () => {
        if (!isDead && !sonic.classList.contains('jump')) {
            sonic.classList.add('jump');
            setTimeout(() => sonic.classList.remove('jump'), 550);
        }
    };

    const startGame = () => {
        menu.style.display = 'none';
        gameBoard.style.display = 'block';
        loop();
    };

    const loop = () => {
        if (isDead) return;

        const s = sonic.getBoundingClientRect();
        const e = espinho.getBoundingClientRect();
        const m = moeda.getBoundingClientRect();

        // Verificação de Colisão (Espinho)
        if (s.right - 35 > e.left && s.left + 35 < e.right && s.bottom - 15 > e.top) {
            handleGameOver();
        }

        // Coleta de Moeda
        if (moeda.style.display !== 'none' && s.right > m.left + 10 && s.left < m.right - 10 && s.bottom > m.top && s.top < m.bottom) {
            collectCoin();
        }

        requestAnimationFrame(loop);
    };

    const collectCoin = () => {
        score++;
        scoreElement.innerText = score;
        moeda.style.display = 'none';
        setTimeout(() => {
            if (!isDead) moeda.style.display = 'block';
        }, 800);
    };

    const handleGameOver = () => {
        isDead = true;
        
        // Para as animações no estado atual
        espinho.style.animation = 'none';
        espinho.style.left = `${espinho.offsetLeft}px`;
        
        moeda.style.animation = 'none';
        
        sonic.style.bottom = `${window.getComputedStyle(sonic).bottom}`;
        sonic.style.animation = 'none';
        sonic.src = './imagem/sonic-morrendo.webp';
        
        gameOverScreen.style.display = 'block';
    };

    // --- LISTENERS DE EVENTOS ---

    // Botões de Interface
    btnPlay.addEventListener('click', startGame);
    btnRestart.addEventListener('click', () => location.reload());
    
    // Controles de Pulo
    btnJump.addEventListener('click', jump);
    btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        jump();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') jump();
    });

    document.addEventListener('mousedown', (e) => {
        // Pula se clicar no tabuleiro, mas não em botões
        if (gameBoard.style.display === 'block' && e.target.tagName !== 'BUTTON') {
            jump();
        }
    });
});
