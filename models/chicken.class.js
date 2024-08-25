
class Chicken extends MovableObject {

  width = 80;
  height = 80;
  y = 350;
  offsetRight = 5;
  offsetLeft = 5;
  offsetTop = 5;
  offsetBottom = 5;
  isDead = false;
  
  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];



  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 3100;
    this.speed = 0.3 + Math.random() * 0.5;
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
      }, 500);
    }
  }
}
