class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.player = {
            x: 2,
            y: 2,
            angle: 0,
            speed: 0.1,
            turnSpeed: 0.1
        }

        // this.ctx.fillStyle = "#000";

        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.map = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,1,0,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,1,0,0,1,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];


        this.mainGameLoop();
    }


    //update function
    update() {
        if (GameInput.isKeyPressed("ArrowUp")) {
            const newX = this.player.x + Math.cos(this.player.angle) * this.player.speed;
            const newY = this.player.y + Math.sin(this.player.angle) * this.player.speed;
        
            if (this.map[Math.floor(newX)][Math.floor(newY)] === 0) {
                this.player.x = newX;
                this.player.y = newY;
            }
        
        }

        if (GameInput.isKeyPressed("ArrowDown")) {
            const newX = this.player.x - Math.cos(this.player.angle) * this.player.speed;
            const newY = this.player.y - Math.sin(this.player.angle) * this.player.speed;


            if (this.map[Math.floor(newX)][Math.floor(newY)] === 0) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }

        if (GameInput.isKeyPressed('ArrowLeft')) {
            this.player.angle -= this.player.turnSpeed;
        }

        if (GameInput.isKeyPressed('ArrowRight')) {
            this.player.angle += this.player.turnSpeed;
        }
    }
    //update end


    //draw function start

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const FOV = Math.PI / 3;
        const rayCount = this.canvas.width;

        for (let i = 0; i < rayCount; i++) {
            const rayAngle = this.player.angle - FOV / 2 + (i / rayCount) * FOV;
            const [distance, wallType] = this.castRay(rayAngle);

            const wallHeight = (this.canvas.height / distance) * 0.5;
            this.ctx.fillStyle = '#FF0000'; // Change wall color to red
            this.ctx.fillRect(
                i,
                (this.canvas.height - wallHeight) / 2,
                1,
                wallHeight
            );
        }
    }

    //draw function end

    castRay(angle) {
        let rayX = this.player.x;
        let rayY = this.player.y;
        const rayDirX = Math.cos(angle);
        const rayDirY = Math.sin(angle);
        const stepSize = 0.1;

        while (true) {
            rayX += rayDirX * stepSize;
            rayY += rayDirY * stepSize;

            const mapX = Math.floor(rayX);
            const mapY = Math.floor(rayY);

            if (this.map[mapX][mapY] === 1) {
                const distance = Math.sqrt(
                    Math.pow(this.player.x - rayX, 2) +
                    Math.pow(this.player.y - rayY, 2)
                );
                return [distance, mapX % 2 === 0];
            }
        }
    }


    //main game loop
    mainGameLoop() {
        const gameLoop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(gameLoop);

        }

        gameLoop();
    }
    //main game loop end
}

window.onload = () => {
    new Game();
}

