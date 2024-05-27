 import Phaser from 'phaser';
 import MainScene from './MainScene.js';

 const config = {
     type: Phaser.AUTO,
     width: 800,
     height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: false
          }
      },
      scene: [MainScene]
 };

var game =  new Phaser.Game(800,700, Phaser.AUTO);


 class MainScene extends Phaser.Scene {
     constructor() {
         super('MainScene');
     }

     preload() {
         this.load.image('background', 'assetsbackground.jpg');
         this.load.image('platform', 'assetsplatform.png');
     }

     create() {
         this.add.image(400, 300, 'background');

         this.platforms = this.createPlatforms();
         this.player = this.createPlayer();

         this.cursors = this.input.keyboard.createCursorKeys();
         this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
         this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
         this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
     }

     update() {
         this.handlePlayerMovement();
     }

     createPlatforms() {
         const platforms = this.physics.add.staticGroup();
         // Placer les plateformes aléatoirement
         for (let i = 0; i < 5; i++) {
             const x = Phaser.Math.Between(100, 700);
             const y = Phaser.Math.Between(100, 500);
             platforms.create(x, y, 'platform');
         }
         return platforms;
     }

     createPlayer() {
         const player = this.physics.add.sprite(100, 450, 'player');
         player.setBounce(0.2);
         player.setCollideWorldBounds(true);
         this.physics.add.collider(player, this.platforms);
         return player;
     }

     handlePlayerMovement() {
         this.player.setVelocityX(0);

         if (this.input.keyboard.keys[68].isDown) { // D 
             this.player.setVelocityX(160);
         } else if (this.input.keyboard.keys[81].isDown) {  //Q 
             this.player.setVelocityX(-160);
         }
         if (this.input.keyboard.keys[90].isDown && this.player.body.touching.down) { // Z
             this.player.setVelocityY(-330);
         }
     }
 }
