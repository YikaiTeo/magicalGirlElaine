class city extends Phaser.Scene {
  constructor() {
    super({ key: "city" });
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
    //NPC spritesheet//
    this.load.spritesheet("FPNPC", "assets/FpossessedNPC.png", {
      frameWidth: 372,
      frameHeight: 709
    });
    //tilemap preload//
    //city//
    this.load.tilemapTiledJSON("cityMap", "assets/City.json");
    //this.load.spritesheet("layer name", "assets/image_used_for_tileset.png", {}
    this.load.spritesheet("terrain", "assets/Modern_City/Terrain.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mainTerrain", "assets/Main.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mainCollide", "assets/Main.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mainOverlay", "assets/Main.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("street", "assets/Modern_City/Street.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("streetCollide", "assets/Modern_City/Street.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("streetOverlay", "assets/Modern_City/Street.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("buildings", "assets/Modern_City/Buildings.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mainTree", "assets/Main.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mainTreeOverlay", "assets/Main.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("tree", "assets/Modern_City/Terrain.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("treeOverlay", "assets/Modern_City/Terrain.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("fence", "assets/Modern_City/Fence.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet(
      "buildingsOverlay",
      "assets/Modern_City/Buildings.png",
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  }

  create() {
    var map = this.make.tilemap({ key: "cityMap" });
    //map variables//
    //example;//
    //var (name it however) = map.addTilesetImage('(tileset name in tmx)', '(name of layer in tmx)');
    //
    var Terrain = map.addTilesetImage("Terrain", "terrain");
    var MainTerrain = map.addTilesetImage("Main", "mainTerrain");
    var MainCollide = map.addTilesetImage("Main", "mainCollide");
    var MainOverlay = map.addTilesetImage("Main", "mainOverlay");
    var Street = map.addTilesetImage("Street", "street");
    var StreetCollide = map.addTilesetImage("Street", "streetCollide");
    var StreetOverlay = map.addTilesetImage("Street", "streetOverlay");
    var Buildings = map.addTilesetImage("Buildings", "buildings");
    var MainTree = map.addTilesetImage("Main", "mainTree");
    var MainTreeOverlay = map.addTilesetImage("Main", "mainTreeOverlay");
    var Tree = map.addTilesetImage("Terrain", "tree");
    var TreeOverlay = map.addTilesetImage("Terrain", "treeOverlay");
    var Fence = map.addTilesetImage("Fence", "fence");
    var BuildingsOverlay = map.addTilesetImage("Buildings", "buildingsOverlay");
    //
    //placing layers into the game//
    var mapScale = 3;
    var tilemapX = 0;
    var tilemapY = 0;
    //
    //example;//
    //(name it however) = map.createLayer('(name of layer in tmx)', (var name), x, y).setScale(s);
    //
    this.terrainLayer = map
      .createLayer("terrain", Terrain, tilemapX, tilemapY)
      .setScale(mapScale);
    this.mainTerrainLayer = map
      .createLayer("mainTerrain", MainTerrain, tilemapX, tilemapY)
      .setScale(mapScale);
    this.mainCollideLayer = map
      .createLayer("mainCollide", MainCollide, tilemapX, tilemapY)
      .setScale(mapScale);
    this.mainOverlayLayer = map
      .createLayer("mainOverlay", MainOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    this.streetLayer = map
      .createLayer("street", Street, tilemapX, tilemapY)
      .setScale(mapScale);
    this.streetCollideLayer = map
      .createLayer("streetCollide", StreetCollide, tilemapX, tilemapY)
      .setScale(mapScale);
    //another road layer is above the player, scroll down//
    this.buildingsLayer = map
      .createLayer("buildings", Buildings, tilemapX, tilemapY)
      .setScale(mapScale);
    this.mainTreeLayer = map
      .createLayer("mainTree", MainTree, tilemapX, tilemapY)
      .setScale(mapScale);
    //another tree layer is above the player, scroll down//
    this.treeLayer = map
      .createLayer("tree", Tree, tilemapX, tilemapY)
      .setScale(mapScale);
    //another tree layer is above the player, scroll down//
    this.fenceLayer = map
      .createLayer("fence", Fence, tilemapX, tilemapY)
      .setScale(mapScale);
    //another building layer is above the player, scroll down//
    //
    //set maximun width and height of map//
    this.physics.world.bounds.width = this.terrainLayer.width + 6848;
    this.physics.world.bounds.height = this.terrainLayer.height + 6848;
    //
    //activate collision on layers//
    var pass = true;
    this.mainCollideLayer.setCollisionByProperty({
      noPass: pass
    });
    this.streetCollideLayer.setCollisionByProperty({
      noPass: pass
    });
    this.buildingsLayer.setCollisionByProperty({
      noPass: pass
    });
    this.mainTreeLayer.setCollisionByProperty({
      noPass: pass
    });
    this.treeLayer.setCollisionByProperty({
      noPass: pass
    });
    this.fenceLayer.setCollisionByProperty({
      fence: pass
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
    //possessed NPC animations//
    this.anims.create({
      key: "fpNPC",
      frames: this.anims.generateFrameNumbers("FPNPC", {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    });
    //
    //player//
    var elaineScale = 0.2;
    this.player = this.physics.add
      .sprite(2400, 2000, "elaine")
      .setScale(elaineScale)
      .setSize(250, 370);
    //
    //NPCs//
    this.Pnpc = this.physics.add
      .sprite(this.player.x + 300, this.player.y, "Pnpc")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(200, 400).flipX = true;
    //
    //layers that overlay the players//
    this.streetOverlayLayer = map
      .createLayer("streetOverlay", StreetOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    this.mainTreeOverlayLayer = map
      .createLayer("mainTreeOverlay", MainTreeOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    this.buildingsOverlayLayer = map
      .createLayer("buildingsOverlay", BuildingsOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    this.treeOverlayLayer = map
      .createLayer("treeOverlay", TreeOverlay, tilemapX, tilemapY)
      .setScale(mapScale);
    //
    //player and layer collisions//
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.mainCollideLayer, this.player);
    this.physics.add.collider(this.streetCollideLayer, this.player);
    this.physics.add.collider(this.buildingsLayer, this.player);
    this.physics.add.collider(this.mainTreeLayer, this.player);
    this.physics.add.collider(this.treeLayer, this.player);
    this.physics.add.collider(this.fenceLayer, this.player);
    //
    //call function on overlap//
    this.physics.add.overlap(
      this.Pnpc,
      this.player,
      this.nextScene,
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
    this.cursors = this.input.keyboard.createCursorKeys();
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels + 6848,
      map.heightInPixels + 6848
    );
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#4b7b53");
    //
    //next scene//
    var spaceDown = this.input.keyboard.addKey("SPACE");
    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto gameScene");
        this.scene.stop("city");
        this.scene.start("arena");
      },
      this
    );
  }

  nextScene() {
    this.scene.stop("city");
    this.scene.start("arena");
    console.log("enter fight");
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