
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

  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.rotateBottle();
    this.reachedGround();
  }

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

  rotateBottle() {
    this.rotationInterval = setInterval(() => {
      this.checkDirection();
      this.playAnimation(this.IMAGES_ROTATE);
    }, 30);
  }

  checkDirection() {
    if (this.otherDirection) {
      this.x -= 20;
    } else {
      this.x += 20;
    }
  }

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




  removeBottle() {
    setTimeout(() => {
      let index = world.throwableObjects.indexOf(this);
      if (index > -1) {
        world.throwableObjects.splice(index, 1);
      }
    }, 100);
  }

  splashAnimation() {
    this.isBroken = true;
    clearInterval(this.throwInterval);
    clearInterval(this.applyGravityInterval);
    this.splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 50);
  }
}
