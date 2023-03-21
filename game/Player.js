export default class Player{
    sprite;
    blocked;
    nbTouching;
    detectors;
    constructor(sprite, mM){
        this.sprite = sprite;
        this .blocked = {
            top: false,
            right: false,
            bottom: false,
            left: false
        }
        this.nbTouching = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }

        const h = this.sprite.height;
        const w = this.sprite.width;

        const playerBody = mM.Bodies.circle(0, 0, h/2);

        const compoundBody = mM.Body.create({
            parts: [
                playerBody
            ],
            friction: 0.01,
            restitution: 0.05 // Prevent body from sticking against a wall
        });

        this.sprite.setExistingBody(compoundBody).setPosition(500, 300)
    }
}