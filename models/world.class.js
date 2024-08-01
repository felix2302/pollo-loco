class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [new Cloud(), new Cloud(), new Cloud()];
    ctx;
    canvasM

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Pepe zeichnen
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        // Chicken zeichnen
        this.enemies.forEach(e => {
            this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        });

        // Clouds zeichnen
        this.clouds.forEach(e => {
            this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        });

        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => self.draw());
    }
}