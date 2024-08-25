/**
 * Represents the lose screen in the game.
 * @extends DrawableObject
 */
class Losescreen extends DrawableObject {
  static IMAGE_PATH = './img/9_intro_outro_screens/game_over/game over!.png';
  static DIMENSIONS = { width: 720, height: 480 };
  static INITIAL_POSITION = { x: 0, y: 0 };

  /**
   * Creates a new Losescreen instance.
   * Initializes the lose screen by setting its image, position, and dimensions.
   */
  constructor() {
    super();
    this.initializeScreen();
  }

  /**
   * Initializes the lose screen by loading the image, setting its position, and dimensions.
   */
  initializeScreen() {
    this.loadImage(Losescreen.IMAGE_PATH);
    this.setPosition(Losescreen.INITIAL_POSITION);
    this.setDimensions(Losescreen.DIMENSIONS);
  }

  /**
   * Sets the dimensions of the lose screen.
   * @param {Object} dimensions - The width and height of the lose screen.
   * @param {number} dimensions.width - The width of the lose screen.
   * @param {number} dimensions.height - The height of the lose screen.
   */
  setDimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }

  /**
   * Sets the position of the lose screen.
   * @param {Object} position - The x and y coordinates for the position of the lose screen.
   * @param {number} position.x - The x position of the lose screen.
   * @param {number} position.y - The y position of the lose screen.
   */
  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
