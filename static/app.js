import Scene from "./game/Scene.js";

const scene = new Scene();

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
    scene: [scene]
};

var game = new Phaser.Game(config);