import Player from "./Player.js";

class Scene extends Phaser.Scene {
    player;
    cursors;
    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet("player", "images/character/players.png", {
            frameWidth: 40,
            frameHeight: 50,
        });
        this.load.tilemapTiledJSON("map", "images/map/maptile.json");
        this.load.image("blocktiles", "images/map/tile.png");
        this.load.image("decorations", "images/map/decors.png");
    }

    create() {
        // initialise the map
        const map = this.make.tilemap({ key: "map" });

        // maptiles
        const blocktileset = map.addTilesetImage("blocktiles");
        const decorations = map.addTilesetImage("decorations");

        //layers
        map.createLayer("BackgroundLayer", blocktileset);
        map.createLayer("DecorationLayer", decorations);
        const Groundlayer = map.createLayer("GroundLayer", blocktileset);

        //collision on groundlayer
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(Groundlayer);

        // input cursor
        this.cursors = this.input.keyboard.createCursorKeys();

        // player creation
        this.player = new Player(this, Phaser.Physics.Matter.Matter);

        // event on touch, and before/after updates
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
        //call moving function of the player
        this.player.moveSprite(this.cursors);
    }
}

export default Scene;
