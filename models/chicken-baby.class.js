
class ChickenBaby extends MovableObject {

  width = 60;
  height = 60;
  y = 370;
  offsetRight = 5;
  offsetLeft = 5;
  offsetTop = 5;
  offsetBottom = 5;

  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  isDead = false;


  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 550 + Math.random() * 2900;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  EnemyDead() {
    if (!this.isDead) {
      this.isDead = true;
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        let index = world.level.enemies.indexOf(this);
        if (index > -1) {
          world.level.enemies.splice(index, 1);
        }
      }, 250);
    }
  }
}
