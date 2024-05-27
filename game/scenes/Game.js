import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'blue-platform').setScale(2).refreshBody();

        platforms.create(600, 400, 'purple-platform');
        platforms.create(50, 250, 'purple-platform');
        platforms.create(750, 220, 'purple-platform');


        player = this.physics.add.sprite(100, 450, 'robot');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'robot', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('robot', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        nuts = this.physics.add.group({
            key: 'nut',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        nuts.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });


        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }
    
    
    update ()
    {
        if (cursors.left.isDown)
            {
                player.setVelocityX(-160);
            
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);
            
                player.anims.play('right', true);
            }
            else
            {
                player.setVelocityX(0);
            
                player.anims.play('turn');
            }
            
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
            }
    }
}