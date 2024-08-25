class BackgroundObject extends MovableObject {

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.height = 480;
    this.width = 720;
    this.x = x;
    this.y = 480 - this.height;
  }
}
