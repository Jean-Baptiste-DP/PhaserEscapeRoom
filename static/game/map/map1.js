export default class Map1 extends Phaser.Scene{
    constructor(){
        super();
    }
    preload ()
    {
        this.load.tilemapTiledJSON('map', 'game/map/maptile.json');
        this.load.image('blocktiles', 'images/tile.png');
    }

    create ()
    {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('blocktiles');
        map.createLayer(0, tileset, 0, 0);
    }
}