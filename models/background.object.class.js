/**
 * Represents an object in the background of the game, such as a static or scrolling background element.
 */
class BackgroundObject extends MovableObject {

  /**
   * Initializes a BackgroundObject instance with a specified image and x-coordinate.
   * @param {string} imagePath - The path to the image used for the background object.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath); 
    this.height = 480; 
    this.width = 720; 
    this.x = x; 
    this.y = 480 - this.height; 
  }
}
