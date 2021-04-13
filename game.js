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
  scene: [
    preloadScene,
    loading,
    intructions,
    intructions2,
    loading2,
    room,
    city,
    arena,
    arena2,
    arena3,
    gameOverScene
  ]
};

let game = new Phaser.Game(config);