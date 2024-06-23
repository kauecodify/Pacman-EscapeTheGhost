
/**
// gerencia as bolinhas e o score
export class Map {
    constructor(canvas, ctx, pacman) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.pacman = pacman;
        this.balls = [];
        this.score = 0;
        this.scoreDisplay = document.createElement('div');
        this.scoreDisplay.textContent = 'Score: 0';
        this.scoreDisplay.style.position = 'absolute';
        this.scoreDisplay.style.top = '10px';
        this.scoreDisplay.style.left = '10px';
        this.scoreDisplay.style.color = 'yellow';
        this.scoreDisplay.style.fontFamily = 'Press Start 2P, cursive';
        document.body.appendChild(this.scoreDisplay);

        this.initializeBalls();
    }

    initializeBalls() {
        this.balls.push({ x: 250, y: 250, radius: 5, color: 'white', type: 'white' });
    }

    update() {
        this.balls.forEach((ball, index) => {
            if (!ball.eaten) {
                if (ball.type === 'white') {
                    if (this.collision(ball)) {
                        ball.eaten = true;
                        this.addRedBall();
                    }
                } else if (ball.type === 'red') {
                    this.ctx.fillStyle = 'red';
                    this.ctx.beginPath();
                    this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
                    this.ctx.fill();

                    if (this.collision(ball)) {
                        ball.eaten = true;
                        this.score++;
                        this.updateScore();
                        this.addRedBall();
                    }
                }
            }
        });
    }

    collision(ball) {
        let dx = this.pacman.x + this.pacman.width / 2 - ball.x;
        let dy = this.pacman.y + this.pacman.height / 2 - ball.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.pacman.width / 2 + ball.radius;
    }

    updateScore() {
        this.scoreDisplay.textContent = 'Score: ' + this.score;
    }

    addRedBall() {
        let newBall = {
            x: Math.floor(Math.random() * (this.canvas.width - 20)) + 10,
            y: Math.floor(Math.random() * (this.canvas.height - 20)) + 10,
            radius: 5,
            color: 'red',
            type: 'red',
            eaten: false
        };
        this.balls.push(newBall);
    }
}
 */