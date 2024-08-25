
class Bottle extends MovableObject {
  static DIMENSIONS = { width: 60, height: 60 };
  static OFFSETS = { right: 10, left: 15, top: 10, bottom: 5 };
  static IMAGES_GROUND = [
    './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  constructor() {
    super();
    this.setDimensions(Bottle.DIMENSIONS);
    this.setOffsets(Bottle.OFFSETS);
    this.y = 370;
    this.x = this.getRandomXCoordinate();
    this.loadImage(Bottle.IMAGES_GROUND[0]);
    this.loadImages(Bottle.IMAGES_GROUND);
    this.animate();
  }

  setDimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }

  setOffsets({ right, left, top, bottom }) {
    this.offsetRight = right;
    this.offsetLeft = left;
    this.offsetTop = top;
    this.offsetBottom = bottom;
  }

  getRandomXCoordinate() {
    return 200 + Math.random() * 3100;
  }

  animate() {
    setInterval(() => this.playAnimation(Bottle.IMAGES_GROUND), 700);
  }
}
