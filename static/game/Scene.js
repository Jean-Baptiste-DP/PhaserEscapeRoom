import Player from "./Player.js";

class Scene extends Phaser.Scene{
    player;
    cursors;
    constructor(){
        super();
    }

    preload(){
        this.load.image('bullet', "images/character/ball2.png");
        this.load.atlas('flares', 'images/particles/flares.png', 'images/particles/flares.json');
        this.load.image('dirt', 'images/block/dirt.png')
        this.load.tilemapTiledJSON('map', 'images/map/maptile.json');
        this.load.image('blocktiles', 'images/map/tile.png');
    }

    create(){

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('blocktiles');
        const layer = map.createLayer(0, tileset, 0, 0);

        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);

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

        this.player = new Player(this.matter.add.sprite(500, 300, 'bullet'), Phaser.Physics.Matter.Matter);
    }

    update(){
        // this.player.setVelocityX(0);

        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-70);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(70);
        // }
        // if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor())
        // {
        //     this.player.body.setVelocityY(-10000);
        // }
    }
}

export default Scene;