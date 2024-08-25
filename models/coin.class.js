
class Coin extends MovableObject {

  IMAGES = ['./img/8_coin/coin_1.png', './img/8_coin/coin_2.png'];
  width = 100;
  height = 100;
  offsetLeft = 30;
  offsetRight = 30;
  offsetTop = 30;
  offsetBottom = 30;

  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.y = 100 + Math.random() * (360 - 100);
    this.x = 200 + Math.random() * 3100;
  }
}
