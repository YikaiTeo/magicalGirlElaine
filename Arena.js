var collide = true;
var heart = 3;
var monster1Downed = false;
var monster2Downed = false;
var monster3Downed = false;
var monster4Downed = false;
var monster5Downed = false;

class arena extends Phaser.Scene {
  constructor() {
    super({ key: "arena" });
  }

  init(data) {
    this.themeMusic = data.music;
    this.playerPosition = data.player;
  }

  preload() {
    //Elaine spritesheets//
    this.load.spritesheet("elaine", "assets/idle.png", {
      frameWidth: 320,
      frameHeight: 591
    });
    this.load.spritesheet("elaineDown", "assets/down.png", {
      frameWidth: 327,
      frameHeight: 591
    });
    this.load.spritesheet("elaineRight", "assets/right.png", {
      frameWidth: 418,
      frameHeight: 615
    });
    this.load.spritesheet("elaineUp", "assets/up.png", {
      frameWidth: 339,
      frameHeight: 591
    });
    this.load.spritesheet("elaineAttack", "assets/attack.png", {
      frameWidth: 740,
      frameHeight: 1299
    });
    //monster//
    this.load.spritesheet("monster", "assets/monster.png", {
      frameWidth: 285,
      frameHeight: 543
    });
    //magic circle//
    this.load.atlas(
      "magiccircle",
      "assets/magicCircle/magic_circle.png",
      "assets/magicCircle/magic_circle.json"
    );
    //lightning attack//
    this.load.spritesheet("attackAnim", "assets/lightning.png", {
      frameWidth: 611,
      frameHeight: 744
    });
    //imgs//
    this.load.image("elaineP", "assets/ElaineModel/Elaine.png");
    this.load.image("heart", "assets/heart.png");
    //
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
    //music//
    this.load.audio("arenaTheme", ["assets/music/schematist-spirit-cross.mp3"]);
  }

  create() {
    //music//
    this.music = this.sound.add("arenaTheme");
    this.music.play();
    //
    //create layers//
    var map = this.make.tilemap({ key: "arenaMap" });
    //map variables//
    var Floor = map.addTilesetImage("arena_floor", "floors");
    var Walls = map.addTilesetImage("walls", "walls");
    var WallsOverlay = map.addTilesetImage("walls", "wallsOverlay");
    //these create map's layers//
    this.floorLayer = map.createLayer("floors", Floor, 250, 130).setScale(1);
    this.wallsLayer = map.createLayer("walls", Walls, 250, 130).setScale(1);
    //one more layer is above the player, check below//
    //
    //add collision//
    this.wallsLayer.setCollisionByProperty({
      arenaWall: true
    });
    //
    //animations//
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("elaine", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("elaineDown", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
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
      key: "up",
      frames: this.anims.generateFrameNumbers("elaineUp", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
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
      key: "circle",
      frames: [
        {
          key: "magiccircle",
          frame: "magic_circle1.png"
        },
        {
          key: "magiccircle",
          frame: "magic_circle2.png"
        },
        {
          key: "magiccircle",
          frame: "magic_circle3.png"
        },
        {
          key: "magiccircle",
          frame: "magic_circle4.png"
        }
      ],
      frameRate: 9,
      repeat: -1
    });
    this.anims.create({
      key: "lightning",
      frames: this.anims.generateFrameNumbers("attackAnim", {
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
    //create body of characters//
    //player//
    var elaineScale = 0.2;
    this.player = this.physics.add
      .sprite(800, 820, "elaine")
      .setScale(elaineScale)
      .setSize(250, 370);
    //monster//
    this.monsters1 = this.physics.add
      .sprite(1000, 800, "monster")
      .play("Monster")
      .setVisible(true)
      .setScale(elaineScale);
    monster1Downed = false;
    this.monsters2 = this.physics.add
      .sprite(1000, 220, "monster")
      .play("Monster")
      .setVisible(true)
      .setScale(elaineScale);
    monster2Downed = false;
    this.monsters3 = this.physics.add
      .sprite(350, 500, "monster")
      .play("Monster")
      .setVisible(true)
      .setScale(elaineScale);
    monster3Downed = false;
    this.monsters4 = this.physics.add
      .sprite(500, 800, "monster")
      .play("Monster")
      .setVisible(true)
      .setScale(elaineScale);
    monster4Downed = false;
    this.monsters5 = this.physics.add
      .sprite(700, 300, "monster")
      .play("Monster")
      .setVisible(true)
      .setScale(elaineScale);
    monster5Downed = false;
    //
    //overlaying layer//
    this.wallsOverlayLayer = map
      .createLayer("wallsOverlay", WallsOverlay, 250, 130)
      .setScale(1);
    //
    //magic circle and lightning//
    this.circle = this.physics.add
      .sprite(-100, 0, "circle")
      .play("circle")
      .setScale(elaineScale)
      .setVisible(false);
    this.lightning = this.physics.add
      .sprite(-101, 45, "lightning")
      .play("lightning")
      .setScale(elaineScale)
      .setVisible(false)
      .setSize(300, 470)
      .setOffset(156, 250);
    //
    //mouse click summon lightning attack//
    this.input.on(
      "pointerdown",
      function (pointer) {
        this.attackAnim();
      },
      this
    );
    //
    //set collider//
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.wallsLayer, this.player);
    //monsters' collider//
    //walls collide//
    this.physics.add.collider(this.wallsLayer, this.monsters1);
    this.physics.add.collider(this.wallsLayer, this.monsters2);
    this.physics.add.collider(this.wallsLayer, this.monsters3);
    this.physics.add.collider(this.wallsLayer, this.monsters4);
    this.physics.add.collider(this.wallsLayer, this.monsters5);
    //colliders between monster//
    this.physics.add.collider(this.monsters1, this.monsters2);
    this.physics.add.collider(this.monsters1, this.monsters3);
    this.physics.add.collider(this.monsters1, this.monsters4);
    this.physics.add.collider(this.monsters1, this.monsters5);
    this.physics.add.collider(this.monsters2, this.monsters1);
    this.physics.add.collider(this.monsters2, this.monsters3);
    this.physics.add.collider(this.monsters2, this.monsters4);
    this.physics.add.collider(this.monsters2, this.monsters5);
    this.physics.add.collider(this.monsters3, this.monsters1);
    this.physics.add.collider(this.monsters3, this.monsters2);
    this.physics.add.collider(this.monsters3, this.monsters4);
    this.physics.add.collider(this.monsters3, this.monsters5);
    this.physics.add.collider(this.monsters4, this.monsters1);
    this.physics.add.collider(this.monsters4, this.monsters2);
    this.physics.add.collider(this.monsters4, this.monsters3);
    this.physics.add.collider(this.monsters4, this.monsters5);
    this.physics.add.collider(this.monsters5, this.monsters1);
    this.physics.add.collider(this.monsters5, this.monsters2);
    this.physics.add.collider(this.monsters5, this.monsters3);
    this.physics.add.collider(this.monsters5, this.monsters4);
    //
    //call function after getting caught by monster//
    this.physics.add.overlap(
      this.player,
      this.monsters1,
      this.touchedMonster,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.monsters2,
      this.touchedMonster,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.monsters3,
      this.touchedMonster,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.monsters4,
      this.touchedMonster,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.monsters5,
      this.touchedMonster,
      null,
      this
    );
    //call function after attack hit monster//
    this.physics.add.overlap(
      this.lightning,
      this.monsters1,
      this.defeatMonster1,
      null,
      this
    );
    this.physics.add.overlap(
      this.lightning,
      this.monsters2,
      this.defeatMonster2,
      null,
      this
    );
    this.physics.add.overlap(
      this.lightning,
      this.monsters3,
      this.defeatMonster3,
      null,
      this
    );
    this.physics.add.overlap(
      this.lightning,
      this.monsters4,
      this.defeatMonster4,
      null,
      this
    );
    this.physics.add.overlap(
      this.lightning,
      this.monsters5,
      this.defeatMonster5,
      null,
      this
    );
    //
    //elaine model and health display//
    this.add.image(100, 1150, "elaineP").setScale(0.5);
    this.heart1 = this.add
      .image(350, 1120, "heart")
      .setScale(0.25)
      .setVisible(true);
    this.heart2 = this.add
      .image(500, 1120, "heart")
      .setScale(0.25)
      .setVisible(true);
    this.heart3 = this.add
      .image(650, 1120, "heart")
      .setScale(0.25)
      .setVisible(true);
  }

  touchedMonster() {
    if (collide == true) {
      console.log("player hit");
      this.cameras.main.shake(100);
      heart = heart - 1;
      collide = false;
      this.time.delayedCall(
        1000,
        function () {
          collide = true;
        },
        [],
        this
      );
    }
  }

  attackAnim() {
    var spaceDown = this.input.keyboard.addKey("SPACE");
    //for mouse click event//
    this.mouse = this.input.mousePointer;
    //for mouse position//
    this.input = this.input;
    //mouse clicked//
    if (this.mouse.isDown && spaceDown.isDown) {
      this.circle.setPosition(this.input.x, this.input.y);
      this.circle.setVisible(true);
      this.time.delayedCall(
        1000,
        function () {
          this.lightning.setPosition(this.circle.x - 1, this.circle.y + 45);
          this.lightning.setVisible(true);
          this.circle.setVisible(false);
          this.circle.setPosition(-100, 0);
          this.time.delayedCall(
            1000,
            function () {
              this.lightning.setVisible(false);
              this.lightning.setPosition(-101, 45);
            },
            [],
            this
          );
        },
        [],
        this
      );
    }
  }

  defeatMonster1() {
    console.log("monster hit");
    this.monsters1.disableBody(true, true);
    monster1Downed = true;
  }
  defeatMonster2() {
    console.log("monster hit");
    this.monsters2.disableBody(true, true);
    monster2Downed = true;
  }
  defeatMonster3() {
    console.log("monster hit");
    this.monsters3.disableBody(true, true);
    monster3Downed = true;
  }
  defeatMonster4() {
    console.log("monster hit");
    this.monsters4.disableBody(true, true);
    monster4Downed = true;
  }
  defeatMonster5() {
    console.log("monster hit");
    this.monsters5.disableBody(true, true);
    monster5Downed = true;
  }

  update() {
    var offsetX = 7;
    var offsetY = 200;
    var speed = 260;
    var xmovement = 0;
    var ymovement = 0;
    var wDown = this.input.keyboard.addKey("W");
    var sDown = this.input.keyboard.addKey("S");
    var aDown = this.input.keyboard.addKey("A");
    var dDown = this.input.keyboard.addKey("D");
    var spaceDown = this.input.keyboard.addKey("SPACE");
    var attack = false;
    //
    //monster chasing after player//
    this.physics.moveToObject(this.monsters1, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters2, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters3, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters4, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters5, this.player, 30, speed + 2500);
    //
    //trigger player's attack animation
    if (spaceDown.isDown) {
      attack = true;
      this.time.delayedCall(
        1000,
        function () {
          attack = false;
        },
        [],
        this
      );
    }
    //minus heart//
    if (heart == 2) {
      this.heart3.setVisible(false);
    } else if (heart == 1) {
      this.heart3.setVisible(false);
      this.heart2.setVisible(false);
    } else if (heart == 0) {
      this.heart3.setVisible(false);
      this.heart2.setVisible(false);
      this.heart1.setVisible(false);
      // delay 1 sec
      this.time.delayedCall(
        1000,
        function () {
          heart = 3;
          this.scene.restart();
          // this.scene.start("gameoverScene");
        },
        [],
        this
      );
    }
    //
    //monster's left right animations//
    if (this.monsters1.body.velocity.x > -1) {
      this.monsters1.flipX = true;
    } else {
      this.monsters1.flipX = false;
    }
    if (this.monsters2.body.velocity.x > -1) {
      this.monsters2.flipX = true;
    } else {
      this.monsters2.flipX = false;
    }
    if (this.monsters3.body.velocity.x > -1) {
      this.monsters3.flipX = true;
    } else {
      this.monsters3.flipX = false;
    }
    if (this.monsters4.body.velocity.x > -1) {
      this.monsters4.flipX = true;
    } else {
      this.monsters4.flipX = false;
    }
    if (this.monsters5.body.velocity.x > -1) {
      this.monsters5.flipX = true;
    } else {
      this.monsters5.flipX = false;
    }
    //
    //up, down controls//
    if (wDown.isDown && attack == false) {
      this.player.setVelocityY(-speed);
      ymovement = -1;
    } else if (sDown.isDown && attack == false) {
      this.player.setVelocityY(speed);
      ymovement = 1;
    } else {
      this.player.setVelocityY(0);
      ymovement = 0;
    }
    //
    //left, right controls//
    if (aDown.isDown && attack == false) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
      xmovement = -1;
    } else if (dDown.isDown && attack == false) {
      this.player.setVelocityX(speed);
      xmovement = 1;
    } else {
      this.player.setVelocityX(0);
      xmovement = 0;
    }
    //up, down, left, right animations//
    if (xmovement == 1) {
      this.player.anims.play("right", true).setOffset(150, offsetY);
      this.player.flipX = false;
    } else if (xmovement == -1) {
      this.player.anims.play("right", true).setOffset(offsetX, offsetY);
      this.player.flipX = true;
    } else if (ymovement == -1) {
      this.player.anims.play("up", true).setOffset(80, offsetY);
      this.player.flipX = false;
    } else if (ymovement == 1) {
      this.player.anims.play("down", true).setOffset(offsetX, offsetY);
      this.player.flipX = false;
    }
    //idle animation//
    if (ymovement == 0 && xmovement == 0 && attack == false) {
      this.player.anims.play("idle", true).setOffset(offsetX, offsetY);
      this.player.flipX = false;
    }
    //attack animation//
    if (attack == true) {
      this.player.anims.play("attack", true).setOffset(245, 555);
      this.player.flipX = false;
    }
    //
    //next scene//
    if (
      monster1Downed == true &&
      monster2Downed == true &&
      monster3Downed == true &&
      monster4Downed == true &&
      monster5Downed == true
    ) {
      console.log("monster cleared");
      heart = 3;
      this.time.delayedCall(
        1000,
        function () {
          this.music.stop();
          this.themeMusic.play();
          this.scene.stop("arena");
          this.scene.start("city", {
            player: this.playerPosition,
            music: this.themeMusic
          });
        },
        [],
        this
      );
    }
  }
}