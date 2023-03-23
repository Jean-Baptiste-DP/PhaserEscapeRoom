export default class Player{
    sprite;
    sensor;
    blocked;
    nbTouching;
    detectors;
    speed;
    constructor(scene, mM){
        this.sprite = scene.matter.add.sprite(600, 500, 'bullet');
        this .blocked = {
            top: false,
            right: false,
            bottom: false,
            left: false
        };
        this.nbTouching = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.sensor = {
            top: null,
            right: null,
            bottom: null,
            left: null
        }

        this.speed = 1;

        const h = this.sprite.height;
        const w = this.sprite.width;

        const playerBody = mM.Bodies.circle(0, 0, h/2);
        this.sensor.bottom = mM.Bodies.rectangle(0, h/2, 6, 3, {isSensor: true, label: 'bottom'})
        this.sensor.top = mM.Bodies.rectangle(0, -h/2, 6, 3, {isSensor: true, label: 'top'})
        this.sensor.right = mM.Bodies.rectangle(w/2, 0, 3, 6, {isSensor: true, label: 'right'})
        this.sensor.left = mM.Bodies.rectangle(-w/2, 0, 3, 6, {isSensor: true, label: 'left'})

        const compoundBody = mM.Body.create({
            parts: [
                playerBody, this.sensor.bottom, this.sensor.top, this.sensor.right, this.sensor.left
            ],
            friction: 0.01,
            restitution: 0.05 // Prevent body from sticking against a wall
        });

        this.sprite.setExistingBody(compoundBody).setPosition(400, 300).setAngle(45)
        console.log(this.sprite.angle)
    }

    move(cursor){
        if(cursor.left.isDown){
            this.sprite.setVelocityX(-this.speed)
        }
        else if(cursor.right.isDown){
            this.sprite.setVelocityX(this.speed)
        }

        if(cursor.up.isDown){
            this.sprite.setVelocityY(-this.speed)
        }

        // console.log(this.sprite.angle)
    }

    getAngle(){
        return this.sprite.angle
    }
}