import { Scene } from "phaser";

export class Game extends Scene {
  tilemap: Phaser.Tilemaps.Tilemap;
  

  tilesetTileset: Phaser.Tilemaps.Tileset;
  tilesetObjects: Phaser.Tilemaps.Tileset;
  tilesetTurret: Phaser.Tilemaps.Tileset;
  // tilesetCharacter: Phaser.Tilemaps.Tileset;
  // tilesetAndroid: Phaser.Tilemaps.Tileset;

  layerBackground:
    | Phaser.Tilemaps.TilemapLayer
    | Phaser.Tilemaps.TilemapGPULayer;
  layerGround: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerRoof: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerWalls: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerWallsUnder:
    | Phaser.Tilemaps.TilemapLayer
    | Phaser.Tilemaps.TilemapGPULayer;
  layerWallsOver:
    | Phaser.Tilemaps.TilemapLayer
    | Phaser.Tilemaps.TilemapGPULayer;
  layerLamps: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerWindows: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerObjects: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerTeletransport:
    | Phaser.Tilemaps.TilemapLayer
    | Phaser.Tilemaps.TilemapGPULayer
  // layerCharacter:
  //   | Phaser.Tilemaps.TilemapLayer
  //   | Phaser.Tilemaps.TilemapGPULayer;
  // layerEnemy: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerPlatform: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerShelf: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;

  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  create() {
    // Tilemap
    this.tilemap = this.make.tilemap({ key: "map" });

    // Tilesets
    this.tilesetTileset = this.tilemap.addTilesetImage("tileset");
    this.tilesetObjects = this.tilemap.addTilesetImage("objects");
    this.tilesetTurret = this.tilemap.addTilesetImage("turret");
    // this.tilesetCharacter = this.tilemap.addTilesetImage("character");
    // this.tilesetAndroid = this.tilemap.addTilesetImage("android");

    // Layers
    this.layerBackground = this.tilemap.createLayer("background", [
      this.tilesetTileset,
    ]);
    this.layerGround = this.tilemap.createLayer("ground", [
      this.tilesetTileset,
    ]);
    this.layerRoof = this.tilemap.createLayer("roof", [this.tilesetTileset]);
    this.layerWalls = this.tilemap.createLayer("walls", [this.tilesetTileset]);
    this.layerWallsUnder = this.tilemap.createLayer("walls_under", [
      this.tilesetTileset,
    ]);
    this.layerWallsOver = this.tilemap.createLayer("walls_over", [
      this.tilesetTileset,
    ]);
    this.layerLamps = this.tilemap.createLayer("lamps", [this.tilesetTileset]);
    this.layerWindows = this.tilemap.createLayer("windows", [
      this.tilesetTileset,
    ]);
    this.layerObjects = this.tilemap.createLayer("objects", [
      this.tilesetTileset,
    ]);
    this.layerTeletransport = this.tilemap.createLayer("teletransport", [
      this.tilesetTileset,
    ]);
    // this.layerCharacter = this.tilemap.createLayer("character", [
    //   this.tilesetCharacter,
    // ]);
    // this.layerEnemy = this.tilemap.createLayer("enemy", [this.tilesetAndroid]);
    this.layerPlatform = this.tilemap.createLayer("platform", [
      this.tilesetTileset,
    ]);
    this.layerShelf = this.tilemap.createLayer("shelf", [this.tilesetTileset]);

    // Player
    this.player = this.physics.add.sprite(100, 600, "character", 0);

    // Animations
    this.anims.create({
      key: "standing-still",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("character", {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("character", {
        start: 40,
        end: 47,
      }),
      frameRate: 10,
    });

    // Cameras
    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.player);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Collisions
    this.player.setCollideWorldBounds(true);

    this.layerGround.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerGround);

    this.layerRoof.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerRoof);

    this.layerWalls.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerWalls);

    this.layerWallsUnder.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerWallsUnder);

    this.layerWallsOver.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerWallsOver);

    this.layerLamps.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerLamps);
  }

  update() {
    // Player movement
    if (this.player.body.blocked.down) {
      if (this.cursors.left.isDown) {
        this.player.flipX = true;
        this.player.setVelocityX(-200);
        this.player.anims.play("running", true);
      } else if (this.cursors.right.isDown) {
        this.player.flipX = false;
        this.player.setVelocityX(200);
        this.player.anims.play("running", true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("standing-still", true);
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
        this.player.anims.play("jumping", true);
      }
    }
  }
}
