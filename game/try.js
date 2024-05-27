var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

function preload ()
{
    this.load.image('background', './assets/background.jpg');
    this.load.image('blue-platform', './assets/platforms1.jpg');
    this.load.image('purple-platform', './assets/platformsP.png');
    this.load.image('nut', './assets/nut.png');
    this.load.image('screw', './assets/screw.png');
    this.load.spritesheet('robot','assets/Robots.png', { frameWidth: 78, frameHeight: 100 });
}

function create ()
{
    this.add.image(400, 300, 'background');


    platforms = this.physics.add.staticGroup();

    platforms.create(74, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(222, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(370, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(518, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(666, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(814, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(962, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(1110, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(1258, 630, 'blue-platform').setScale(2).refreshBody();
    platforms.create(1406, 630, 'blue-platform').setScale(2).refreshBody();


    platforms.create(455, 400, 'purple-platform');
    platforms.create(600, 400, 'purple-platform');
    platforms.create(745, 400, 'purple-platform');
    platforms.create(890, 400, 'purple-platform');
    platforms.create(1035, 400, 'purple-platform');
    platforms.create(1180, 400, 'purple-platform');
    platforms.create(50, 250, 'purple-platform');
    platforms.create(195, 250, 'purple-platform');
    platforms.create(340, 250, 'purple-platform');
    platforms.create(750, 220, 'purple-platform');
    platforms.create(895, 220, 'purple-platform');
    platforms.create(1040, 220, 'purple-platform');
    platforms.create(1330, 220, 'purple-platform');


    player = this.physics.add.sprite(80, 100, 'robot');

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
        repeat: 5,
        setXY: { x: 20, y: 0, stepX: 80 }
    });
    
    nuts.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

    screws = this.physics.add.group({
        key: 'screw',
        repeat: 5,
        setXY: { x: 10, y: 100, stepX: 40 }
    });
    
    screws.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.cursors = this.input.keyboard.createCursorKeys();


    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update ()
{
    if (this.cursors.left.isDown)
        {
            player.setVelocityX(-160);
        
            player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            player.setVelocityX(160);
        
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
        
            player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
}