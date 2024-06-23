document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.createElement('div');
    let score = 0;


    class Pacman {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = 5;
            this.direction = { x: 0, y: 0 };
            this.mouthOpen = true;
            this.mouthAngle = 0.2 * Math.PI;
            this.mouthOpenCounter = 0;
        }

        moveLeft() {
            this.direction.x = -1;
            this.direction.y = 0;
        }

        moveRight() {
            this.direction.x = 1;
            this.direction.y = 0;
        }

        moveUp() {
            this.direction.x = 0;
            this.direction.y = -1;
        }

        moveDown() {
            this.direction.x = 0;
            this.direction.y = 1;
        }

        update() {
            this.x += this.direction.x * this.speed;
            this.y += this.direction.y * this.speed;

            if (this.x < 0) this.x = 0;
            if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
            if (this.y < 0) this.y = 0;
            if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;

            this.mouthOpenCounter++;
            if (this.mouthOpenCounter >= 10) {
                this.mouthOpen = !this.mouthOpen;
                this.mouthOpenCounter = 0;
            }
        }

        draw(ctx) {
            let startAngle;
            let endAngle;

            if (this.direction.x === -1) { // left
                startAngle = Math.PI + (this.mouthOpen ? this.mouthAngle : 0);
                endAngle = -Math.PI + (this.mouthOpen ? -this.mouthAngle : 0);
            } else if (this.direction.x === 1) { // right
                startAngle = 0.2 * Math.PI + (this.mouthOpen ? this.mouthAngle : 0);
                endAngle = 1.8 * Math.PI - (this.mouthOpen ? this.mouthAngle : 0);
            } else if (this.direction.y === -1) { // up
                startAngle = 1.5 * Math.PI + (this.mouthOpen ? this.mouthAngle : 0);
                endAngle = 1.5 * Math.PI - (this.mouthOpen ? this.mouthAngle : 0);
            } else if (this.direction.y === 1) { // down
                startAngle = 0.5 * Math.PI + (this.mouthOpen ? this.mouthAngle : 0);
                endAngle = 0.5 * Math.PI - (this.mouthOpen ? this.mouthAngle : 0);
            } else { 
                startAngle = 0;
                endAngle = 2 * Math.PI;
            }

            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, startAngle, endAngle);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
            ctx.fill();
        }
    }

    class FollowingGhost {
        constructor(x, y, width, height, pacman) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = 2.5;
            this.pacman = pacman;
        }

        update() {
            let dx = this.pacman.x + this.pacman.width / 2 - (this.x + this.width / 2);
            let dy = this.pacman.y + this.pacman.height / 2 - (this.y + this.height / 2);
            let angle = Math.atan2(dy, dx);
            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);
        }

        draw(ctx) {
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
            ctx.fill();
        }

        resetPosition() {
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
        }
    }

    let pacman = new Pacman(50, 50, 20, 20);
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
                    resetGame(true);
                }
            }
        });

        if (collision(pacman, followingGhost)) {
            handleGhostCollision();
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

    function resetGame(showRestartButton) {
        if (showRestartButton) {
            let restartButton = document.createElement('button');
            restartButton.textContent = 'Game Over - Restart';
            restartButton.style.position = 'absolute';
            restartButton.style.top = '50%';
            restartButton.style.left = '50%';
            restartButton.style.transform = 'translate(-50%, -50%)';
            restartButton.style.padding = '10px 20px';
            restartButton.style.backgroundColor = 'red';
            restartButton.style.color = 'white';
            restartButton.style.border = 'none';
            restartButton.style.cursor = 'pointer';
            restartButton.style.fontFamily = 'Press Start 2P, cursive';
            restartButton.addEventListener('click', () => {
                score = 0;
                updateScore();
                balls.forEach(ball => ball.eaten = false);
                followingGhost.resetPosition();
                document.body.removeChild(restartButton);
            });
            document.body.appendChild(restartButton);
        }
    }

    function handleGhostCollision() {
        resetGame(true);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        pacman.update();
        pacman.draw(ctx);
    
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
                    resetGame(true); 
                }
            }
        });
    
        if (collisionPacmanGhost(pacman, followingGhost)) {
            handleGhostCollision();
        }
    
        requestAnimationFrame(gameLoop);
    }

    function collisionPacmanGhost(pacman, ghost) {
        let dx = pacman.x + pacman.width / 2 - (ghost.x + ghost.width / 2);
        let dy = pacman.y + pacman.height / 2 - (ghost.y + ghost.height / 2);
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < pacman.width / 2 + ghost.width / 2;
    }
    
    function collision(obj1, obj2) {
    let dx = obj1.x + obj1.width / 2 - (obj2.x + obj2.radius);
    let dy = obj1.y + obj1.height / 2 - (obj2.y + obj2.radius);
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < obj1.width / 2 + obj2.radius;
}

    
});
