/**
 * Represents the health status bar in the game, showing the player's health visually.
 * Inherits from the StatusBar class and initializes with specific health status images.
 */
class HealthStatusBar extends StatusBar {

  /**
   * Constructs a HealthStatusBar instance with predefined images and dimensions.
   * The status bar is initialized at the top left of the screen.
   */
  constructor() {
    super(
      [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
      ],
      20,   
      0,    
      150,  
      40    
    );
  }
}
