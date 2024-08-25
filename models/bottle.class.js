/**
 * Represents a bottle object in the game that can be animated and positioned on the ground.
 */
class Bottle extends MovableObject {
  // Static properties defining dimensions, offsets, and images for the bottle
  static DIMENSIONS = { width: 60, height: 60 };
  static OFFSETS = { right: 10, left: 15, top: 10, bottom: 5 };
  static IMAGES_GROUND = [
    './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  /**
   * Initializes the Bottle instance, setting its dimensions, offsets, and starting position.
   */
  constructor() {
    super();
    this.setDimensions(Bottle.DIMENSIONS);
    this.setOffsets(Bottle.OFFSETS);
    this.y = 370; // Set the y position of the bottle
    this.x = this.getRandomXCoordinate(); // Random x position
    this.loadImage(Bottle.IMAGES_GROUND[0]); // Load the initial image
    this.loadImages(Bottle.IMAGES_GROUND); // Load all images for animation
    this.animate(); // Start the animation
  }

  /**
   * Sets the dimensions of the bottle.
   * @param {Object} dimensions - The width and height of the bottle.
   */
  setDimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }

  /**
   * Sets the offsets for the bottle's collision detection.
   * @param {Object} offsets - The offsets for the bottle.
   */
  setOffsets({ right, left, top, bottom }) {
    this.offsetRight = right;
    this.offsetLeft = left;
    this.offsetTop = top;
    this.offsetBottom = bottom;
  }

  /**
   * Returns a random x-coordinate within a specified range.
   * @returns {number} - A random x-coordinate.
   */
  getRandomXCoordinate() {
    return 200 + Math.random() * 3100;
  }

  /**
   * Starts the animation for the bottle by cycling through its images.
   */
  animate() {
    setInterval(() => this.playAnimation(Bottle.IMAGES_GROUND), 700);
  }
}
