export default class Bullet extends Phaser.Scene{
    constructor(){
        super();
        this.player;
        this.cursors;
    }

    preload(){
        this.load.image('bullet', "images/character/ball2.png");
        this.load.atlas('flares', 'images/particles/flares.png', 'images/particles/flares.json');
        this.load.image('dirt', 'images/block/dirt.png')
    }

    create(){

        this.cursors = this.input.keyboard.createCursorKeys();
        // var particles = this.add.particles('flares');

        // var emitter = particles.createEmitter({
        //     frame: 'yellow',
        //     lifespan: 1000,
        //     speed: { min: 100, max: 200 },
        //     gravityY: 100,
        //     angle: 270,
        //     scale: { start: 0.4, end: 0 },
        //     quantity: 0.5,
        //     blendMode: 'ADD'
        // });

        this.player = this.physics.add.sprite(500, 300, 'bullet').setBounce(0.1).setCollideWorldBounds(true);

        const platforms = this.physics.add.staticGroup();

        platforms.create(550, 550, 'dirt')
        platforms.create(500, 550, 'dirt');
        platforms.create(450, 550, 'dirt');
        platforms.create(400, 550, 'dirt');
        platforms.create(350, 550, 'dirt');
        platforms.create(300, 550, 'dirt');
        platforms.create(250, 550, 'dirt');
        platforms.create(200, 550, 'dirt');

        // emitter.startFollow(this.player);
        this.physics.add.collider(this.player, platforms)
    }

    update(){
        this.player.setVelocityX(0);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-150);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(150);
        }
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor())
        {
            this.player.body.setVelocityY(-400);
        }
    }
}