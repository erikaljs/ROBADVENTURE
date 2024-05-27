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

var platforms;
var player;
var nuts;
var screws;
var score = 0;
var scoreText;

function preload ()
{
    this.load.image('background', 'assets/background.jpg');
    this.load.image('blue-platform', 'assets/platforms1.jpg');
    this.load.image('purple-platform', 'assets/platforms2.png');
    this.load.image('nut', 'assets/nut.png');
    this.load.image('screw', 'assets/screw.png');
    this.load.spritesheet('robot',
        'assets/Robots.png',
        { frameWidth: 500, frameHeight: 409 }
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
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 140 }
    });

    nuts.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    screws = this.physics.add.group({
        key: 'screw',
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 140 }
    });

    screws.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(player, platforms);

    this.physics.add.collider(nuts, platforms);
    this.physics.add.collider(screws, platforms);

    this.physics.add.overlap(player, nuts, collectNut, null, this);

    this.physics.add.overlap(player, screws, collectScrew, null, this);

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

function collectNut (player, nut)
{
    nut.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

function collectScrew (player, screw)
{
    screw.disableBody(true, true);

    score += 20;
    scoreText.setText('Score: ' + score);
}
