class room extends Phaser.Scene {
  constructor() {
    super({ key: "room" });
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
    //
    //tilemap preload//
    //city//
    this.load.tilemapTiledJSON("roomMap", "assets/room.json");
    //this.load.spritesheet("layer name", "assets/image_used_for_tileset.png", {}
    this.load.spritesheet("floor", "assets/Pipoya_RPG_Tileset_16x16/[Base]BaseChip_pipo.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("wall", "assets/Modern_City/Buildings.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("buildingsOverlay", "assets/Modern_City/Buildings.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("furniture", "assets/Pipoya_RPG_Tileset_16x16/[Base]BaseChip_pipo.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("furnitureExtra", "assets/Pipoya_RPG_Tileset_16x16/[Base]BaseChip_pipo.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("furnitureOverlay", "assets/Pipoya_RPG_Tileset_16x16/[Base]BaseChip_pipo.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("stairs", "assets/Pipoya_RPG_Tileset_16x16/[Base]BaseChip_pipo.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    var map = this.make.tilemap({ key: "roomMap" });
    //map variables//
    //example;//
    //var (name it however) = map.addTilesetImage('(tileset name in tmx)', '(name of layer in tmx)');
    //
    var Floor = map.addTilesetImage("[Base]BaseChip_pipo", "floor");
    var Wall = map.addTilesetImage("Buildings", "wall");
    var BuildingsOverlay = map.addTilesetImage("Buildings", "buildingsOverlay");
    var Furniture = map.addTilesetImage("[Base]BaseChip_pipo", "furniture");
    var FurnitureExtra = map.addTilesetImage("[Base]BaseChip_pipo", "furnitureExtra");
    var FurnitureOverlay = map.addTilesetImage("[Base]BaseChip_pipo", "furnitureOverlay");
    var Stairs = map.addTilesetImage("[Base]BaseChip_pipo", "stairs");
    //
    //placing layers into the game//
    var mapScale = 3;
    var tilemapX = 176;
    var tilemapY = 0;
    //
    //example;//
    //(name it however) = map.createLayer('(name of layer in tmx)', (var name), x, y).setScale(s);
    //
    this.floorLayer = map
      .createLayer("floor", Floor, tilemapX, tilemapY)
      .setScale(mapScale);
    this.wallLayer = map
      .createLayer("wall", Wall, tilemapX, tilemapY)
      .setScale(mapScale);
    //another building layer is above the player, scroll down//
    this.furnitureLayer = map
      .createLayer("furniture", Furniture, tilemapX, tilemapY)
      .setScale(mapScale);
    this.furnitureExtraLayer = map
      .createLayer("furnitureExtra", FurnitureExtra, tilemapX, tilemapY)
      .setScale(mapScale);
    this.stairsLayer = map
      .createLayer("stairs", Stairs, tilemapX, tilemapY)
      .setScale(mapScale);
    //another furniture layer is above the player, scroll down//
    //
    //set maximun width and height of map//
    this.physics.world.bounds.width = this.wallLayer.width + 1008;
    this.physics.world.bounds.height = this.wallLayer.height + 1120;
    //
    //activate collision on layers//
    var pass = true;
    this.wallLayer.setCollisionByProperty({
      noPass: pass
    });
    this.furnitureLayer.setCollisionByProperty({
      noPass: pass
    });
    this.stairsLayer.setCollisionByProperty({
      noPass: pass
    });
    //
    //animations//
    //player animations//
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
    //
    //player//
    var elaineScale = 0.2;
    this.player = this.physics.add
      .sprite(510, 1470, "elaine")
      .setScale(elaineScale)
      .setSize(250, 370);
    //
    //layers that overlay the players//
    this.furnitureOverlayLayer = map
      .createLayer("furnitureOverlay", FurnitureOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    this.buildingsOverlayLayer = map
      .createLayer("buildingsOverlay", BuildingsOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    //
    //player and layer collisions//
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.furnitureLayer, this.player);
    this.physics.add.collider(this.stairsLayer, this.player);
    //
    this.cursors = this.input.keyboard.createCursorKeys();
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels + 1008, map.heightInPixels + 1120);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#231f20");
    //
    //quick next scene//
    // var spaceDown = this.input.keyboard.addKey("SPACE");
    // spaceDown.on(
    //   "down",
    //   function () {
    //     console.log("Spacebar pressed, goto gameScene");
    //     this.scene.stop("room");
    //     this.scene.start("city");
    //   },
    //   this
    // );
  }

  nextScene() {
    console.log("enter fight");
    this.scene.stop("room");
    this.scene.start("city")
  }

  update() {
    var offsetX = 7;
    var offsetY = 220;
    var speed = 260;
    var xmovement = 0;
    var ymovement = 0;
    var wDown = this.input.keyboard.addKey("W");
    var sDown = this.input.keyboard.addKey("S");
    var aDown = this.input.keyboard.addKey("A");
    var dDown = this.input.keyboard.addKey("D");
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
    if (
      this.player.x < 522 &&
      this.player.x > 504 &&
      this.player.y < 1621 &&
      this.player.y > 1582
    ) {
      console.log("exiting house");
      this.scene.stop("room");
      this.scene.start("city");
    }
  }
}