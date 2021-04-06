var space = 0;

class intructions2 extends Phaser.Scene {
  constructor() {
    super({ key: "intructions2" });
  }
  preload() {
    //tilemap preload//
    //arena//
    this.load.tilemapTiledJSON("arenaMap", "assets/Arena.json");
    this.load.spritesheet("floors", "assets/arena_floor.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("walls", "assets/walls.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("wallsOverlay", "assets/walls.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    //Elaine and npc's spritesheets//
    this.load.spritesheet("Elaine", "assets/idle.png", {
      frameWidth: 320,
      frameHeight: 591
    });
    this.load.spritesheet("elaineAttack", "assets/attack.png", {
      frameWidth: 740,
      frameHeight: 1299
    });
    this.load.spritesheet("monster", "assets/monster.png", {
      frameWidth: 285,
      frameHeight: 543
    });
    //img preload//
    //intructions//
    this.load.image("6", "assets/Instructions/dialogue5-01.png");
    this.load.image("7", "assets/Instructions/dialogue6-01.png");
    this.load.image("8", "assets/Instructions/dialogue7-01.png");
    this.load.image("9", "assets/Instructions/dialogue8-01.png");
    this.load.image("10", "assets/Instructions/dialogue9-01.png");
    this.load.image("11", "assets/Instructions/dialogue10-01.png");
    //
    //elaine//
    this.load.image("elaineP", "assets/ElaineModel/Elaine.png");
    this.load.image("elaineL", "assets/ElaineModel/ElaineL.png");
    this.load.image("elaineS", "assets/ElaineModel/ElaineS.png");
    this.load.image("elaineSL", "assets/ElaineModel/ElaineSL.png");
    //
    this.load.image("magicCircle", "assets/SSmagicCircle.png");
    this.load.image("pressToContinue", "assets/pressToContinue.png");
  }

  create() {
    this.cameras.main.setBackgroundColor("#231f20");
    //create animations//
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("Elaine", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("elaineAttack", {
        start: 0,
        end: 3
      }),
      frameRate: 9,
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
    //
    //tilemaps//
    var map = this.make.tilemap({ key: "arenaMap" });
    //map variables//
    //example;//
    //var (name it however) = map.addTilesetImage('(tileset name in tmx)', '(name of layer in tmx)');
    var Floor = map.addTilesetImage("arena_floor", "floors");
    var Walls = map.addTilesetImage("walls", "walls");
    var WallsOverlay = map.addTilesetImage("walls", "wallsOverlay");
    //placing layers into the game//
    //example;//
    //(name it however) = map.createLayer('(name of layer in tmx)', (var name), x, y).setScale(s);
    this.floorLayer = map.createLayer("floors", Floor, 250, 30).setScale(1);
    this.wallsLayer = map.createLayer("walls", Walls, 250, 30).setScale(1);
    this.wallsOverlayLayer = map
      .createLayer("wallsOverlay", WallsOverlay, 250, 30)
      .setScale(1);
    //
    //intructions and tutorials//
    this.instruction11 = this.add.group();
    this.instruction11.create(800, 830, "11").setScale(0.24).setVisible(true);
    //
    this.instruction10 = this.add.group();
    this.instruction10.create(800, 830, "10").setScale(0.24).setVisible(true);
    //
    this.instruction9 = this.add.group();
    this.instruction9.create(800, 830, "9").setScale(0.24).setVisible(true);
    //
    this.instruction8 = this.add.group();
    this.instruction8.create(800, 830, "8").setScale(0.24).setVisible(true);
    //
    this.instruction7 = this.add.group();
    this.instruction7.create(800, 830, "7").setScale(0.24).setVisible(true);
    //
    this.instruction6 = this.add.group();
    this.instruction6.create(800, 830, "6").setScale(0.24).setVisible(true);
    //
    //characters//
    this.player = this.add
      .sprite(0, 0, "player")
      .setScale(0.2)
      .setVisible(true);
    this.monsters1 = this.physics.add
      .sprite(900, 350, "monster")
      .play("Monster")
      .setVisible(true)
      .setScale(0.2);
    //elaine models//
    this.elaine = this.add
      .image(250, 1150, "elaineP")
      .setScale(0.6)
      .setVisible(false);
    this.elaineL = this.add
      .image(250, 1150, "elaineL")
      .setScale(0.6)
      .setVisible(false);
    this.elaineS = this.add
      .image(250, 1150, "elaineS")
      .setScale(0.6)
      .setVisible(false);
    this.elaineSL = this.add
      .image(250, 1150, "elaineSL")
      .setScale(0.6)
      .setVisible(false);
    //
    //press spacebar notice//
    this.start = this.add
      .image(800, 1100, "pressToContinue")
      .setScale(0.24)
      .setOrigin(0.5);
    this.fade();
    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.fade,
      callbackScope: this,
      loop: true
    });
    //
    //press spacebar and skip control//
    var spaceDown = this.input.keyboard.addKey("SPACE");
    var enterDown = this.input.keyboard.addKey("ENTER");
    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed", space);
        space = space + 1;
      },
      this
    );
    enterDown.on(
      "down",
      function () {
        space = 0;
        this.scene.stop("intructions");
        this.scene.start("room");
      },
      this
    );
    //
  }

  fade() {
    this.time.delayedCall(
      300,
      function () {
        this.tweens.add(
          {
            targets: this.start,
            alpha: 0,
            duration: 800,
            ease: "Power2"
          },
          this
        );
      },
      [],
      this
    );
    this.time.delayedCall(
      1100,
      function () {
        this.tweens.add(
          {
            targets: this.start,
            alpha: 1,
            duration: 800,
            ease: "Power2"
          },
          this
        );
      },
      [],
      this
    );
  }

  update() {
    if (space == 0) {
      this.elaineL.setVisible(true);
      this.player.setPosition(700, 350);
      this.player.anims.play("idle", true);
    } else if (space == 1) {
      this.elaine.setVisible(true);
      this.elaineL.setVisible(false);
      this.instruction6.setVisible(false);
    } else if (space == 2) {
      this.elaineSL.setVisible(true);
      this.elaine.setVisible(false);
      this.player.anims.play("attack", true);
      this.instruction7.setVisible(false);
    } else if (space == 3) {
      this.elaine.setVisible(true);
      this.elaineSL.setVisible(false);
      this.instruction8.setVisible(false);
    } else if (space == 4) {
      this.elaineL.setVisible(true);
      this.elaine.setVisible(false);
      this.instruction9.setVisible(false);
    } else if (space == 5) {
      this.elaineSL.setVisible(true);
      this.elaineL.setVisible(false);
      this.instruction10.setVisible(false);
    } else if (space == 6) {
      space = 0;
      this.scene.stop("intructions2");
      this.scene.start("room");
    }
  }
}