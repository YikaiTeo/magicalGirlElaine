var x = 100;
var click = 0;
var space = 0;
var checkMainScreen = 0;

class gameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameOverScene" });
  }
  preload() {
    this.load.image("gameover", "assets/gameOver-01.png");
    //music//
    this.load.audio("theme", ["assets/music/purely-grey-phantasm.mp3"]);
  }

  create() {
    this.cameras.main.setBackgroundColor("#231f20");
    this.add.image(800, 600, "gameover").setScale(0.24);
    //music
    this.music = this.sound.add("theme");
    this.music.play();
    this.music.setLoop(true);
    this.music.setVolume(0.5);

    console.log("game over");

    var spaceDown = this.input.keyboard.addKey("SPACE");
    // spaceDown.on(
    //   "down",
    //   function () {
    //     space = space + 1;
    //   },
    //   this
    // );
  }

  update() {}
}