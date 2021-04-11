var npcX = 1;
var npcX2 = 1;
var npcX3 = 1;
var next = false;

class city extends Phaser.Scene {
  constructor() {
    super({ key: "city" });
  }

  init(data) {
    //example//
    //receiving data//
    //(name it however var a) = data.(name of data);
    this.music = data.music;
    this.player = data.player;
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
    this.load.spritesheet("FPNPC", "assets/F-possessedNPC.png", {
      frameWidth: 359.4,
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
    //sounds//
    this.load.audio("openDoor", [
      "assets/music/zapsplat_household_door_backdoor_close_001_56920.mp3"
    ]);
  }

  create() {
    //sounds//
    this.door = this.sound.add("openDoor");
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
    var tilemapX = 0;
    var tilemapY = 0;
    //example;//
    // (name it however) = map
    //   .createLayer("(name of layer in tmx)", (var name), x, y)
    //   .setScale(s);
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
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    });
    //
    //player//
    var elaineScale = 0.2;
    this.player = this.physics.add
      .sprite(this.player.x, this.player.y, "elaine")
      .setScale(elaineScale)
      .setSize(250, 370);
    //
    //NPCs//
    var npcSizeX = 200;
    var npcSizeY = 500;
    var npcOffsetX = 80;
    var npcOffsetY = 200;
    var area1X = Phaser.Math.Between(5400, 9768);
    var area1Y = Phaser.Math.Between(2525, 2660);
    var area2X = Phaser.Math.Between(514, 4879);
    var area2Y = Phaser.Math.Between(5360, 9725);
    var area3X = Phaser.Math.Between(4120, 4870);
    var area3Y = Phaser.Math.Between(5355, 6949);
    //group 1//
    this.pnpc = this.physics.add.group();
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(2487, 3206, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(2487, 3186, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(1680, 7758, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc
      .create(3535, 5959, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //group 2//
    this.pnpc2 = this.physics.add.group();
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(2697, 2103, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc2
      .create(2014, 7567, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //group 3//
    this.pnpc3 = this.physics.add.group();
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area1X, area1Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area2X, area2Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(area3X, area3Y, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(2738, 7097, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(3516, 6535, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.pnpc3
      .create(3505, 5999, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //trigger npc movement//
    this.npcMove();
    this.timedEvent = this.time.addEvent({
      delay: 12000,
      callback: this.npcMove,
      callbackScope: this,
      loop: true
    });
    this.npcMove2();
    this.timedEvent = this.time.addEvent({
      delay: 6000,
      callback: this.npcMove2,
      callbackScope: this,
      loop: true
    });
    this.npcMove3();
    this.timedEvent = this.time.addEvent({
      delay: 24000,
      callback: this.npcMove3,
      callbackScope: this,
      loop: true
    });
    //
    //layers that overlay the player and npcs//
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
    //NPCs' collision with layers//
    this.pnpc.children.iterate((npc) => {
      npc.setCollideWorldBounds(true);
    });
    this.physics.add.collider(this.mainCollideLayer, this.pnpc);
    this.physics.add.collider(this.streetCollideLayer, this.pnpc);
    this.physics.add.collider(this.buildingsLayer, this.pnpc);
    this.physics.add.collider(this.mainTreeLayer, this.pnpc);
    this.physics.add.collider(this.treeLayer, this.pnpc);
    this.physics.add.collider(this.fenceLayer, this.pnpc);
    //
    this.pnpc.children.iterate((npc) => {
      npc.setCollideWorldBounds(true);
    });
    this.physics.add.collider(this.mainCollideLayer, this.pnpc2);
    this.physics.add.collider(this.streetCollideLayer, this.pnpc2);
    this.physics.add.collider(this.buildingsLayer, this.pnpc2);
    this.physics.add.collider(this.mainTreeLayer, this.pnpc2);
    this.physics.add.collider(this.treeLayer, this.pnpc2);
    this.physics.add.collider(this.fenceLayer, this.pnpc2);
    //
    this.pnpc.children.iterate((npc) => {
      npc.setCollideWorldBounds(true);
    });
    this.physics.add.collider(this.mainCollideLayer, this.pnpc3);
    this.physics.add.collider(this.streetCollideLayer, this.pnpc3);
    this.physics.add.collider(this.buildingsLayer, this.pnpc3);
    this.physics.add.collider(this.mainTreeLayer, this.pnpc3);
    this.physics.add.collider(this.treeLayer, this.pnpc3);
    this.physics.add.collider(this.fenceLayer, this.pnpc3);
    //
    //call function on overlap//
    this.physics.add.overlap(
      this.player,
      this.pnpc,
      this.nextScene,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.pnpc2,
      this.nextScene2,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.pnpc3,
      this.nextScene3,
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
    //camera follow player//
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels + 6848,
      map.heightInPixels + 6848
    );
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    //
    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#4b7b53");
    //
    //
    //get x and y position of player//
    var spaceDown = this.input.keyboard.addKey("SPACE");
    spaceDown.on(
      "down",
      function () {
        console.log(this.player.x, this.player.y);
        // console.log("Spacebar pressed, goto gameScene");
        // this.scene.stop("city");
        // this.scene.start("arena");
      },
      this
    );
  }

  npcMove() {
    var random = Phaser.Math.Between(65, 200);
    this.pnpc.setVelocityY(0);
    this.pnpc.setVelocityX(random);
    npcX = 1;
    this.time.delayedCall(
      3000,
      function () {
        this.pnpc.setVelocityX(0);
        this.pnpc.setVelocityY(random);
        this.time.delayedCall(
          3000,
          function () {
            this.pnpc.setVelocityY(0);
            this.pnpc.setVelocityX(-random);
            npcX = -1;
            this.time.delayedCall(
              3000,
              function () {
                this.pnpc.setVelocityX(0);
                this.pnpc.setVelocityY(-random);
              },
              [],
              this
            );
          },
          [],
          this
        );
      },
      [],
      this
    );
  }
  npcMove2() {
    var random = Phaser.Math.Between(65, 200);
    this.pnpc2.setVelocityY(0);
    this.pnpc2.setVelocityX(random);
    npcX2 = 1;
    this.time.delayedCall(
      1500,
      function () {
        this.pnpc2.setVelocityX(0);
        this.pnpc2.setVelocityY(random);
        this.time.delayedCall(
          1500,
          function () {
            this.pnpc2.setVelocityY(0);
            this.pnpc2.setVelocityX(-random);
            npcX2 = -1;
            this.time.delayedCall(
              1500,
              function () {
                this.pnpc2.setVelocityX(0);
                this.pnpc2.setVelocityY(-random);
              },
              [],
              this
            );
          },
          [],
          this
        );
      },
      [],
      this
    );
  }
  npcMove3() {
    var random = Phaser.Math.Between(65, 200);
    this.pnpc3.setVelocityY(0);
    this.pnpc3.setVelocityX(random);
    npcX3 = 1;
    this.time.delayedCall(
      6000,
      function () {
        this.pnpc3.setVelocityX(0);
        this.pnpc3.setVelocityY(random);
        this.time.delayedCall(
          6000,
          function () {
            this.pnpc3.setVelocityY(0);
            this.pnpc3.setVelocityX(-random);
            npcX3 = -1;
            this.time.delayedCall(
              6000,
              function () {
                this.pnpc3.setVelocityX(0);
                this.pnpc3.setVelocityY(-random);
              },
              [],
              this
            );
          },
          [],
          this
        );
      },
      [],
      this
    );
  }

  nextScene() {
    this.pnpc.children.getArray().forEach((npc) => {
      npc.disableBody(true, true);
    });
    next = true;
  }
  nextScene2() {
    this.pnpc2.children.getArray().forEach((npc) => {
      npc.disableBody(true, true);
    });
    next = true;
  }
  nextScene3() {
    this.pnpc3.children.getArray().forEach((npc) => {
      npc.disableBody(true, true);
    });
    next = true;
  }

  update() {
    var speed = 260;
    var wDown = this.input.keyboard.addKey("W");
    var sDown = this.input.keyboard.addKey("S");
    var aDown = this.input.keyboard.addKey("A");
    var dDown = this.input.keyboard.addKey("D");
    //npcs' left right animation//
    if (npcX == -1) {
      this.pnpc.children.iterate((npc) => {
        npc.flipX = true;
      });
    } else {
      this.pnpc.children.iterate((npc) => {
        npc.flipX = false;
      });
    }
    if (npcX2 == -1) {
      this.pnpc2.children.iterate((npc) => {
        npc.flipX = true;
      });
    } else {
      this.pnpc2.children.iterate((npc) => {
        npc.flipX = false;
      });
    }
    if (npcX3 == -1) {
      this.pnpc3.children.iterate((npc) => {
        npc.flipX = true;
      });
    } else {
      this.pnpc3.children.iterate((npc) => {
        npc.flipX = false;
      });
    }
    //
    var xmovement = 0;
    var ymovement = 0;
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
    //
    var offsetX = 7;
    var offsetY = 220;
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
    //enter house//
    if (
      this.player.x < 2362 &&
      this.player.x > 2344 &&
      this.player.y < 1825 &&
      this.player.y > 1791
    ) {
      this.door.play();
      console.log("entering house");
      this.scene.stop("city");
      this.player.x = 522;
      this.player.y = 1565;
      this.scene.start("room", { player: this.player, music: this.music });
    }
    //go to next scene (arena)//
    if (next == true) {
      console.log("enter fight");
      next = false;
      this.music.stop();
      this.scene.stop("city");
      //sending data//
      //example//
      // this.scene.start("(next scene)", { (name of data): (name it however var a) });
      this.scene.start("arena", { player: this.player, music: this.music });
    }
  }
}
