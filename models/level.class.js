
class Level {

  enemies;
  bottles;
  clouds;
  backgroundObjects;
  level_end_x = 3600;
  coins;


  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
  }
}
