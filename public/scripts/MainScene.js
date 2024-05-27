import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('background', 'assets/img/background.jpg');
        this.load.image('platform', 'assets/img/background.png');

    }

    create() {
        this.add.image(400, 300, 'background');

        this.platforms = this.createPlatforms();
        this.player = this.createPlayer();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.handlePlayerMovement();
    }

    createPlatforms() {
        const platforms = this.physics.add.staticGroup();
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

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
