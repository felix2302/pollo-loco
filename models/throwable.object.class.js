/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

  offsetRight = 5;
  offsetLeft = 5;
  offsetTop = 5;
  offsetBottom = 5;

  IMAGES_SPLASH = [
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  IMAGES_ROTATE = [
    './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  /**
   * Throws the bottle, applying gravity and starting rotation and ground detection.
   */
  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.rotateBottle();
    this.reachedGround();
  }

  /**
   * Creates a new ThrowableObject instance.
   * @param {number} x - The initial x position of the bottle.
   * @param {number} y - The initial y position of the bottle.
   */
  constructor(x, y) {
    super().loadImage(
      './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    );
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.isBroken = false;
    this.throw();
  }

  /**
   * Rotates the bottle continuously while it is thrown.
   */
  rotateBottle() {
    this.rotationInterval = setInterval(() => {
      this.checkDirection();
      this.playAnimation(this.IMAGES_ROTATE);
    }, 30);
  }

  /**
   * Checks the direction of the bottle and adjusts its position accordingly.
   */
  checkDirection() {
    if (this.otherDirection) {
      this.x -= 20;
    } else {
      this.x += 20;
    }
  }

  /**
   * Detects when the bottle reaches the ground and triggers the splash animation.
   */
  reachedGround() {
    this.throwInterval = setInterval(() => {
      if (this.y >= 370) {
        this.y = 370;
        this.speedY = 0;
        clearInterval(this.rotationInterval);
        this.splashAnimation();
        world.audio.splash_audio.play();
        this.removeBottle();
      } else {
        this.y += this.speedY;
      }
    }, 30);
  }

  /**
   * Removes the bottle from the world's throwable objects list after a short delay.
   */
  removeBottle() {
    setTimeout(() => {
      let index = world.throwableObjects.indexOf(this);
      if (index > -1) {
        world.throwableObjects.splice(index, 1);
      }
    }, 100);
  }

  /**
   * Triggers the splash animation and marks the bottle as broken.
   */
  splashAnimation() {
    this.isBroken = true;
    clearInterval(this.throwInterval);
    clearInterval(this.applyGravityInterval);
    this.splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 50);
  }
}
