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
var nuts;
var screws;
var platformsP;
var platformsB;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var enemies;

function preload ()
{
    this.load.image('background', './assets/background.jpg');
    this.load.image('blue-platform', './assets/platforms1.jpg');
    this.load.image('purple-platform', './assets/platformsP.png');
    this.load.image('nut', './assets/nut.png');
    this.load.image('screw', './assets/screw.png');
    this.load.image('enemy', './assets/enemy.png');
    this.load.spritesheet('robot', './assets/spritesheet.png', { frameWidth: 78, frameHeight: 100 });
}

function create ()
{
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setScale(2);

    platformsB = this.physics.add.staticGroup();
    platformsP = this.physics.add.staticGroup();

    for (let i = 0; i < 10; i++) {
        platformsB.create(74 + i * 148, 630, 'blue-platform').setScale(2).refreshBody();
    }

    let purplePlatformPositions = [
        {x: 455, y: 400}, {x: 600, y: 400}, {x: 745, y: 400}, {x: 890, y: 400},
        {x: 1035, y: 400}, {x: 1180, y: 400}, {x: 50, y: 250}, {x: 195, y: 250},
        {x: 340, y: 250}, {x: 750, y: 220}, {x: 895, y: 220}, {x: 1040, y: 220},
        {x: 1330, y: 220}
    ];

    purplePlatformPositions.forEach(pos => {
        platformsP.create(pos.x, pos.y, 'purple-platform');
    });

    player = this.physics.add.sprite(90, 100, 'robot');

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

    this.cursors = this.input.keyboard.createCursorKeys();

    nuts = this.physics.add.group({
        key: 'nut',
        repeat: 15,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    nuts.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    screws = this.physics.add.group({
        key: 'screw',
        repeat: 15,
        setXY: { x: 80, y: 0, stepX: 100 }
    });
    
    screws.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    enemies = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platformsB);
    this.physics.add.collider(player, platformsP);
    this.physics.add.collider(nuts, platformsB);
    this.physics.add.collider(nuts, platformsP);
    this.physics.add.collider(screws, platformsB);
    this.physics.add.collider(screws, platformsP);
    this.physics.add.collider(enemies, platformsB);
    this.physics.add.collider(enemies, platformsP);

    this.physics.add.overlap(player, nuts, collectNuts, null, this);
    this.physics.add.collider(player, screws, collectScrews, null, this);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
}

function update ()
{
    if (gameOver) {
        return;
    }

    if (this.cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    
    if (this.cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectNuts (player, nut)
{
    nut.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (nuts.countActive(true) === 0) {
        nuts.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var enemy = enemies.create(x, 16, 'enemy');
        enemy.setBounce(1);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.allowGravity = false;
    }
}

function collectScrews (player, screw)
{
    screw.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (screws.countActive(true) === 0) {
        screws.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var enemy = enemies.create(x, 4, 'enemy');
        enemy.setBounce(1);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.allowGravity = false;
    }
}

function hitEnemy (player, enemy)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
