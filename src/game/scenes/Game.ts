import { Scene } from "phaser";

export class Game extends Scene {
  tilemap: Phaser.Tilemaps.Tilemap;

  tilesetTileset: Phaser.Tilemaps.Tileset;
  tilesetObjects: Phaser.Tilemaps.Tileset;
  tilesetTurret: Phaser.Tilemaps.Tileset;
  tilesetCharacter: Phaser.Tilemaps.Tileset;
  tilesetAndroid: Phaser.Tilemaps.Tileset;

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
    | Phaser.Tilemaps.TilemapGPULayer;
  layerCharacter:
    | Phaser.Tilemaps.TilemapLayer
    | Phaser.Tilemaps.TilemapGPULayer;
  layerEnemy: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerPlatform: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerShelf: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;

  character: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("Game");
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "map" });

    this.tilesetTileset = this.tilemap.addTilesetImage("tileset");
    this.tilesetObjects = this.tilemap.addTilesetImage("objects");
    this.tilesetTurret = this.tilemap.addTilesetImage("turret");
    this.tilesetCharacter = this.tilemap.addTilesetImage("character");
    this.tilesetAndroid = this.tilemap.addTilesetImage("android");

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

    this.character = this.physics.add.sprite(100, 600, "character", 0);
    this.cameras.main.startFollow(this.character);

    this.layerGround.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerGround);

    this.layerRoof.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerRoof);
    
    this.layerWalls.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerWalls);
    
    this.layerWallsUnder.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerWallsUnder);
    
    this.layerWallsOver.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerWallsOver);
    
    this.layerLamps.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerLamps);
  }
}
