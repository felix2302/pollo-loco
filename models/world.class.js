/**
 * Represents the game world, including the character, enemies, status bars, and other game elements.
 */
class World {
  character = new Character();
  audio;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bossStatus = new BossStatusBar();
  healthStatus = new HealthStatusBar();
  coinStatus = new CoinStatusBar();
  salsaBottleStatus = new BottleStatusBar();
  winscreen = new WinScreen();
  losescreen = new Losescreen();
  throwableObjects = [];
  lastThrowTime = 0;
  gameInterval;
  animationFrame;
  gameOver = false;
  gameWin = false;

  /**
   * Initializes the world.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   * @param {Object} keyboard - The keyboard input handler.
   * @param {Object} audio - The audio manager for handling game sounds.
   */
  constructor(canvas, keyboard, audio) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.audio = audio;
    this.initialize();
  }

  /**
   * Initializes the background audio for the game.
   */
  initializeBackgroundAudio() {
    if (this.audio?.background) {
      this.audio.background.currentTime = 0;
      this.audio.background.play();
    }
  }

  /**
   * Links the character to the current world instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop, running at approximately 60 frames per second.
   */
  run() {
    this.gameInterval = setInterval(() => {
      if (this.gameOver || this.gameWin) {
        this.stopGame();
      } else {
        this.updateGame();
      }
    }, 1000 / 60);
  }

  /**
   * Initializes the game, including setting up the world, starting the game loop, and playing background audio.
   */
  initialize() {
    this.draw();
    this.setWorld();
    this.run();
    this.initializeBackgroundAudio();
  }

  /**
   * Updates the game state, checking for collisions, object collections, and other interactions.
   */
  updateGame() {
    this.checkCollisions();
    this.checkBottleCollection();
    this.checkCoinCollection();
    this.checkThrowObject();
    this.bottleCollisionWithEnemy();
  }

  /**
   * Stops the game loop and displays the game over or win screen.
   */
  stopGame() {
    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrame);
    this.keyboard = null;
    this.audio?.background?.pause();
    this.addToMap(this.gameOver ? this.losescreen : this.winscreen);
    document.getElementById("back-to-menu").classList.remove("d-none");
    document.getElementById("play-again").classList.remove("d-none");
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.canDefeatEnemy(enemy)) {
          this.defeatEnemy(enemy);
        } else if (enemy instanceof Endboss && !enemy.isAttacking) {
          enemy.chickenBossAttack();
        } else if (!this.character.isHurt()) {
          this.character.hit();
          this.healthStatus.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  bottleCollisionWithEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.handleEnemyCollision(enemy);
          bottle.splashAnimation();
          bottle.removeBottle();
        }
      });
    });
  }

  /**
   * Handles the collision between an enemy and a bottle.
   * @param {Object} enemy - The enemy that has collided with the bottle.
   */
  handleEnemyCollision(enemy) {
    if (enemy instanceof Chicken || enemy instanceof ChickenBaby) {
      this.handleChickenCollision(enemy);
    } else if (enemy instanceof Endboss) {
      this.handleEndbossCollision(enemy);
    }
  }

  /**
   * Handles the collision between a chicken enemy and a bottle.
   * @param {Object} enemy - The chicken enemy that has collided with the bottle.
   */
  handleChickenCollision(enemy) {
    enemy.enemyDead();
    this.audio.splash_audio.play();
    this.audio.chicken_dead_audio.play();
  }

  /**
   * Checks if the character has thrown a bottle and handles the action.
   */
  checkThrowObject() {
    if (this.keyboard?.D && Date.now() - this.lastThrowTime >= 500) {
      if (this.character.bottles > 0) {
        this.audio.throw_audio.play();
        this.throwBottleAndUpdateStatus();
      }
    }
  }

  /**
   * Handles the collision between the Endboss and a bottle.
   * @param {Object} enemy - The Endboss that has collided with the bottle.
   */
  handleEndbossCollision(enemy) {
    if (!enemy.invulnerable) {
      enemy.hitEndBoss();
      enemy.hitChickenBoss();
      this.audio.splash_audio.play();
    }
    if (enemy.bossDead) {
      this.audio.bossfight_audio.pause();
      this.audio.game_win_audio.play();
    }
    this.bossStatus.setPercentage(enemy.energy);
  }

  /**
   * Defeats an enemy by setting its status to dead and playing the appropriate audio.
   * @param {Object} enemy - The enemy to be defeated.
   */
  defeatEnemy(enemy) {
    enemy.enemyDead();
    this.audio.chicken_dead_audio.play();
    this.character.jump();
    this.audio.jumping_audio.play();
  }

  /**
   * Determines if the character can defeat a given enemy.
   * @param {Object} enemy - The enemy to check.
   * @returns {boolean} True if the character can defeat the enemy, false otherwise.
   */
  canDefeatEnemy(enemy) {
    return (
      (enemy instanceof Chicken || enemy instanceof ChickenBaby) &&
      !enemy.isDead &&
      this.character.isAboveEnemyTop(enemy) &&
      this.character.speedY < 0
    );
  }

  /**
   * Checks if the character has collected any bottles.
   */
  checkBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.character.bottles < 100) {
        this.characterCollectedBottle(index);
      }
    });
  }

  /**
   * Checks if the character has collected any coins.
   */
  checkCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.character.coins < 100) {
        this.characterCollectedCoin(index);
      }
    });
  }

  /**
   * Throws a bottle and updates the status bar.
   */
  throwBottleAndUpdateStatus() {
    const bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
    bottle.otherDirection = this.character.otherDirection;
    this.throwableObjects.push(bottle);
    this.character.throwBottle();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.lastThrowTime = Date.now();
  }

  /**
   * Handles the action when the character collects a bottle.
   * @param {number} index - The index of the bottle in the bottles array.
   */
  characterCollectedBottle(index) {
    this.character.bottleCollected();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.level.bottles.splice(index, 1);
  }

  /**
   * Draws all game objects on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);
    this.addFixedObjectsToMap();

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    if (!this.gameOver && !this.gameWin) {
      this.animationFrame = requestAnimationFrame(() => this.draw());
    }
  }

  /**
   * Handles the action when the character collects a coin.
   * @param {number} index - The index of the coin in the coins array.
   */
  characterCollectedCoin(index) {
    this.character.coinsCollected();
    this.audio.coin_audio.play();
    this.coinStatus.setPercentage(this.character.coins);
    this.level.coins.splice(index, 1);
  }

  /**
   * Adds fixed objects such as status bars to the canvas.
   */
  addFixedObjectsToMap() {
    this.addToMap(this.bossStatus);
    this.addToMap(this.healthStatus);
    this.addToMap(this.coinStatus);
    this.addToMap(this.salsaBottleStatus);
  }

  /**
   * Adds an array of objects to the canvas.
   * @param {Array} objects - The objects to be added to the canvas.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a movable object to the canvas, including handling image flipping for direction.
   * @param {Object} mo - The movable object to be added to the canvas.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips the image horizontally.
   * @param {Object} mo - The movable object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Restores the image to its original orientation after flipping.
   * @param {Object} mo - The movable object whose image is to be restored.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }
}
