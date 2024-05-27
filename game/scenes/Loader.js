import { Scene } from 'phaser';

export default class Loader extends Phaser.Scene {
    constructor() {
        super({ key: 'Loader' });
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('blue-platform', 'assets/platforms1.png');
        this.load.image('purple-platform', 'assets/platforms2.png');
        this.load.image('nut', 'assets/nut.png');
        this.load.image('screw', 'assets/screw.png');
        this.load.spritesheet('robot', 'assets/Robots.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.scene.start('Game');
    }
}