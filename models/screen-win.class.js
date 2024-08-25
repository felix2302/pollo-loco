/**
 * Represents the win screen in the game.
 * @extends DrawableObject
 */
class WinScreen extends DrawableObject {

  /**
   * Creates a new WinScreen instance.
   * Initializes the win screen images and sets the initial position and size.
   */
  constructor() {
    super();
    this.images = [
      './img/9_intro_outro_screens/win/win_1.png',
      './img/9_intro_outro_screens/win/win_2.png',
    ];
    this.init();
  }

  /**
   * Initializes the win screen by loading images and setting the position and size.
   */
  init() {
    this.loadImage(this.images[1]);
    this.loadImages(this.images);
    this.setPosition(0, 0);
    this.setSize(720, 480);
  }

  /**
   * Sets the size of the win screen.
   * @param {number} width - The width of the win screen.
   * @param {number} height - The height of the win screen.
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Sets the position of the win screen.
   * @param {number} x - The x position of the win screen.
   * @param {number} y - The y position of the win screen.
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
