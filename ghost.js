class Ghost {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 3;
        this.direction = this.getRandomDirection();
    }

    getRandomDirection() {
        const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    update() {
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;

        if (this.x < 0 || this.x + this.width > 500) {
            this.direction.x = -this.direction.x;
        }
        if (this.y < 0 || this.y + this.height > 500) {
            this.direction.y = -this.direction.y;
        }
    }

    draw(ctx) {

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 3, this.y + this.height / 3, this.width / 6, 0, 2 * Math.PI);
        ctx.arc(this.x + 2 * this.width / 3, this.y + this.height / 3, this.width / 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 4, this.y + 2 * this.height / 3);
        ctx.lineTo(this.x + 3 * this.width / 4, this.y + 2 * this.height / 3);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 4, this.y + 2 * this.height / 3);
        ctx.lineTo(this.x + this.width / 4 + this.width / 12, this.y + this.height);
        ctx.moveTo(this.x + this.width / 4 + this.width / 12, this.y + this.height);
        ctx.lineTo(this.x + this.width / 4 + 2 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.moveTo(this.x + this.width / 4 + 2 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.lineTo(this.x + this.width / 4 + 3 * this.width / 12, this.y + this.height);
        ctx.moveTo(this.x + this.width / 4 + 3 * this.width / 12, this.y + this.height);
        ctx.lineTo(this.x + this.width / 4 + 4 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.moveTo(this.x + this.width / 4 + 4 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.lineTo(this.x + this.width / 4 + 5 * this.width / 12, this.y + this.height);
        ctx.moveTo(this.x + this.width / 4 + 5 * this.width / 12, this.y + this.height);
        ctx.lineTo(this.x + this.width / 4 + 6 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.moveTo(this.x + this.width / 4 + 6 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.lineTo(this.x + this.width / 4 + 7 * this.width / 12, this.y + this.height);
        ctx.moveTo(this.x + this.width / 4 + 7 * this.width / 12, this.y + this.height);
        ctx.lineTo(this.x + this.width / 4 + 8 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.moveTo(this.x + this.width / 4 + 8 * this.width / 12, this.y + 2 * this.height / 3);
        ctx.lineTo(this.x + this.width / 4 + 9 * this.width / 12, this.y + this.height);
        ctx.moveTo(this.x + this.width / 4 + 9 * this.width / 12, this.y + this.height);
        ctx.lineTo(this.x + 3 * this.width / 4, this.y + 2 * this.height / 3);
        ctx.stroke();
    }

    resetPosition() {
        this.x = Math.random() * (500 - this.width);
        this.y = Math.random() * (500 - this.height);
        this.direction = this.getRandomDirection();
    }
}
