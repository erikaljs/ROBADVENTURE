//jeu complet (ca regroupe tout)
var config = {
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', './game/assets/background.png');
    this.load.image('blue-platform', './game/assets/platforms1.png');
    this.load.image('purple-platform', './game/assets/platforms2.png');
    this.load.image('nut', './game/assets/nut.png');
    this.load.image('screw', './game/assets/screw.png');
    this.load.spritesheet('robot',
        'assets/Robots.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
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

    screws = this.physics.add.group({
        key: 'screw',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    screws.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });


    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update ()
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
