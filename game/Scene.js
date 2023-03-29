import Player from "./Player.js";

class Scene extends Phaser.Scene {
    player;
    cursors;
    constructor() {
        super();
    }

    preload() {
        this.load.image("bullet", "images/character/ball2.png");
        this.load.image("transparency", "images/character/transparent.png");
        this.load.atlas(
            "flares",
            "images/particles/flares.png",
            "images/particles/flares.json"
        );
        this.load.image("dirt", "images/block/dirt.png");
        this.load.tilemapTiledJSON("map", "images/map/maptile.json");
        this.load.image("blocktiles", "images/map/tile.png");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("blocktiles");
        const BackgroundLayer = map.createLayer("BackgroundLayer", tileset);
        const Groundlayer = map.createLayer("GroundLayer", tileset);

        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(Groundlayer);
        // this.matter.world.convertTilemapLayer(BackgroundLayer);

        Groundlayer.setCollisionByExclusion([0]);

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

        this.player = new Player(this, Phaser.Physics.Matter.Matter);

        // this.matter.world.on('beforeupdate', this.player.resetTouching)
        this.matter.world.on("collisionactive", (event) => {
            this.player.collisionStart(event);
        });
        this.matter.world.on("beforeupdate", () => {
            this.player.resetTouching();
        });
        this.matter.world.on("afterupdate", () => {
            this.player.setContact();
        });
    }

    update() {
        this.player.moveSprite(this.cursors);
    }
}

function logTouching(number) {
    if (number % 4 == 0) {
        console.log("Touching Bottom");
    } else if (number % 4 == 1) {
        console.log("Touching Left");
    } else if (number % 4 == 2) {
        console.log("Touching Top");
    } else {
        console.log("Touching Right");
    }
}

export default Scene;

const getAttributes = (obj) => {
    return Object.getOwnPropertyNames(obj);
};
