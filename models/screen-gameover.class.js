
class Losescreen extends DrawableObject {
  static IMAGE_PATH = './img/9_intro_outro_screens/game_over/game over!.png';
  static DIMENSIONS = { width: 720, height: 480 };
  static INITIAL_POSITION = { x: 0, y: 0 };


  constructor() {
    super();
    this.initializeScreen();
  }


  initializeScreen() {
    this.loadImage(Losescreen.IMAGE_PATH);
    this.setPosition(Losescreen.INITIAL_POSITION);
    this.setDimensions(Losescreen.DIMENSIONS);
  }



  setDimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }

  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
