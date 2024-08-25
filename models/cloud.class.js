
class Cloud extends MovableObject {

  y = 20;
  width = 500;
  height = 250;

  CLOUD_IMAGES = [
    './img/5_background/layers/4_clouds/1.png',
    './img/5_background/layers/4_clouds/2.png',
  ];

  constructor() {
    super();
    this.loadImages(this.CLOUD_IMAGES);
    this.x = Math.random() * 5000;
    this.setRandomImage();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  setRandomImage() {
    this.currentImageIndex = Math.floor(Math.random() * this.CLOUD_IMAGES.length);
    this.img = this.imageCache[this.CLOUD_IMAGES[this.currentImageIndex]];
  }
}
