var x = 0;

class loading2 extends Phaser.Scene {
  constructor() {
    super({ key: "loading2" });
  }

  init(data) {
    this.music = data.music;
  }

  preload() {
    //elaine//
    this.load.spritesheet("elaineRight", "assets/right.png", {
      frameWidth: 418,
      frameHeight: 615
    });
    //monster//
    this.load.spritesheet("monster", "assets/monster.png", {
      frameWidth: 285,
      frameHeight: 543
    });
    //music//
    this.load.audio("loadingTheme", [
      "assets/music/zapsplat_multimedia_game_sound_rise_ascend_arcade_64274.mp3"
    ]);
  }

  create() {
    this.cameras.main.setBackgroundColor("#231f20");
    //music
    var music = this.sound.add("loadingTheme");
    music.play();
    //adding designs//
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("elaineRight", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Monster",
      frames: this.anims.generateFrameNumbers("monster", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });
    this.player = this.add
      .sprite(850, 550, "Elaine")
      .play("right")
      .setScale(0.2);
    this.monster = this.add
      .sprite(750, 550, "Monster")
      .play("Monster")
      .setScale(0.2);
    this.monster.flipX = true;

    var progressBox = this.add.rectangle(800, 650, 500, 25);
    progressBox.setStrokeStyle(2, 0xffffff);

    console.log("loading...");
  }

  update() {
    x = x + 5;
    var progressBar = this.add.rectangle(800, 650, x, 15, 0xffffff);

    if (x > 490) {
      x = 0;
      console.log("done");
      this.scene.stop("loading");
      this.playerPosition = {};
      this.playerPosition.x = 1070;
      this.playerPosition.y = 321;
      this.scene.start("room", {
        player: this.playerPosition,
        music: this.music
      });
    }
  }
}