import { Scene } from "phaser";

export class Game extends Scene {
  music: Phaser.Sound.BaseSound;
  laserSound: Phaser.Sound.BaseSound;

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
    | Phaser.Tilemaps.TilemapGPULayer;
  // layerCharacter:
  //   | Phaser.Tilemaps.TilemapLayer
  //   | Phaser.Tilemaps.TilemapGPULayer;
  // layerEnemy: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerPlatform: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
  layerShelf: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;

  player: Phaser.Physics.Arcade.Sprite;
  android: Phaser.Physics.Arcade.Sprite;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  create() {
    // Music
    this.music = this.sound.add("music", { loop: true });
    this.music.play();
    this.laserSound = this.sound.add("laser");

    // Tilemap
    this.tilemap = this.make.tilemap({ key: "map" });

    // Tilesets
    this.tilesetTileset = this.tilemap.addTilesetImage("tileset");
    this.tilesetObjects = this.tilemap.addTilesetImage("objects");
    /*
    this.tilesetTurret = this.tilemap.addTilesetImage("turret");
    this.tilesetCharacter = this.tilemap.addTilesetImage("character");
    this.tilesetAndroid = this.tilemap.addTilesetImage("android");
    */

    // Layers
    this.layerBackground = this.tilemap.createLayer("background", [
      this.tilesetTileset,
    ]);
    this.layerGround = this.tilemap.createLayer("ground", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerRoof = this.tilemap.createLayer("roof", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerWalls = this.tilemap.createLayer("walls", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerWallsUnder = this.tilemap.createLayer("walls_under", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerWallsOver = this.tilemap.createLayer("walls_over", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerLamps = this.tilemap.createLayer("lamps", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerWindows = this.tilemap.createLayer("windows", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerObjects = this.tilemap.createLayer("objects", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerTeletransport = this.tilemap.createLayer("teletransport", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    /*
    this.layerCharacter = this.tilemap.createLayer("character", [
      this.tilesetCharacter,
    ]);
    this.layerEnemy = this.tilemap.createLayer("enemy", [this.tilesetAndroid]);
    */
    this.layerPlatform = this.tilemap.createLayer("platform", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);
    this.layerShelf = this.tilemap.createLayer("shelf", [
      this.tilesetTileset,
      this.tilesetObjects,
    ]);

    // Player
    // this.player = this.physics.add.sprite(100, 656, "character", 0);
    this.player = this.physics.add.sprite(100, 300, "character", 0);

    // Player animations
    this.anims.create({
      key: "player-standing-still",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "player-running",
      frames: this.anims.generateFrameNumbers("character", {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-jumping",
      frames: this.anims.generateFrameNumbers("character", {
        start: 40,
        end: 47,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Android
    this.android = this.physics.add.sprite(200, 320, "android", 0);

    // Android animations
    this.anims.create({
      key: "android-standing-still",
      frames: this.anims.generateFrameNumbers("android", {
        start: 7,
        end: 10,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "android-walking",
      frames: this.anims.generateFrameNumbers("android", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "android-shooting",
      frames: this.anims.generateFrameNumbers("android", {
        start: 14,
        end: 19,
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
    this.physics.add.collider(this.android, this.layerGround);

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

    this.layerPlatform.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerPlatform);
    this.layerPlatform.forEachTile((tile) => {
      if (tile.properties.collides) {
        // left, right, up, down
        tile.setCollision(false, false, true, false);
      }
    });
  }

  update() {
    // Player movement
    if (this.cursors.left.isDown) {
      this.player.flipX = true;
      this.player.setVelocityX(-200);
      if (this.player.body.blocked.down)
        this.player.anims.play("player-running", true);
    } else if (this.cursors.right.isDown) {
      this.player.flipX = false;
      this.player.setVelocityX(200);
      if (this.player.body.blocked.down)
        this.player.anims.play("player-running", true);
    } else this.player.setVelocityX(0);

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-150);
      this.player.anims.play("player-jumping", true);
    }

    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0)
      this.player.anims.play("player-standing-still", true);

    // Android movement
    if (this.android.y === this.player.y) {
      this.android.setVelocityX(0);
      this.android.anims.play("android-shooting", true);
      /*
      this.android.once("animationcomplete", () => {
        console.log(this.android.anims.currentAnim.key);
        this.laserSound.play();
        console.log("shooting");
      });
      */
    } else if (this.player.x - this.android.x > 32) {
      this.android.flipX = false;
      this.android.setVelocityX(50);
      this.android.anims.play("android-walking", true);
    } else if (this.android.x - this.player.x > 32) {
      this.android.flipX = true;
      this.android.setVelocityX(-50);
      this.android.anims.play("android-walking", true);
    } else {
      this.android.setVelocityX(0);
      this.android.anims.play("android-standing-still", true);
    }
  }
}
