/**
 * Represents a movable object in the game, such as a character or throwable object.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

  speed = 0.15;
  otherDirection = false;
  acceleration = 2;
  energy = 100;
  speedY = 0;
  bottles = 0;
  coins = 0;
  lastHit = 0;

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check collision with.
   * @returns {boolean} True if the objects are colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
      this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
      this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight &&
      this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom
    );
  }

  /**
   * Applies gravity to the object, making it fall over time.
   * This method runs at 60 frames per second.
   */
  applyGravity() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 160;
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  /**
   * Checks if this object is above the top of another movable object.
   * @param {MovableObject} mo - The other movable object to check against.
   * @returns {boolean} True if this object is above the other object's top, otherwise false.
   */
  isAboveEnemyTop(mo) {
    return this.y + this.height - this.offsetTop <= mo.y + mo.offsetTop;
  }

  /**
   * Reduces the object's energy when hit by the Chicken Boss.
   */
  hitChickenBoss() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Reduces the object's energy when hit and records the time of the hit.
   */
  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean} True if the object is dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is hurt (recently hit).
   * @returns {boolean} True if the object is hurt, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1;
  }

  /**
   * Plays an animation by cycling through an array of images.
   * @param {string[]} images - The array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; 
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Increases the number of bottles the object has collected, up to a maximum of 100.
   */
  bottleCollected() {
    if (this.bottles < 100) {
      this.bottles += 20;
      if (this.bottles > 100) {
        this.bottles = 100;
      }
    }
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting an upward speed.
   */
  jump() {
    this.speedY = 20;
  }

  /**
   * Throws a bottle, reducing the number of bottles the object has.
   */
  throwBottle() {
    this.bottles -= 20;
    if (this.bottles < 0) {
      this.bottles = 0;
    }
  }

  /**
   * Increases the number of coins the object has collected, up to a maximum of 100.
   */
  coinsCollected() {
    if (this.coins < 100) {
      this.coins += 20;
    }
    if (this.coins > 100) {
      this.coins = 100;
    }
  }
}
