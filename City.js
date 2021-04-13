var npcX = 1;
var npcX2 = 1;
var npcX3 = 1;
var npcXlr = 1;
var npcXlr2 = 1;
var next = false;
var next2 = false;
var next3 = false;
var next4 = false;
var next5 = false;
var next6 = false;
var next7 = false;
var next8 = false;
var next9 = false;
var next10 = false;
var next11 = false;
var next12 = false;
var next13 = false;
var next14 = false;
var next15 = false;
var next16 = false;
var score = 0;

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
    this.enterFight = data.enterFight;
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
    //img//
    this.load.image("elaineP", "assets/ElaineModel/Elaine.png");
    this.load.image("objective", "assets/objective-01.png");
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
    //3 npc in first area//
    this.firstAreaNPC = this.physics.add //move 2
      .sprite(2697, 2103, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.firstAreaNPC2 = this.physics.add //move 1
      .sprite(2487, 3206, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.firstAreaNPC3 = this.physics.add //move 3
      .sprite(2318, 1048, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //4 npc in city area//
    this.cityAreaNPC = this.physics.add //move lr
      .sprite(5546, 553, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.cityAreaNPC2 = this.physics.add //move 2
      .sprite(6754, 2994, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.cityAreaNPC3 = this.physics.add //move lr
      .sprite(8532, 2603, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.cityAreaNPC4 = this.physics.add //move lr
      .sprite(7606, 3761, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //3 npc in the mountain area//
    this.mountainAreaNPC = this.physics.add //move 3
      .sprite(3505, 5999, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.mountainAreaNPC2 = this.physics.add //move 1
      .sprite(4160, 7026, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.mountainAreaNPC3 = this.physics.add //move 2
      .sprite(2174, 7553, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //3 npc in the beach area//
    this.beachAreaNPC = this.physics.add //move 1
      .sprite(7425, 7782, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.beachAreaNPC2 = this.physics.add //move 2
      .sprite(9219, 6504, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.beachAreaNPC3 = this.physics.add //move 3
      .sprite(7221, 6135, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    //3 npc walking on the road//
    this.byTheRoadNPC = this.physics.add
      .sprite(4921, 2606, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.byTheRoadNPC2 = this.physics.add
      .sprite(4891, 4948, "fpNPC")
      .play("fpNPC")
      .setScale(elaineScale)
      .setSize(npcSizeX, npcSizeY)
      .setOffset(npcOffsetX, npcOffsetY);
    this.byTheRoadNPC3 = this.physics.add
      .sprite(5395, 5256, "fpNPC")
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
    this.npcMoveLeftRight();
    this.timedEvent = this.time.addEvent({
      delay: 7000,
      callback: this.npcMoveLeftRight,
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
    this.firstAreaNPC.setCollideWorldBounds(true);
    this.firstAreaNPC2.setCollideWorldBounds(true);
    this.firstAreaNPC3.setCollideWorldBounds(true);
    this.cityAreaNPC.setCollideWorldBounds(true);
    this.cityAreaNPC2.setCollideWorldBounds(true);
    this.cityAreaNPC3.setCollideWorldBounds(true);
    this.cityAreaNPC4.setCollideWorldBounds(true);
    this.mountainAreaNPC.setCollideWorldBounds(true);
    this.mountainAreaNPC2.setCollideWorldBounds(true);
    this.mountainAreaNPC3.setCollideWorldBounds(true);
    this.beachAreaNPC.setCollideWorldBounds(true);
    this.beachAreaNPC2.setCollideWorldBounds(true);
    this.beachAreaNPC3.setCollideWorldBounds(true);
    this.byTheRoadNPC.setCollideWorldBounds(true);
    this.byTheRoadNPC2.setCollideWorldBounds(true);
    this.byTheRoadNPC3.setCollideWorldBounds(true);
    //
    this.physics.add.collider(this.mainCollideLayer, this.firstAreaNPC);
    this.physics.add.collider(this.streetCollideLayer, this.firstAreaNPC);
    this.physics.add.collider(this.buildingsLayer, this.firstAreaNPC);
    this.physics.add.collider(this.mainTreeLayer, this.firstAreaNPC);
    this.physics.add.collider(this.treeLayer, this.firstAreaNPC);
    this.physics.add.collider(this.fenceLayer, this.firstAreaNPC);
    this.physics.add.collider(this.mainCollideLayer, this.firstAreaNPC2);
    this.physics.add.collider(this.streetCollideLayer, this.firstAreaNPC2);
    this.physics.add.collider(this.buildingsLayer, this.firstAreaNPC2);
    this.physics.add.collider(this.mainTreeLayer, this.firstAreaNPC2);
    this.physics.add.collider(this.treeLayer, this.firstAreaNPC2);
    this.physics.add.collider(this.fenceLayer, this.firstAreaNPC2);
    this.physics.add.collider(this.mainCollideLayer, this.firstAreaNPC3);
    this.physics.add.collider(this.streetCollideLayer, this.firstAreaNPC3);
    this.physics.add.collider(this.buildingsLayer, this.firstAreaNPC3);
    this.physics.add.collider(this.mainTreeLayer, this.firstAreaNPC3);
    this.physics.add.collider(this.treeLayer, this.firstAreaNPC3);
    this.physics.add.collider(this.fenceLayer, this.firstAreaNPC3);
    //
    this.physics.add.collider(this.mainCollideLayer, this.cityAreaNPC);
    this.physics.add.collider(this.streetCollideLayer, this.cityAreaNPC);
    this.physics.add.collider(this.buildingsLayer, this.cityAreaNPC);
    this.physics.add.collider(this.mainTreeLayer, this.cityAreaNPC);
    this.physics.add.collider(this.treeLayer, this.cityAreaNPC);
    this.physics.add.collider(this.fenceLayer, this.cityAreaNPC);
    this.physics.add.collider(this.mainCollideLayer, this.cityAreaNPC2);
    this.physics.add.collider(this.streetCollideLayer, this.cityAreaNPC2);
    this.physics.add.collider(this.buildingsLayer, this.cityAreaNPC2);
    this.physics.add.collider(this.mainTreeLayer, this.cityAreaNPC2);
    this.physics.add.collider(this.treeLayer, this.cityAreaNPC2);
    this.physics.add.collider(this.fenceLayer, this.cityAreaNPC2);
    this.physics.add.collider(this.mainCollideLayer, this.cityAreaNPC3);
    this.physics.add.collider(this.streetCollideLayer, this.cityAreaNPC3);
    this.physics.add.collider(this.buildingsLayer, this.cityAreaNPC3);
    this.physics.add.collider(this.mainTreeLayer, this.cityAreaNPC3);
    this.physics.add.collider(this.treeLayer, this.cityAreaNPC3);
    this.physics.add.collider(this.fenceLayer, this.cityAreaNPC3);
    this.physics.add.collider(this.mainCollideLayer, this.cityAreaNPC4);
    this.physics.add.collider(this.streetCollideLayer, this.cityAreaNPC4);
    this.physics.add.collider(this.buildingsLayer, this.cityAreaNPC4);
    this.physics.add.collider(this.mainTreeLayer, this.cityAreaNPC4);
    this.physics.add.collider(this.treeLayer, this.cityAreaNPC4);
    this.physics.add.collider(this.fenceLayer, this.cityAreaNPC4);
    //
    this.physics.add.collider(this.mainCollideLayer, this.mountainAreaNPC);
    this.physics.add.collider(this.streetCollideLayer, this.mountainAreaNPC);
    this.physics.add.collider(this.buildingsLayer, this.mountainAreaNPC);
    this.physics.add.collider(this.mainTreeLayer, this.mountainAreaNPC);
    this.physics.add.collider(this.treeLayer, this.mountainAreaNPC);
    this.physics.add.collider(this.fenceLayer, this.mountainAreaNPC);
    this.physics.add.collider(this.mainCollideLayer, this.mountainAreaNPC2);
    this.physics.add.collider(this.streetCollideLayer, this.mountainAreaNPC2);
    this.physics.add.collider(this.buildingsLayer, this.mountainAreaNPC2);
    this.physics.add.collider(this.mainTreeLayer, this.mountainAreaNPC2);
    this.physics.add.collider(this.treeLayer, this.mountainAreaNPC2);
    this.physics.add.collider(this.fenceLayer, this.mountainAreaNPC2);
    this.physics.add.collider(this.mainCollideLayer, this.mountainAreaNPC3);
    this.physics.add.collider(this.streetCollideLayer, this.mountainAreaNPC3);
    this.physics.add.collider(this.buildingsLayer, this.mountainAreaNPC3);
    this.physics.add.collider(this.mainTreeLayer, this.mountainAreaNPC3);
    this.physics.add.collider(this.treeLayer, this.mountainAreaNPC3);
    this.physics.add.collider(this.fenceLayer, this.mountainAreaNPC3);
    //
    this.physics.add.collider(this.mainCollideLayer, this.beachAreaNPC);
    this.physics.add.collider(this.streetCollideLayer, this.beachAreaNPC);
    this.physics.add.collider(this.buildingsLayer, this.beachAreaNPC);
    this.physics.add.collider(this.mainTreeLayer, this.beachAreaNPC);
    this.physics.add.collider(this.treeLayer, this.beachAreaNPC);
    this.physics.add.collider(this.fenceLayer, this.beachAreaNPC);
    this.physics.add.collider(this.mainCollideLayer, this.beachAreaNPC2);
    this.physics.add.collider(this.streetCollideLayer, this.beachAreaNPC2);
    this.physics.add.collider(this.buildingsLayer, this.beachAreaNPC2);
    this.physics.add.collider(this.mainTreeLayer, this.beachAreaNPC2);
    this.physics.add.collider(this.treeLayer, this.beachAreaNPC2);
    this.physics.add.collider(this.fenceLayer, this.beachAreaNPC2);
    this.physics.add.collider(this.mainCollideLayer, this.beachAreaNPC3);
    this.physics.add.collider(this.streetCollideLayer, this.beachAreaNPC3);
    this.physics.add.collider(this.buildingsLayer, this.beachAreaNPC3);
    this.physics.add.collider(this.mainTreeLayer, this.beachAreaNPC3);
    this.physics.add.collider(this.treeLayer, this.beachAreaNPC3);
    this.physics.add.collider(this.fenceLayer, this.beachAreaNPC3);
    //
    this.physics.add.collider(this.mainCollideLayer, this.byTheRoadNPC);
    this.physics.add.collider(this.streetCollideLayer, this.byTheRoadNPC);
    this.physics.add.collider(this.buildingsLayer, this.byTheRoadNPC);
    this.physics.add.collider(this.mainTreeLayer, this.byTheRoadNPC);
    this.physics.add.collider(this.treeLayer, this.byTheRoadNPC);
    this.physics.add.collider(this.fenceLayer, this.byTheRoadNPC);
    this.physics.add.collider(this.mainCollideLayer, this.byTheRoadNPC2);
    this.physics.add.collider(this.streetCollideLayer, this.byTheRoadNPC2);
    this.physics.add.collider(this.buildingsLayer, this.byTheRoadNPC2);
    this.physics.add.collider(this.mainTreeLayer, this.byTheRoadNPC2);
    this.physics.add.collider(this.treeLayer, this.byTheRoadNPC2);
    this.physics.add.collider(this.fenceLayer, this.byTheRoadNPC2);
    this.physics.add.collider(this.mainCollideLayer, this.byTheRoadNPC3);
    this.physics.add.collider(this.streetCollideLayer, this.byTheRoadNPC3);
    this.physics.add.collider(this.buildingsLayer, this.byTheRoadNPC3);
    this.physics.add.collider(this.mainTreeLayer, this.byTheRoadNPC3);
    this.physics.add.collider(this.treeLayer, this.byTheRoadNPC3);
    this.physics.add.collider(this.fenceLayer, this.byTheRoadNPC3);
    //
    //call function on overlap//
    this.physics.add.overlap(
      this.player,
      this.firstAreaNPC,
      this.nextScene,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.firstAreaNPC2,
      this.nextScene2,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.firstAreaNPC3,
      this.nextScene3,
      null,
      this
    );
    //
    this.physics.add.overlap(
      this.player,
      this.cityAreaNPC,
      this.nextScene4,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.cityAreaNPC2,
      this.nextScene5,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.cityAreaNPC3,
      this.nextScene6,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.cityAreaNPC4,
      this.nextScene7,
      null,
      this
    );
    //
    this.physics.add.overlap(
      this.player,
      this.mountainAreaNPC,
      this.nextScene8,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.mountainAreaNPC2,
      this.nextScene9,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.mountainAreaNPC3,
      this.nextScene10,
      null,
      this
    );
    //
    this.physics.add.overlap(
      this.player,
      this.beachAreaNPC,
      this.nextScene11,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.beachAreaNPC2,
      this.nextScene12,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.beachAreaNPC3,
      this.nextScene13,
      null,
      this
    );
    //
    this.physics.add.overlap(
      this.player,
      this.byTheRoadNPC,
      this.nextScene14,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.byTheRoadNPC2,
      this.nextScene15,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.byTheRoadNPC3,
      this.nextScene16,
      null,
      this
    );
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
    // var spaceDown = this.input.keyboard.addKey("SPACE");
    // spaceDown.on(
    //   "down",
    //   function () {
    //     score = 15;
    //     console.log(this.player.x, this.player.y);
    //     console.log("Spacebar pressed, goto gameScene");
    //     this.scene.stop("city");
    //     this.scene.start("arena");
    //   },
    //   this
    // );
    //elaine model and objective preview//
    this.add.image(410, 1000, "objective").setScale(0.24).setScrollFactor(0);
    this.add.image(100, 1300, "elaineP").setScale(0.5).setScrollFactor(0);
    //objective//
    this.add
      .text(410, 1000, score + " / 16", {
        font: "65px Courier",
        fill: "#FFFFFF"
      })
      .setOrigin(0.5)
      .setScrollFactor(0);
  }

  npcMove() {
    var random = Phaser.Math.Between(65, 200);
    this.firstAreaNPC2.setVelocityY(0);
    this.mountainAreaNPC2.setVelocityY(0);
    this.beachAreaNPC.setVelocityY(0);
    this.firstAreaNPC2.setVelocityX(random);
    this.mountainAreaNPC2.setVelocityX(random);
    this.beachAreaNPC.setVelocityX(random);
    npcX = 1;
    this.time.delayedCall(
      3000,
      function () {
        this.firstAreaNPC2.setVelocityX(0);
        this.mountainAreaNPC2.setVelocityX(0);
        this.beachAreaNPC.setVelocityX(0);
        this.firstAreaNPC2.setVelocityY(random);
        this.mountainAreaNPC2.setVelocityY(random);
        this.beachAreaNPC.setVelocityY(random);
        this.time.delayedCall(
          3000,
          function () {
            this.firstAreaNPC2.setVelocityY(0);
            this.mountainAreaNPC2.setVelocityY(0);
            this.beachAreaNPC.setVelocityY(0);
            this.firstAreaNPC2.setVelocityX(-random);
            this.mountainAreaNPC2.setVelocityX(-random);
            this.beachAreaNPC.setVelocityX(-random);
            npcX = -1;
            this.time.delayedCall(
              3000,
              function () {
                this.firstAreaNPC2.setVelocityX(0);
                this.mountainAreaNPC2.setVelocityX(0);
                this.beachAreaNPC.setVelocityX(0);
                this.firstAreaNPC2.setVelocityY(-random);
                this.mountainAreaNPC2.setVelocityY(-random);
                this.beachAreaNPC.setVelocityY(-random);
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
    this.firstAreaNPC.setVelocityY(0);
    this.mountainAreaNPC3.setVelocityY(0);
    this.cityAreaNPC2.setVelocityY(0);
    this.beachAreaNPC2.setVelocityY(0);
    this.firstAreaNPC.setVelocityX(random);
    this.mountainAreaNPC3.setVelocityX(random);
    this.cityAreaNPC2.setVelocityX(random);
    this.beachAreaNPC2.setVelocityX(random);
    npcX2 = 1;
    this.time.delayedCall(
      1500,
      function () {
        this.firstAreaNPC.setVelocityX(0);
        this.mountainAreaNPC3.setVelocityX(0);
        this.cityAreaNPC2.setVelocityX(0);
        this.beachAreaNPC2.setVelocityX(0);
        this.firstAreaNPC.setVelocityY(random);
        this.mountainAreaNPC3.setVelocityY(random);
        this.cityAreaNPC2.setVelocityY(random);
        this.beachAreaNPC2.setVelocityY(random);
        this.time.delayedCall(
          1500,
          function () {
            this.firstAreaNPC.setVelocityY(0);
            this.mountainAreaNPC3.setVelocityY(0);
            this.cityAreaNPC2.setVelocityY(0);
            this.beachAreaNPC2.setVelocityY(0);
            this.firstAreaNPC.setVelocityX(-random);
            this.mountainAreaNPC3.setVelocityX(-random);
            this.cityAreaNPC2.setVelocityX(-random);
            this.beachAreaNPC2.setVelocityX(-random);
            npcX2 = -1;
            this.time.delayedCall(
              1500,
              function () {
                this.firstAreaNPC.setVelocityX(0);
                this.mountainAreaNPC3.setVelocityX(0);
                this.cityAreaNPC2.setVelocityX(0);
                this.beachAreaNPC2.setVelocityX(0);
                this.firstAreaNPC.setVelocityY(-random);
                this.mountainAreaNPC3.setVelocityY(-random);
                this.cityAreaNPC2.setVelocityY(-random);
                this.beachAreaNPC2.setVelocityY(-random);
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
    this.mountainAreaNPC.setVelocityY(0);
    this.firstAreaNPC3.setVelocityY(0);
    this.beachAreaNPC3.setVelocityY(0);
    this.mountainAreaNPC.setVelocityX(random);
    this.firstAreaNPC3.setVelocityX(random);
    this.beachAreaNPC3.setVelocityX(random);
    npcX3 = 1;
    this.time.delayedCall(
      6000,
      function () {
        this.mountainAreaNPC.setVelocityX(0);
        this.firstAreaNPC3.setVelocityX(0);
        this.beachAreaNPC3.setVelocityX(0);
        this.mountainAreaNPC.setVelocityY(random);
        this.firstAreaNPC3.setVelocityY(random);
        this.beachAreaNPC3.setVelocityY(random);
        this.time.delayedCall(
          6000,
          function () {
            this.mountainAreaNPC.setVelocityY(0);
            this.firstAreaNPC3.setVelocityY(0);
            this.beachAreaNPC3.setVelocityY(0);
            this.mountainAreaNPC.setVelocityX(-random);
            this.firstAreaNPC3.setVelocityX(-random);
            this.beachAreaNPC3.setVelocityX(-random);
            npcX3 = -1;
            this.time.delayedCall(
              6000,
              function () {
                this.mountainAreaNPC.setVelocityX(0);
                this.firstAreaNPC3.setVelocityX(0);
                this.beachAreaNPC3.setVelocityX(0);
                this.mountainAreaNPC.setVelocityY(-random);
                this.firstAreaNPC3.setVelocityY(-random);
                this.beachAreaNPC3.setVelocityY(-random);
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
  npcMoveLeftRight() {
    this.byTheRoadNPC.setVelocityX(120);
    this.byTheRoadNPC2.setVelocityX(120);
    this.byTheRoadNPC3.setVelocityX(-120);
    this.cityAreaNPC.setVelocityX(200);
    this.cityAreaNPC3.setVelocityX(-200);
    this.cityAreaNPC4.setVelocityX(200);
    npcXlr = 1;
    this.time.delayedCall(
      3500,
      function () {
        this.byTheRoadNPC.setVelocityX(-120);
        this.byTheRoadNPC2.setVelocityX(-120);
        this.byTheRoadNPC3.setVelocityX(120);
        this.cityAreaNPC.setVelocityX(-200);
        this.cityAreaNPC3.setVelocityX(200);
        this.cityAreaNPC4.setVelocityX(-200);
        npcXlr = -1;
      },
      [],
      this
    );
  }

  nextScene() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    //sending data//
    //example//
    // this.scene.start("(next scene)", {
    //   (name of data): (name it however var a)
    // });
    this.scene.start("arena", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next = true;
    score = score + 1;
  }
  nextScene2() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena2", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next2 = true;
    score = score + 1;
  }
  nextScene3() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena3", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next3 = true;
    score = score + 1;
  }
  nextScene4() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next4 = true;
    score = score + 1;
  }
  nextScene5() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena2", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next5 = true;
    score = score + 1;
  }
  nextScene6() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena3", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next6 = true;
    score = score + 1;
  }
  nextScene7() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next7 = true;
    score = score + 1;
  }
  nextScene8() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena2", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next8 = true;
    score = score + 1;
  }
  nextScene9() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena3", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next9 = true;
    score = score + 1;
  }
  nextScene10() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next10 = true;
    score = score + 1;
  }
  nextScene11() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena2", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next11 = true;
    score = score + 1;
  }
  nextScene12() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena3", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next12 = true;
    score = score + 1;
  }
  nextScene13() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next13 = true;
    score = score + 1;
  }
  nextScene14() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena2", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next14 = true;
    score = score + 1;
  }
  nextScene15() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena3", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next15 = true;
    score = score + 1;
  }
  nextScene16() {
    console.log("enter fight");
    this.enterFight = true;
    this.music.stop();
    this.scene.stop("city");
    this.scene.start("arena", {
      player: this.player,
      music: this.music,
      enterFight: this.enterFight
    });
    next16 = true;
    score = score + 1;
  }

  update() {
    var speed = 260;
    var wDown = this.input.keyboard.addKey("W");
    var sDown = this.input.keyboard.addKey("S");
    var aDown = this.input.keyboard.addKey("A");
    var dDown = this.input.keyboard.addKey("D");
    //npcs' left right animation//
    if (npcX == -1) {
      this.firstAreaNPC2.flipX = true;
      this.mountainAreaNPC2.flipX = true;
      this.beachAreaNPC.flipX = true;
    } else {
      this.firstAreaNPC2.flipX = false;
      this.mountainAreaNPC2.flipX = false;
      this.beachAreaNPC.flipX = false;
    }
    if (npcX2 == -1) {
      this.firstAreaNPC.flipX = true;
      this.mountainAreaNPC3.flipX = true;
      this.cityAreaNPC2.flipX = true;
      this.beachAreaNPC2.flipX = true;
    } else {
      this.firstAreaNPC.flipX = false;
      this.mountainAreaNPC3.flipX = false;
      this.cityAreaNPC2.flipX = false;
      this.beachAreaNPC2.flipX = false;
    }
    if (npcX3 == -1) {
      this.mountainAreaNPC.flipX = true;
      this.firstAreaNPC3.flipX = true;
      this.beachAreaNPC3.flipX = true;
    } else {
      this.mountainAreaNPC.flipX = false;
      this.firstAreaNPC3.flipX = false;
      this.beachAreaNPC3.flipX = false;
    }
    if (npcXlr == -1) {
      this.byTheRoadNPC.flipX = true;
      this.byTheRoadNPC2.flipX = true;
      this.byTheRoadNPC3.flipX = false;
      this.cityAreaNPC.flipX = true;
      this.cityAreaNPC3.flipX = false;
      this.cityAreaNPC4.flipX = true;
    } else {
      this.byTheRoadNPC.flipX = false;
      this.byTheRoadNPC2.flipX = false;
      this.byTheRoadNPC3.flipX = true;
      this.cityAreaNPC.flipX = false;
      this.cityAreaNPC3.flipX = true;
      this.cityAreaNPC4.flipX = false;
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
    //game complete//
    if (score == 16 && this.enterFight == false) {
      this.music.stop();
      this.scene.stop("city");
      this.scene.start("gameOverScene");
    }
    //disable npc's body//
    if (next == true) {
      this.firstAreaNPC.disableBody(true, true);
    }
    if (next2 == true) {
      this.firstAreaNPC2.disableBody(true, true);
    }
    if (next3 == true) {
      this.firstAreaNPC3.disableBody(true, true);
    }
    if (next4 == true) {
      this.cityAreaNPC.disableBody(true, true);
    }
    if (next5 == true) {
      this.cityAreaNPC2.disableBody(true, true);
    }
    if (next6 == true) {
      this.cityAreaNPC3.disableBody(true, true);
    }
    if (next7 == true) {
      this.cityAreaNPC4.disableBody(true, true);
    }
    if (next8 == true) {
      this.mountainAreaNPC.disableBody(true, true);
    }
    if (next9 == true) {
      this.mountainAreaNPC2.disableBody(true, true);
    }
    if (next10 == true) {
      this.mountainAreaNPC3.disableBody(true, true);
    }
    if (next11 == true) {
      this.beachAreaNPC.disableBody(true, true);
    }
    if (next12 == true) {
      this.beachAreaNPC2.disableBody(true, true);
    }
    if (next13 == true) {
      this.beachAreaNPC3.disableBody(true, true);
    }
    if (next14 == true) {
      this.byTheRoadNPC.disableBody(true, true);
    }
    if (next15 == true) {
      this.byTheRoadNPC2.disableBody(true, true);
    }
    if (next16 == true) {
      this.byTheRoadNPC3.disableBody(true, true);
    }
  }
}