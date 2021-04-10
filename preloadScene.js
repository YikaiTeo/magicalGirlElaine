var x = 100;
var click = 0;
var space = 0;
var checkMainScreen = 0;

class preloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preloadScene" });
  }
  preload() {
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
    this.load.spritesheet("buildingsOverlay", "assets/Modern_City/Buildings.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    //music//
    this.load.audio("theme", ["assets/music/purely-grey-phantasm.mp3"]);
    //elaine//
    this.load.spritesheet("elaine", "assets/idle.png", {
      frameWidth: 320,
      frameHeight: 591
    });
    //img preload//
    this.load.image("magicCircle", "assets/SSmagicCircle.png");
    this.load.image("Elaine", "assets/startscreen.png");
    this.load.image("pressStart", "assets/pressStart.png");
  }

  create() {
    this.add.text(800, 500, "press 'command' + 'minus sign(-)' to zoom out if game screen is too big", { font: "25px Courier", fill: "#FFFFFF" }).setOrigin(0.5);
    this.add.text(800, 600, "use 'ctrl' + 'minus sign(-)' to zoom out for windows", { font: "25px Courier", fill: "#FFFFFF" }).setOrigin(0.5);
    this.cameras.main.setBackgroundColor("#231f20");
    //music
    this.music = this.sound.add("theme");
    this.music.play();
    //
    var map = this.make.tilemap({ key: "cityMap" });
    //map variables//
    //example;//
    //var (name it however) = map.addTilesetImage('(tileset name in tmx)', '(name of layer in tmx)');
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
    //placing layers into the game//
    var mapScale = 3;
    var tilemapX = -2000;
    var tilemapY = -1500;
    this.terrainLayer = map
      .createLayer("terrain", Terrain, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.mainTerrainLayer = map
      .createLayer("mainTerrain", MainTerrain, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.mainCollideLayer = map
      .createLayer("mainCollide", MainCollide, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.mainOverlayLayer = map
      .createLayer("mainOverlay", MainOverlay, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.streetLayer = map
      .createLayer("street", Street, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.streetCollideLayer = map
      .createLayer("streetCollide", StreetCollide, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.streetOverlayLayer = map
      .createLayer("streetOverlay", StreetOverlay, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.buildingsLayer = map
      .createLayer("buildings", Buildings, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.mainTreeLayer = map
      .createLayer("mainTree", MainTree, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.mainTreeOverlayLayer = map
      .createLayer("mainTreeOverlay", MainTreeOverlay, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.treeLayer = map
      .createLayer("tree", Tree, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.buildingsOverlayLayer = map
      .createLayer("buildingsOverlay", BuildingsOverlay, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.fenceLayer = map
      .createLayer("fence", Fence, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    this.treeOverlayLayer = map
      .createLayer("treeOverlay", TreeOverlay, tilemapX, tilemapY)
      .setScale(mapScale).setVisible(false);
    //
    //adding designs//
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("elaine", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });
    this.player = this.add
      .sprite(600, 400, "Elaine")
      .play("idle")
      .setScale(0.2)
      .setVisible(false);
    //spinning magic circle//
    this.magiccircle = this.add.image(300, 550, "magicCircle").setScale(0.24).setVisible(false);
    //main stuff//
    this.main = this.add.image(800, 600, "Elaine").setScale(0.24).setVisible(false);
    //press spacebar word//
    this.start = this.add
      .image(800, 1000, "pressStart")
      .setScale(0.24)
      .setOrigin(0.5);
    //create fading animation for "click spacebar"//
    this.fade();
    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.fade,
      callbackScope: this,
      loop: true
    });

    console.log("Start screen");

    var spaceDown = this.input.keyboard.addKey("SPACE");
    spaceDown.on(
      "down",
      function () {
        space = space + 1;
      },
      this
    );
  }

  next() {
    this.terrainLayer.setVisible(true);
    this.mainTerrainLayer.setVisible(true);
    this.mainCollideLayer.setVisible(true);
    this.mainOverlayLayer.setVisible(true);
    this.streetLayer.setVisible(true);
    this.streetCollideLayer.setVisible(true);
    this.streetOverlayLayer.setVisible(true);
    this.buildingsLayer.setVisible(true);
    this.mainTreeLayer.setVisible(true);
    this.mainTreeOverlayLayer.setVisible(true);
    this.treeLayer.setVisible(true);
    this.buildingsOverlayLayer.setVisible(true);
    this.fenceLayer.setVisible(true);
    this.treeOverlayLayer.setVisible(true);
    //
    this.player.setVisible(true);
    //spinning magic circle//
    this.magiccircle.setVisible(true);
    //main stuff//
    this.main.setVisible(true);
    this.time.delayedCall(
      4500,
      function () {
        checkMainScreen = 1;
      },
      [],
      this
    );
  }

  next2() {
    this.music.stop();
    console.log("Spacebar pressed, showing intructions");
    this.scene.stop("preloadScene");
    this.scene.start("loading");
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
    var progressBar = this.add.rectangle(800, 650, x, x, 0xffffff);
    this.magiccircle.rotation += 0.01;

    if(space == 1) {
      this.next()
    } else if(space > 1 && checkMainScreen == 1) {
      checkMainScreen = 0;
      space = 0;
      this.next2();
    };
  }
}
