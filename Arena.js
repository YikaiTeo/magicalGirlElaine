class arena extends Phaser.Scene {
  constructor() {
    super({ key: "arena" });
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
    //
    //tilemap preload//
    //arena//
    this.load.tilemapTiledJSON("arenaMap", "assets/Arena.json");
    this.load.spritesheet("floor", "assets/arena_floor.png", {
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
  }

  create() {
    var score = 0;
    var scoreText;
    var map = this.make.tilemap({ key: "arenaMap" });
    //map variables//
    var Floor = map.addTilesetImage("arena_floor", "floor");
    var Walls = map.addTilesetImage("walls", "walls");
    var WallsOverlay = map.addTilesetImage("walls", "wallsOverlay");
    //map layers//
    this.floorLayer = map.createLayer("floor", Floor, 250, 130).setScale(1);
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
      .setScale(elaineScale);
    this.monsters2 = this.physics.add
      .sprite(1000, 220, "monster")
      .play("Monster")
      .setScale(elaineScale);
    this.monsters3 = this.physics.add
      .sprite(350, 500, "monster")
      .play("Monster")
      .setScale(elaineScale);
    this.monsters4 = this.physics.add
      .sprite(500, 800, "monster")
      .play("Monster")
      .setScale(elaineScale);
    this.monsters5 = this.physics.add
      .sprite(700, 900, "monster")
      .play("Monster")
      .setScale(elaineScale);
    //
    //overlaying layer//
    this.wallsOverlayLayer = map
      .createLayer("wallsOverlay", WallsOverlay, 250, 130)
      .setScale(1);
    //
    //animation test//
    this.test = this.add.group();
    this.test
      .create(this.player.x, this.player.y - 270, "test")
      .play("attack")
      .setScale(elaineScale);
    this.test
      .create(this.player.x + 240, this.player.y - 350, "test")
      .play("lightning")
      .setScale(elaineScale);
    //
    //testing magic circle animations//
    // this.circle = this.add.group();
    // this.input.on("pointerdown",
    //   function (pointer) {
    //     this.circle.create(pointer.x, pointer.y, "circle").play("circle").setScale(elaineScale);
    //   }, this
    // );
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
    //
    //not yet//
    //score
    // scoreText = this.add.text(16, 16, 'score: 0', {
    //   fontSize: '32px',
    //   fill: '#000'
    // });
    //
  }

  touchedMonster() {
    //bombs.disableBody(true, true);
    console.log("player caught, restart game");
    this.cameras.main.shake(100);
    // delay 1 sec
    this.time.delayedCall(
      500,
      function () {
        this.scene.restart();
        // this.scene.start("gameoverScene");
      },
      [],
      this
    );
  }

  destroy(circle, lightning) {
    circle.disableBody(true, true);
    lightning.disableBody(true, true);
  }

  update() {
    var offsetX = 7;
    var offsetY = 200;
    var speed = 260;
    var xmovement = 0;
    var ymovement = 0;
    var attack = false;
    var wDown = this.input.keyboard.addKey("W");
    var sDown = this.input.keyboard.addKey("S");
    var aDown = this.input.keyboard.addKey("A");
    var dDown = this.input.keyboard.addKey("D");
    //monster chasing after player//
    this.physics.moveToObject(this.monsters1, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters2, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters3, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters4, this.player, 30, speed + 2500);
    this.physics.moveToObject(this.monsters5, this.player, 30, speed + 2500);
    //for mouse click event
    this.mouse = this.input.mousePointer;
    //for mouse position
    this.input = this.input;
    //mouse clicked
    if (this.mouse.isDown && attack == false) {
      this.circle = this.add.sprite(this.input.x, this.input.y, "circle").play("circle").setScale(0.2);
      attack = true;
      this.time.delayedCall(
        1000, destroy(this.circle, null), attack = false, this
      );
    }
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
    if (wDown.isDown) {
      this.player.setVelocityY(-speed);
      ymovement = -1;
    } else if (sDown.isDown) {
      this.player.setVelocityY(speed);
      ymovement = 1;
    } else {
      this.player.setVelocityY(0);
      ymovement = 0;
    }
    //
    //left, right controls//
    if (aDown.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
      xmovement = -1;
    } else if (dDown.isDown) {
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
    if (ymovement == 0 && xmovement == 0) {
      this.player.anims.play("idle", true).setOffset(offsetX, offsetY);
      this.player.flipX = false;
    }
  }
}