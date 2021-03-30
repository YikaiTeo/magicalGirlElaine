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
    //img preload//
    this.load.image("Elaine", "assets/startscreen.png");
  }

  create() {
    // let graphics = this.add.graphics();

    // graphics.fillStyle(0xff3300, 1);

    // graphics.fillRect(100, 200, 600, 300);
    // graphics.fillRect(100, 100, 100, 100);

    // this.add.text(120, 110, "A", { font: "96px Courier", fill: "#000000" });
    // this.add.text(120, 310, "Press Spacebar to continue", {
    //   font: "24px Courier",
    //   fill: "#000000"
    // });
    this.cameras.main.setBackgroundColor("#231f20");

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
    var tilemapX = -2000;
    var tilemapY = -1500;
    //
    //example;//
    //(name it however) = map.createLayer('(name of layer in tmx)', (var name), x, y).setScale(s);
    //
    this.terrainLayer = map.createLayer("terrain", Terrain, tilemapX, tilemapY).setScale(mapScale);
    this.mainTerrainLayer = map.createLayer("mainTerrain", MainTerrain, tilemapX, tilemapY).setScale(mapScale);
    this.mainCollideLayer = map.createLayer("mainCollide", MainCollide, tilemapX, tilemapY).setScale(mapScale);
    this.mainOverlayLayer = map.createLayer("mainOverlay", MainOverlay, tilemapX, tilemapY).setScale(mapScale);
    this.streetLayer = map.createLayer("street", Street, tilemapX, tilemapY).setScale(mapScale);
    this.streetCollideLayer = map.createLayer("streetCollide", StreetCollide, tilemapX, tilemapY).setScale(mapScale);
    this.streetOverlayLayer = map.createLayer("streetOverlay", StreetOverlay, tilemapX, tilemapY).setScale(mapScale);
    this.buildingsLayer = map.createLayer("buildings", Buildings, tilemapX, tilemapY).setScale(mapScale);
    this.mainTreeLayer = map.createLayer("mainTree", MainTree, tilemapX, tilemapY).setScale(mapScale);
    this.mainTreeOverlayLayer = map.createLayer("mainTreeOverlay", MainTreeOverlay, tilemapX, tilemapY).setScale(mapScale);
    this.treeLayer = map.createLayer("tree", Tree, tilemapX, tilemapY).setScale(mapScale);
    this.buildingsOverlayLayer = map.createLayer("buildingsOverlay", BuildingsOverlay, tilemapX, tilemapY).setScale(mapScale);
    this.fenceLayer = map.createLayer("fence", Fence, tilemapX, tilemapY).setScale(mapScale);
    this.treeOverlayLayer = map.createLayer("treeOverlay", TreeOverlay, tilemapX, tilemapY).setScale(mapScale);

    this.add.image(800, 600, "Elaine").setScale(0.24);

    console.log("This is preloadScene spacebar V3");

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto gameScene");
        this.scene.stop("preloadScene");
        this.scene.start("city");
      },
      this
    );
  }
}