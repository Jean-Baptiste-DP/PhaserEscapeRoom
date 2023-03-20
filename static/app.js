import Bullet from "./game/character/Bullet.js";

var bullet = new Bullet()

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    backgroundColor: 'rgb(50,0,150)',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 400 }, debug: true }
    },
    audio: {
        noAudio: true
    },
    scene: [bullet]
};

var game = new Phaser.Game(config);