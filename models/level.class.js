/**
 * Represents a level in the game, containing enemies, clouds, background objects, bottles, and coins.
 */
class Level {

  enemies;
  bottles;
  clouds;
  backgroundObjects;
  level_end_x = 3600;
  coins;

  /**
   * Creates an instance of the Level class.
   * 
   * @param {Array<MovableObject>} enemies - The list of enemies in the level.
   * @param {Array<DrawableObject>} clouds - The list of clouds in the level.
   * @param {Array<DrawableObject>} backgroundObjects - The list of background objects in the level.
   * @param {Array<MovableObject>} bottles - The list of bottles in the level.
   * @param {Array<MovableObject>} coins - The list of coins in the level.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
  }
}
