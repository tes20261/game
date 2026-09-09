import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    // lights
    this.lights.enable().setAmbientColor(0x666666);

    // audio
    this.owlSound = this.sound.add("owl");
    this.cemeterySound = this.sound
      .add("cemetery")
      .play({ loop: true, volume: 0.5 });

    this.ownSoundLoop = this.time.addEvent({
      delay: Math.floor(Math.random() * 10000) + 5000,
      callback: () => {
        this.owlSound.play();
        console.log("Owl sound played", this.ownSoundLoop.delay);
      },
      loop: true,
    });

    // map
    this.tilemap = this.make.tilemap({ key: "map" });

    // tilesets
    this.tilesetGrass = this.tilemap.addTilesetImage("grass");
    this.tilesetShadows = this.tilemap.addTilesetImage("shadows");
    this.tilesetItems = this.tilemap.addTilesetImage("items");

    // layers
    this.layerFloor = this.tilemap
      .createLayer("floor", [this.tilesetGrass])
      .setLighting(true);
    this.layerShadows = this.tilemap
      .createLayer("shadows", [this.tilesetShadows])
      .setLighting(true);
    this.layerObjects = this.tilemap
      .createLayer("objects", [this.tilesetItems])
      .setLighting(true);

    this.tobias = this.physics.add
      .sprite(300, 225, "tobias", 14)
      .setLighting(true);
    
    this.cameras.main.startFollow(this.tobias);

    this.anims.create({
      key: "tobias-stopped-up",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 28,
        end: 28,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-stopped-down",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 14,
        end: 14,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-stopped-left",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 36,
        end: 36,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-stopped-right",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 52,
        end: 52,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-digging-up",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 28,
        end: 35,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-digging-down",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 44,
        end: 51,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-digging-left",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 36,
        end: 43,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-digging-right",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 52,
        end: 59,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-walking-up",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 60,
        end: 68,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-walking-down",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 78,
        end: 86,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-walking-left",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 69,
        end: 77,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-walking-right",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 87,
        end: 95,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-running-up",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 236,
        end: 243,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-running-down",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 252,
        end: 259,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-running-left",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 244,
        end: 251,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-running-right",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 260,
        end: 267,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.lola = this.physics.add.sprite(500, 225, "lola", 14).setLighting(true);

    this.joystick = this.plugins.get("rexVirtualJoystick").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(120, 360, 50, 0x888888),
      thumb: this.add.circle(120, 360, 25, 0xcccccc),
    });

    this.joystick.on("update", () => {
      const cursorKeys = this.joystick.createCursorKeys();

      switch (true) {
        case this.joystick.force > 25:
          this.tobias.animation = "running";
          this.tobias.velocity = 200;
          break;
        case this.joystick.force > 0:
          this.tobias.animation = "walking";
          this.tobias.velocity = 100;
          break;
        default:
          this.tobias.animation = "stopped";
          this.tobias.setVelocity(0, 0);
      }

      if (cursorKeys.up.isDown) {
        this.tobias.orientation = "up";
        this.tobias.setVelocityY(-this.tobias.velocity);
      }
      if (cursorKeys.down.isDown) {
        this.tobias.orientation = "down";
        this.tobias.setVelocityY(this.tobias.velocity);
      }
      if (cursorKeys.left.isDown) {
        this.tobias.orientation = "left";
        this.tobias.setVelocityX(-this.tobias.velocity);
      }
      if (cursorKeys.right.isDown) {
        this.tobias.orientation = "right";
        this.tobias.setVelocityX(this.tobias.velocity);
      }

      this.tobias.anims.play(
        `tobias-${this.tobias.animation}-${this.tobias.orientation}`,
        true,
      );
    });

    this.layerObjects.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.tobias, this.layerObjects);

    this.physics.add.collider(this.tobias, this.lola, () => {
      this.scene.stop();
      this.cemeterySound.stop();
      this.scene.start("GameOver");
    });
  }
}
