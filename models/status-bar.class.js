/**
 * Represents a status bar in the game, such as health or coin status.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

  IMAGES = [];
  percentage = 100;

  /**
   * Creates a new StatusBar instance.
   * @param {Array<string>} images - An array of image paths representing different states of the status bar.
   * @param {number} x - The x position of the status bar.
   * @param {number} y - The y position of the status bar.
   * @param {number} width - The width of the status bar.
   * @param {number} height - The height of the status bar.
   * @param {number} [initialPercentage=100] - The initial percentage value of the status bar.
   */
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

  /**
   * Resolves the image index based on the current percentage value.
   * @returns {number} The index of the image to use based on the percentage.
   */
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

  /**
   * Updates the status bar's percentage and changes the displayed image accordingly.
   * @param {number} percentage - The new percentage value for the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let newIndex = this.resolveImageIndex();
    let path = this.IMAGES[newIndex];
    this.img = this.imageCache[path];
  }
}
