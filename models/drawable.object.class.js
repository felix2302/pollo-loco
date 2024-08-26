/**
 * Base class for drawable objects in the game.
 * Handles image loading, caching, and drawing to the canvas.
 */
class DrawableObject {

  height = 150;
  width = 100;
  x = 120;
  y = 280;


  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads an image from the specified path and assigns it to the object's img property.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the provided canvas context using its current image, position, and size.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the image on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads an array of images and stores them in the imageCache for later use.
   * @param {string[]} arr - Array of image paths to be loaded and cached.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
