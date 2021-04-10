var space = 0;
var npcX = 1;

class intructions extends Phaser.Scene {
  constructor() {
    super({ key: "intructions" });
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
    //Elaine and npc's spritesheets//
    this.load.spritesheet("Elaine", "assets/idle.png", {
      frameWidth: 320,
      frameHeight: 591
    });
    this.load.spritesheet("elaineAttack", "assets/attack.png", {
      frameWidth: 740,
      frameHeight: 1299
    });
    this.load.spritesheet("FPNPC", "assets/F-possessedNPC.png", {
      frameWidth: 359.4,
      frameHeight: 709
    });
    //img preload//
    //intructions//
    this.load.image("1", "assets/Instructions/1-01.png");
    this.load.image("2", "assets/Instructions/dialogue1-01.png");
    this.load.image("3", "assets/Instructions/dialogue2-01.png");
    this.load.image("4", "assets/Instructions/dialogue3-01.png");
    this.load.image("5", "assets/Instructions/dialogue4-01.png");
    //
    //elaine//
    this.load.image("elaineP", "assets/ElaineModel/Elaine.png");
    this.load.image("elaineL", "assets/ElaineModel/ElaineL.png");
    this.load.image("elaineS", "assets/ElaineModel/ElaineS.png");
    this.load.image("elaineSL", "assets/ElaineModel/ElaineSL.png");
    //
    this.load.image("magicCircle", "assets/SSmagicCircle.png");
    this.load.image("pressToContinue", "assets/pressToContinue.png");
    //
    //music//
    this.load.audio('theme', [
      'assets/music/purely-grey-phantasm.mp3'
    ]);
  }

  create() {
    //musics//
    this.music = this.sound.add("theme");
    this.music.play();
    //
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
      key: "fpNPC",
      frames: this.anims.generateFrameNumbers("FPNPC", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    });
    //
    //tilemaps//
    var map = this.make.tilemap({ key: "cityMap" });
    //map variables//
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
    var tilemapX = -1900;
    var tilemapY = -1500;
    var t = true;
    this.terrainLayer = map
      .createLayer("terrain", Terrain, tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.mainTerrainLayer = map
      .createLayer("mainTerrain", MainTerrain)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.mainCollideLayer = map
      .createLayer("mainCollide", MainCollide)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.mainOverlayLayer = map
      .createLayer("mainOverlay", MainOverlay)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.streetLayer = map
      .createLayer("street", Street)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.streetCollideLayer = map
      .createLayer("streetCollide", StreetCollide)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.streetOverlayLayer = map
      .createLayer("streetOverlay", StreetOverlay)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.buildingsLayer = map
      .createLayer("buildings", Buildings)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.mainTreeLayer = map
      .createLayer("mainTree", MainTree)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.mainTreeOverlayLayer = map
      .createLayer("mainTreeOverlay", MainTreeOverlay)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.treeLayer = map
      .createLayer("tree", Tree)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.buildingsOverlayLayer = map
      .createLayer("buildingsOverlay", BuildingsOverlay)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.fenceLayer = map
      .createLayer("fence", Fence)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    this.treeOverlayLayer = map
      .createLayer("treeOverlay", TreeOverlay)
      .setPosition(tilemapX, tilemapY)
      .setScale(mapScale)
      .setVisible(t);
    //
    // this.magiccircle = this.add.image(300, 550, "magicCircle").setScale(0.24).setVisible(false);
    //intructions and tutorials//
    this.instruction5 = this.add.group();
    this.instruction5.create(800, 830, "5").setScale(0.24).setVisible(true);
    //
    this.instruction4 = this.add.group();
    this.instruction4.create(800, 830, "4").setScale(0.24).setVisible(true);
    //
    this.instruction3 = this.add.group();
    this.instruction3.create(800, 830, "3").setScale(0.24).setVisible(true);
    //
    this.instruction2 = this.add.group();
    this.instruction2.create(800, 830, "2").setScale(0.24).setVisible(true);
    //
    this.instruction1 = this.add.group();
    this.instruction1.create(800, 600, "1").setScale(0.24).setVisible(true);
    //characters//
    this.player = this.add
      .sprite(800, 830, "player")
      .setScale(0.2)
      .setVisible(true);
    this.pnpc = this.physics.add
      .sprite(600, 500, "npc")
      .play("fpNPC")
      .setScale(0.2)
      .setVisible(false);
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
        this.npcTrigger();
      },
      this
    );
    enterDown.on(
      "down",
      function () {
        space = 0;
        this.scene.stop("intructions");
        this.scene.start("loading2");
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

  npcMove() {
    this.pnpc.body.setVelocityX(30);
    npcX = 1;
    this.time.delayedCall(
      1000,
      function () {
        this.pnpc.body.setVelocityX(-30);
        npcX = -1;
      },
      [],
      this
    );
  }
  npcTrigger() {
    if (space == 3) {
      this.npcMove();
      this.timedEvent = this.time.addEvent({
        delay: 2000,
        callback: this.npcMove,
        callbackScope: this,
        loop: true
      });
    }
  }

  update() {
    // this.magiccircle.rotation += 0.01;

    //npcs' left right animation//
    if (npcX == -1) {
      this.pnpc.flipX = true;
    } else {
      this.pnpc.flipX = false;
    }

    if (space == 0) {
      this.player.anims.play("attack", true);
    } else if (space == 1) {
      this.elaineL.setVisible(true);
      this.player.setVisible(false);
      this.instruction1.setVisible(false);
    } else if (space == 2) {
      this.elaine.setVisible(true);
      this.elaineL.setVisible(false);
      this.player.setPosition(500, 350);
      this.player.setVisible(true);
      this.player.anims.play("idle", true);
      this.instruction2.setVisible(false);
    } else if (space == 3) {
      this.elaineS.setVisible(true);
      this.elaine.setVisible(false);
      this.instruction3.setVisible(false);
      this.pnpc.setVisible(true);
    } else if (space == 4) {
      this.elaineSL.setVisible(true);
      this.elaineS.setVisible(false);
      this.instruction4.setVisible(false);
    } else if (space == 5) {
      space = 0;
      this.scene.stop("intructions");
      this.scene.start("intructions2");
    }
  }
}