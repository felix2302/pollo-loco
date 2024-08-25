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

  constructor(canvas, keyboard, audio) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.audio = audio;
    this.initialize();
  }

  
  initializeBackgroundAudio() {
    if (this.audio?.background) {
      this.audio.background.currentTime = 0;
      this.audio.background.play();
    }
  }
  
  setWorld() {
    this.character.world = this;
  }
  
  run() {
    this.gameInterval = setInterval(() => {
      if (this.gameOver || this.gameWin) {
        this.stopGame();
      } else {
        this.updateGame();
      }
    }, 1000 / 60);
  }
  
  initialize() {
    this.draw();
    this.setWorld();
    this.run();
    this.initializeBackgroundAudio();
  }
  updateGame() {
    this.checkCollisions();
    this.checkBottleCollection();
    this.checkCoinCollection();
    this.checkThrowObject();
    this.bottleCollisionWithEnemy();
  }

  stopGame() {
    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrame);
    this.keyboard = null;
    this.audio?.background?.pause();
    this.addToMap(this.gameOver ? this.losescreen : this.winscreen);
    document.getElementById("back-to-menu").classList.remove("d-none");
    document.getElementById("play-again").classList.remove("d-none");
  }

  
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
  
  handleEnemyCollision(enemy) {
    if (enemy instanceof Chicken || enemy instanceof ChickenBaby) {
      this.handleChickenCollision(enemy);
    } else if (enemy instanceof Endboss) {
      this.handleEndbossCollision(enemy);
    }
  }
  
  handleChickenCollision(enemy) {
    enemy.EnemyDead();
    this.audio.splash_audio.play();
    this.audio.chicken_dead_audio.play();
  }
  
  checkThrowObject() {
    if (this.keyboard?.D && Date.now() - this.lastThrowTime >= 500) {
      if (this.character.bottles > 0) {
        this.audio.throw_audio.play();
        this.throwBottleAndUpdateStatus();
      }
    }
  }
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

  defeatEnemy(enemy) {
    enemy.EnemyDead();
    this.audio.chicken_dead_audio.play();
    this.character.jump();
    this.audio.jumping_audio.play();
  }

  canDefeatEnemy(enemy) {
    return (enemy instanceof Chicken || enemy instanceof ChickenBaby) && !enemy.isDead && this.character.isAboveEnemyTop(enemy) && this.character.speedY < 0;
  }

  checkBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.character.bottles < 100) {
        this.characterCollectedBottle(index);
      }
    });
  }

  checkCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.character.coins < 100) {
        this.characterCollectedCoin(index);
      }
    });
  }

  throwBottleAndUpdateStatus() {
    const bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
    bottle.otherDirection = this.character.otherDirection;
    this.throwableObjects.push(bottle);
    this.character.throwBottle();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.lastThrowTime = Date.now();
  }

  characterCollectedBottle(index) {
    this.character.bottleCollected();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.level.bottles.splice(index, 1);
  }

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

  characterCollectedCoin(index) {
    this.character.coinsCollected();
    this.audio.coin_audio.play();
    this.coinStatus.setPercentage(this.character.coins);
    this.level.coins.splice(index, 1);
  }

  addFixedObjectsToMap() {
    this.addToMap(this.bossStatus);
    this.addToMap(this.healthStatus);
    this.addToMap(this.coinStatus);
    this.addToMap(this.salsaBottleStatus);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

}
