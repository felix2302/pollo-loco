
class WinScreen extends DrawableObject {

  constructor() {
    super();
    this.images = [
      './img/9_intro_outro_screens/win/win_1.png',
      './img/9_intro_outro_screens/win/win_2.png',
    ];
    this.init();
  }


  init() {
    this.loadImage(this.images[1]);
    this.loadImages(this.images);
    this.setPosition(0, 0);
    this.setSize(720, 480);
  }

    
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
  
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
}
