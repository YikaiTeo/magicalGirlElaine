let config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 1200,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
  scene: [preloadScene, room, city, arena]
};

let game = new Phaser.Game(config);