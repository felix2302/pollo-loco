/**
 * Represents the Endboss character in the game, a formidable enemy that players must defeat.
 * Inherits from MovableObject and has properties and methods specific to the Endboss's behavior.
 */
class Endboss extends MovableObject {
  static DIMENSIONS = { height: 400, width: 250 };
  static INITIAL_POSITION = { y: 55, x: 3800 };
  static OFFSETS = { right: 10, left: 15, top: 70, bottom: 15 };
  static SPEED = 1;

  static IMAGES = {
    ALERT: [
      './img/4_enemie_boss_chicken/2_alert/G5.png',
      './img/4_enemie_boss_chicken/2_alert/G6.png',
      './img/4_enemie_boss_chicken/2_alert/G7.png',
      './img/4_enemie_boss_chicken/2_alert/G8.png',
      './img/4_enemie_boss_chicken/2_alert/G9.png',
      './img/4_enemie_boss_chicken/2_alert/G10.png',
      './img/4_enemie_boss_chicken/2_alert/G11.png',
      './img/4_enemie_boss_chicken/2_alert/G12.png',
    ],
    WALKING: [
      './img/4_enemie_boss_chicken/1_walk/G1.png',
      './img/4_enemie_boss_chicken/1_walk/G2.png',
      './img/4_enemie_boss_chicken/1_walk/G3.png',
      './img/4_enemie_boss_chicken/1_walk/G4.png',
    ],
    ATTACK: [
      './img/4_enemie_boss_chicken/3_attack/G13.png',
      './img/4_enemie_boss_chicken/3_attack/G14.png',
      './img/4_enemie_boss_chicken/3_attack/G15.png',
      './img/4_enemie_boss_chicken/3_attack/G16.png',
      './img/4_enemie_boss_chicken/3_attack/G17.png',
      './img/4_enemie_boss_chicken/3_attack/G18.png',
      './img/4_enemie_boss_chicken/3_attack/G19.png',
      './img/4_enemie_boss_chicken/3_attack/G20.png',
    ],
    HURT: [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ],
    DEAD: [
      'img/4_enemie_boss_chicken/5_dead/G24.png',
      'img/4_enemie_boss_chicken/5_dead/G25.png',
      'img/4_enemie_boss_chicken/5_dead/G26.png',
    ],
  };

  /**
   * Constructs an Endboss object with default properties and behaviors.
   * Loads the initial images, sets properties, and starts the animation loop.
   */
  constructor() {
    super();
    this.initializeProperties();
    this.loadInitialImages();
    this.animate();
  }

  /**
   * Initializes the Endboss's properties such as dimensions, position, speed, and state flags.
   */
  initializeProperties() {
    this.setDimensions(Endboss.DIMENSIONS);
    this.setOffsets(Endboss.OFFSETS);
    this.x = Endboss.INITIAL_POSITION.x;
    this.y = Endboss.INITIAL_POSITION.y;
    this.speed = Endboss.SPEED;

    this.hadFirstContact = false;
    this.bossDead = false;
    this.isHurt = false;
    this.isAttacking = false;
    this.invulnerable = false;
  }

  /**
   * Sets the dimensions of the Endboss.
   * @param {Object} dimensions - The height and width of the Endboss.
   */
  setDimensions({ height, width }) {
    this.height = height;
    this.width = width;
  }

  /**
   * Sets the collision offsets for the Endboss.
   * @param {Object} offsets - The offsets for collision detection (top, bottom, left, right).
   */
  setOffsets({ right, left, top, bottom }) {
    this.offsetRight = right;
    this.offsetLeft = left;
    this.offsetTop = top;
    this.offsetBottom = bottom;
  }

  /**
   * Loads the initial image for the Endboss and preloads all animation frames.
   */
  loadInitialImages() {
    this.loadImage(Endboss.IMAGES.ALERT[0]);
    this.loadImages(Object.values(Endboss.IMAGES).flat());
  }

  /**
   * Starts the animation loop for the Endboss, updating its state based on player proximity and health.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      if (!world || !world.character) return;

      if (world.character.x > 3300 && !this.hadFirstContact) {
        this.startEncounter();
      } else if (this.bossDead) {
        this.playAnimation(Endboss.IMAGES.DEAD);
      } else if (this.isHurt) {
        this.playAnimation(Endboss.IMAGES.HURT);
      } else if (this.isAttacking) {
        this.playAnimation(Endboss.IMAGES.ATTACK);
      } else if (!this.hadFirstContact) {
        this.playAnimation(Endboss.IMAGES.ALERT);
      } else {
        this.adjustSpeedAndWalk();
      }
    }, 150);
  }

  /**
   * Initiates the encounter with the player when they are close enough.
   * Starts the boss music and pauses the background music.
   */
  startEncounter() {
    this.hadFirstContact = true;
    world.audio.bossfight_audio.play();
    world.audio.background.pause();
    this.startWalking();
  }

  /**
   * Begins the walking animation and movement for the Endboss.
   * Adjusts direction based on player's position.
   */
  startWalking() {
    this.clearWalkingIntervals();
    this.walkingInterval = setInterval(() => {
      if (this.canWalk()) this.changeDirection();
    }, 1000 / 60);

    this.walkingAnimationInterval = setInterval(() => {
      if (this.canWalk()) this.playAnimation(Endboss.IMAGES.WALKING);
    }, 100);
  }

  /**
   * Clears the intervals related to the walking animation and movement.
   */
  clearWalkingIntervals() {
    if (this.walkingInterval) clearInterval(this.walkingInterval);
    if (this.walkingAnimationInterval) clearInterval(this.walkingAnimationInterval);
  }

  /**
   * Checks if the Endboss can walk (not hurt, dead, or attacking).
   * @returns {boolean} - True if the Endboss can walk, false otherwise.
   */
  canWalk() {
    return !this.isHurt && !this.bossDead && !this.isAttacking;
  }

  /**
   * Adjusts the direction of the Endboss based on the player's position.
   * Moves the Endboss towards the player.
   */
  changeDirection() {
    if (world.character.x > this.x) {
      this.moveRight();
      this.otherDirection = true;
    } else {
      this.moveLeft();
      this.otherDirection = false;
    }
  }

  /**
   * Plays the hurt animation and handles the logic when the Endboss is damaged.
   * Sets a timeout to recover from the hurt state or triggers the death sequence if health is depleted.
   */
  hurtAnimation() {
    this.isHurt = true;
    world.audio.bossChicke_walk_audio.play();
    setTimeout(() => {
      this.isHurt = false;
      if (this.bossDead) {
        this.die();
      } else {
        this.startWalking();
      }
    }, 1000);
  }

  /**
   * Handles the death of the Endboss, playing the death animation and sound.
   * Removes the Endboss from the game after a short delay.
   */
  die() {
    this.bossDead = true;
    world.audio.bossChicken_dead_audio.play();
    this.playAnimation(Endboss.IMAGES.DEAD);
    setTimeout(() => this.removeBossFromGame(), 1000);
  }

  /**
   * Removes the Endboss from the game and sets the win condition.
   * Stops all boss-related audio.
   */
  removeBossFromGame() {
    const index = world.level.enemies.indexOf(this);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
      world.gameWin = true;
      this.stopBossAudio();
    }
  }

  /**
   * Stops all audio related to the Endboss.
   */
  stopBossAudio() {
    world.audio.bossChicken_dead_audio.pause();
    world.audio.bossChicke_walk_audio.pause();
  }

  /**
   * Initiates the attack animation and logic for the Endboss.
   * The attack lasts for 1.5 seconds, after which the Endboss resumes normal behavior.
   */
  chickenBossAttack() {
    this.isAttacking = true;
    this.attackInterval = setInterval(() => {
      if (!this.bossDead && !this.isHurt) this.playAnimation(Endboss.IMAGES.ATTACK);
    }, 150);

    setTimeout(() => this.endAttack(), 1500);
  }

  /**
   * Ends the attack sequence, clearing the attack interval and resuming walking behavior if applicable.
   */
  endAttack() {
    this.isAttacking = false;
    clearInterval(this.attackInterval);
    if (!this.bossDead && !this.isHurt) this.startWalking();
  }

  /**
   * Handles the logic when the Endboss is hit by the player.
   * Plays the hurt animation and checks if the Endboss should die.
   * Sets a temporary invulnerability period after being hit.
   */
  hitEndBoss() {
    if (this.isInvulnerable()) return;

    this.hadFirstContact = true;
    this.hurtAnimation();
    if (this.isDead()) {
      this.die();
    }
    this.setInvulnerability();
  }

  /**
   * Sets a temporary invulnerability period for the Endboss after being hit.
   */
  setInvulnerability() {
    this.invulnerable = true;
    setTimeout(() => {
      this.invulnerable = false;
    }, 1000);
  }

  /**
   * Checks if the Endboss is currently invulnerable, hurt, or dead.
   * @returns {boolean} - True if the Endboss cannot be hit, false otherwise.
   */
  isInvulnerable() {
    return this.bossDead || this.isHurt || this.invulnerable;
  }

  /**
   * Adjusts the Endboss's speed based on its current energy level.
   * Increases speed as energy decreases.
   */
  adjustSpeedAndWalk() {
    if (this.energy < 80 && this.speed !== 7) {
      this.speed = 7;
    } else if (this.energy < 60 && this.speed !== 10) {
      this.speed = 10;
    }
  }
}
