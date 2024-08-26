/**
 * Represents the main player character with various animations and states.
 */
class Character extends MovableObject {

  width = 140;
  height = 270;
  y = 160;
  speed = 10;
  acceleration = 1;
  lastActivityTime = Date.now();
  offsetRight = 30;
  offsetLeft = 20;
  offsetTop = 80;
  offsetBottom = 10;
  world;

  IMAGES_IDLE = [
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_IDLE_LONG = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    './img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_HURT = [
    './img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png',
    './img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_DEAD = [
    './img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png',
  ];

  /**
   * Initializes the Character instance.
   * Loads images and sets up animations.
   */
  constructor() {
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Sets up animations and movement intervals for the character.
   */
  animate() {
    setInterval(() => {
      this.handleMovement();
      this.updateCameraPosition();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.characterDead();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.isHurt()) {
        this.world.audio.hurt_audio.play();
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world && this.world.keyboard && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.idleAnimations();
      }
    }, 100);
  }

  /**
   * Updates the camera position based on the character's position.
   */
  updateCameraPosition() {
    if (this.world) {
      this.world.camera_x = -this.x + 100;
    }
  }

  /**
   * Handles character movement based on keyboard input.
   */
  handleMovement() {
    this.world.audio.walking_audio.pause();
    if (this.world && this.world.keyboard) {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveCharacterRight();
      }
      if (this.world.keyboard.LEFT && this.x > 120) {
        this.moveCharacterLeft();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.characterJump();
      }
    }
  }

  /**
   * Moves the character to the right.
   */
  moveCharacterRight() {
    this.moveRight();
    this.otherDirection = false;
    this.world.audio.walking_audio.play();
    this.lastActivityTime = Date.now();
  }

  /**
   * Moves the character to the left.
   */
  moveCharacterLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.world.audio.walking_audio.play();
    this.lastActivityTime = Date.now();
  }

  /**
   * Handles the character's idle animations.
   */
  idleAnimations() {
    let idleTime = Date.now() - this.lastActivityTime;
    if (idleTime > 5000 && !this.world.gameOver && !this.world.gameWin) {
      this.world.audio.snoring.play();
      this.playAnimation(this.IMAGES_IDLE_LONG);
    } else {
      this.world.audio.snoring.pause();
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Handles the character's death state.
   */
  characterDead() {
    if (!this.world.gameOver) {
      this.world.audio.background.pause();
      this.world.audio.bossfight_audio.pause();
      this.world.audio.game_lost_audio.play();
      this.playAnimation(this.IMAGES_DEAD);
      world.gameOver = true;
      world.audio.bossChicke_walk_audio.pause();
    }
  }

  /**
   * Makes the character jump and plays the jumping audio.
   */
  characterJump() {
    this.jump();
    this.world.audio.jumping_audio.play();
    this.lastActivityTime = Date.now();
  }
}
