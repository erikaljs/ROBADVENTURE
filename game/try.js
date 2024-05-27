//jeu complet (ca regroupe tout)
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
var enemies;
var platformsP;
var platformsB;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var txt;

function preload ()
{
    this.load.image('background', './assets/background1.jpg');
    this.load.image('blue-platform', './assets/platforms1.jpg');
    this.load.image('purple-platform', './assets/platforms2.png');
    this.load.image('nut', './assets/nut.png');
    this.load.image('screw', './assets/screw.png');
    this.load.image('battery', './assets/batterie.png');
    this.load.image('moteur', './assets/motoReducteur.png');
    this.load.image('pontEnH', './assets/L298N.png');
    this.load.image('enemy', './assets/enemy.png');
    this.load.image('rob', './assets/Rob.png');
    this.load.spritesheet('robot','assets/spritesheet.png', { frameWidth: 78, frameHeight: 100 });
}

function create ()
{
    // this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setScale(2);
    let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1);
    let worldWidth = bg.displayWidth;
    let worldHeight = bg.displayHeight;
    
    
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    platformsB = this.physics.add.staticGroup();
    platformsP = this.physics.add.staticGroup();

    for (let x = 74; x < worldWidth; x += 148) {
        platformsB.create(x, 630, 'blue-platform').setScale(2).refreshBody();
    }

    platformsB.create(2738, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(222, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(370, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(518, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(666, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(814, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(962, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(1110, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(1258, 630, 'blue-platform').setScale(2).refreshBody();
    // platformsB.create(1406, 630, 'blue-platform').setScale(2).refreshBody();


    platformsP.create(455, 475, 'purple-platform');
    platformsP.create(600, 475, 'purple-platform');
    platformsP.create(745, 475, 'purple-platform');
    platformsP.create(890, 475, 'purple-platform');
    platformsP.create(1035, 475, 'purple-platform');
    platformsP.create(1180, 475, 'purple-platform');

    platformsP.create(50, 325, 'purple-platform');
    platformsP.create(195, 325, 'purple-platform');

    platformsP.create(605, 220, 'purple-platform');
    platformsP.create(750, 220, 'purple-platform');
    platformsP.create(895, 220, 'purple-platform');

    platformsP.create(1330, 300, 'purple-platform');
    platformsP.create(1475, 300, 'purple-platform');
    platformsP.create(1620, 300, 'purple-platform');

    platformsP.create(1910, 350, 'purple-platform');
    platformsP.create(2055, 350, 'purple-platform');

    platformsP.create(1645, 500, 'purple-platform');
    platformsP.create(1790, 500, 'purple-platform');

    platformsP.create(2100, 200, 'purple-platform');
    platformsP.create(2245, 200, 'purple-platform');
    platformsP.create(2390, 200, 'purple-platform');

    platformsP.create(2535, 450, 'purple-platform');


    Rob = this.physics.add.staticGroup();
    Rob.create(2620, 600, 'rob').setScale(1);

    player = this.physics.add.sprite(90, 100, 'robot');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);


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


    battery = this.physics.add.staticGroup();
    battery.create(1000, 300, 'battery').setScale(1);

    motor = this.physics.add.staticGroup();
    motor.create(400, 100, 'moteur').setScale(1);

    pontEnH = this.physics.add.staticGroup();
    pontEnH.create(2100, 500, 'pontEnH').setScale(1);

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
    spawnEnemy();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '40px', fill: '#FFF', fontStyle: 'bold' });

    this.physics.add.collider(player, platformsB);
    this.physics.add.collider(player, platformsP);
    this.physics.add.collider(nuts, platformsB);
    this.physics.add.collider(nuts, platformsP);
    this.physics.add.collider(screws, platformsB);
    this.physics.add.collider(screws, platformsP);
    this.physics.add.collider(battery, platformsB);
    this.physics.add.collider(battery, platformsP);
    this.physics.add.collider(motor, platformsB);
    this.physics.add.collider(motor, platformsP);
    this.physics.add.collider(pontEnH, platformsB);
    this.physics.add.collider(pontEnH, platformsP);

    this.physics.add.collider(Rob, platformsB);
    this.physics.add.collider(Rob, platformsP);


    this.physics.add.collider(enemies, platformsB);
    this.physics.add.collider(enemies, platformsP);


    this.physics.add.overlap(player, nuts, collectNuts, null, this);
    this.physics.add.collider(player, screws, collectScrews, null, this);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
    this.physics.add.overlap(player, Rob, friend, null, this);
    this.physics.add.overlap(player, battery, collectBattery, null, this);
    this.physics.add.overlap(player, pontEnH, collectL298N, null, this);
    this.physics.add.overlap(player, motor, collectMotors, null, this);

}

function update ()
{
    if (gameOver)
    {
        return;
    }

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

function collectNuts (player, nut)
{
    nut.disableBody(true, true);

    score += 2;
    scoreText.setText('Score: ' + score);
}

function collectScrews (player, screw)
{
    screw.disableBody(true, true);

    score += 2;
    scoreText.setText('Score: ' + score);
}

function collectL298N(player, pontEnH) {
    pontEnH.disableBody(true, true);
    score += 5;
    scoreText.setText('Score: ' + score);
}

function collectMotors(player, motor) {
    motor.disableBody(true, true);
    score += 5;
    scoreText.setText('Score: ' + score);
}

function collectBattery(player, battery) {
    battery.disableBody(true, true);
    score += 5;
    scoreText.setText('Score: ' + score);
}

function hitEnemy (player, enemy)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function spawnEnemy() {
    var x = (player.x < window.innerWidth / 2) ? Phaser.Math.Between(window.innerWidth / 2, window.innerWidth) : Phaser.Math.Between(0, window.innerWidth / 2);

    var enemy = enemies.create(x, 5, 'enemy');
    enemy.setBounce(1);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy.allowGravity = false;
}


function friend() {
    alert("My friend !! \n End of Game"); 
    game.scene.pause(); 
}