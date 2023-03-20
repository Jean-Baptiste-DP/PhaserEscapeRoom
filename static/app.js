import Bullet from "./game/character/Bullet.js";
import Map1 from "./game/map/map1.js";

var bullet = new Bullet()
var map1 = new Map1()

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    backgroundColor: 'rgb(50,0,150)',
    physics: {
        default: 'matter',
        matter: { gravity: { y: 0.4 }, debug: true }
    },
    audio: {
        noAudio: true
    },
    scene: [bullet]
};

var game = new Phaser.Game(config);