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

        this.player = new Player(this, Phaser.Physics.Matter.Matter);

        this.matter.world.on('collisionstart', function (event) {

            //  Loop through all of the collision pairs
            var pairs = event.pairs;
    
            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;
    
                //  We only want sensor collisions
                if (pairs[i].isSensor)
                {
                    var blockBody;
                    var playerBody;
    
                    if (bodyA.isSensor)
                    {
                        blockBody = bodyB;
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor)
                    {
                        blockBody = bodyA;
                        playerBody = bodyB;
                    }
    
                    //  You can get to the Sprite via `gameObject` property
                    var playerSprite = playerBody.gameObject;
                    var blockSprite = blockBody.gameObject;
    
                    var color;
                    let angle = playerSprite.angle
                    let anglePosition
                    if(angle>=-45 && angle<45){
                        anglePosition = 0
                    }else if(angle>=-135 && angle<-45){
                        anglePosition = 3
                    }else if(angle>=45 && angle<135){
                        anglePosition = 1
                    }else{
                        anglePosition = 2
                    }

                    console.log(anglePosition)

                    if (playerBody.label === 'left')
                    {
                        color = 0xff0000;
                        logTouching(anglePosition+1)
                    }
                    else if (playerBody.label === 'right')
                    {
                        color = 0x00ff00;
                        logTouching(anglePosition+3)
                    }
                    else if (playerBody.label === 'top')
                    {
                        color = 0x0000ff;
                        logTouching(anglePosition+2)
                    }
                    else if (playerBody.label === 'bottom')
                    {
                        color = 0xffff00;
                        logTouching(anglePosition)
                    }
    
                    playerSprite.setTintFill(color);
                }
            }
        })
    }

    update(){
        this.player.move(this.cursors)
    }
}


function logTouching(number){
    if(number%4==0){
        console.log("Touching Bottom")
    }else if(number%4==1){
        console.log("Touching Left")
    }else if(number%4==2){
        console.log("Touching Top")
    }else{
        console.log("Touching Right")
    }
}

export default Scene;