document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.createElement('div');
    let score = 0;

    let pacman = new Pacman(50, 50, 20, 20);
    let ghost = new Ghost(100, 100, 20, 20);
    let followingGhost = new FollowingGhost(300, 300, 20, 20, pacman);

    let balls = [
        { x: 200, y: 200, radius: 5, eaten: false },
        { x: 300, y: 300, radius: 5, eaten: false },
        { x: 400, y: 400, radius: 5, eaten: false }
    ];

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pacman.update();
        pacman.draw(ctx);

        ghost.update();
        ghost.draw(ctx);

        followingGhost.update();
        followingGhost.draw(ctx);

        balls.forEach((ball, index) => {
            if (!ball.eaten) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
                ctx.fill();

                if (collision(pacman, ball)) {
                    ball.eaten = true;
                    score++;
                    updateScore();
                    addNewBall();
                }

                if (collision(followingGhost, ball)) {
                    resetGame();
                }
            }
        });

        if (collision(pacman, followingGhost)) {
            resetGame();
        }

        requestAnimationFrame(gameLoop);
    }

    function collision(obj1, obj2) {
        let dx = obj1.x + obj1.width / 2 - (obj2.x + obj2.width / 2);
        let dy = obj1.y + obj1.height / 2 - (obj2.y + obj2.height / 2);
        let distance = Math.sqrt(dx * dx + dy * dy);

        return distance < obj1.width / 2 + obj2.width / 2;
    }

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
    }

    scoreDisplay.textContent = 'Score: 0';
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '10px';
    scoreDisplay.style.left = '10px';
    scoreDisplay.style.color = 'yellow';
    scoreDisplay.style.fontFamily = 'Press Start 2P, cursive';
    document.body.appendChild(scoreDisplay);

    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'a': pacman.moveLeft(); break;
            case 'd': pacman.moveRight(); break;
            case 'w': pacman.moveUp(); break;
            case 's': pacman.moveDown(); break;
        }
    });

    gameLoop();

    function addNewBall() {
        let newBall = {
            x: Math.random() * (canvas.width - 20) + 10, 
            y: Math.random() * (canvas.height - 20) + 10, 
            radius: 5,
            eaten: false
        };
        balls.push(newBall);
    }

    function resetGame() {
        score = 0;
        updateScore();
        balls.forEach(ball => ball.eaten = false);
        followingGhost.resetPosition();
    }
});
