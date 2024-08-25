
class StatusBar extends DrawableObject {

  IMAGES = [];
  percentage = 100;


  constructor(images, x, y, width, height, initialPercentage = 100) {
    super();
    this.IMAGES = images;
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.setPercentage(initialPercentage);
  }



  resolveImageIndex() {
    if (this.percentage >= 81) {
      return 5;
    } else if (this.percentage >= 61) {
      return 4;
    } else if (this.percentage >= 41) {
      return 3;
    } else if (this.percentage >= 21) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let newIndex = this.resolveImageIndex();
    let path = this.IMAGES[newIndex];
    this.img = this.imageCache[path];
  }
}
