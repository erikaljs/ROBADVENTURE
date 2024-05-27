import { Scene } from 'phaser';
import CameraManager from './CameraManager';

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

        ///////////////////
        this.physics.world.setBounds(0, 0, 2000, 600);
        const cameraManager = new CameraManager(this);
        cameraManager.setupCamera(this.player, 2000, 600);
        
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
        
        //mechants robots 
            this.enemies = this.physics.add.group({
                key: 'enemy',
                repeat: 5,
                setXY: { x: 100, y: 0, stepX: 200 }
            });
        
            this.enemies.children.iterate(function (enemy) {
                enemy.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
        
            this.physics.add.collider(this.enemies, this.platforms);
        }
        


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
            // gestion des déplacements du joueur par rapport mechants
            this.physics.world.overlap(this.player, this.enemies, this.handleEnemyCollision, null, this);
    }

    handleEnemyCollision(player, enemy); {
        if (player.body.velocity.y > 0 && player.y < enemy.y) {
            enemy.disableBody(true, true); // Le méchant est tué
        } else {
            this.playerLives -= 1; // Le joueur perd une vie
            this.resetPlayerPosition(); // Optionnel, réinitialiser la position du joueur
            if (this.playerLives <= 0) {
                this.gameOver(); // Gérer la fin du jeu
            }
        }
    }

    gameOver(); {
        this.physics.pause();
        this.player.setTint(0xff0000); //change la couleur du joueur pr indiquer que le joueur a été touché
        this.add.text(400, 300, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        // Peut-être revenir au menu principal ou recharger la scène après un délai
    }