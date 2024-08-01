class Cloud extends MovableObject {
    x = Math.random() * 720;
    y = 10;
    width = 500;
    height = 200;
    constructor() {
        super().loadImage('/img/5_background/layers/4_clouds/1.png');
    }


}