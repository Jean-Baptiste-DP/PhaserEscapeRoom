const angleToPosition = ["bottom", "left", "top", "right"]
const PositiontoAngle = {
    "bottom" : 0,
    "left" : 1,
    "top" : 2,
    "right" : 3
}

export default class Player{
    sprite;
    sensor;
    touching;
    nbTouching;
    detectors;
    speed;
    constructor(scene, mM){
        const positionX = 300
        const positionY = 300
        this.sprite = scene.matter.add.sprite(positionX, positionY, 'bullet');
        this.touching = {
            top: false,
            right: false,
            bottom: false,
            left: false
        };
        this.sensor = {
            top: null,
            right: null,
            bottom: null,
            left: null,
            body: null
        }

        this.speed = 3;

        const h = this.sprite.height;
        const w = this.sprite.width;

        const playerBody = mM.Bodies.circle(0, 0, h/2);

        this.sensor.body = scene.physics.add.image(positionX, positionY, "transparency")//.setIgnoreGravity(true);
        this.sensor.bottom = mM.Bodies.rectangle(0, h/2, 6, 3, {isSensor: true, label: 'bottom'})
        this.sensor.top = mM.Bodies.rectangle(0, -h/2, 6, 3, {isSensor: true, label: 'top'})
        this.sensor.right = mM.Bodies.rectangle(w/2, 0, 3, 6, {isSensor: true, label: 'right'})
        this.sensor.left = mM.Bodies.rectangle(-w/2, 0, 3, 6, {isSensor: true, label: 'left'})

        const compoundBodySprite = mM.Body.create({
            parts: [
                playerBody
            ],
            friction: 0.01,
            restitution: 0.05 // Prevent body from sticking against a wall
        });

        this.sprite.setExistingBody(compoundBodySprite).setPosition(positionX, positionY)

        // const compoundBodySensor = mM.Body.create({
        //     parts: [
        //         this.sensor.body, this.sensor.top, this.sensor.bottom, this.sensor.left, this.sensor.right
        //     ]
        // })

        // this.sensor.body.setExistingBody(compoundBodySensor).setPosition(positionX, positionY)
    }

    resetTouching(){
        this.touching = {
            top: false,
            right: false,
            bottom: false,
            left: false
        };
    }

    collisionStart(event){
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++)
        {
            var bodyA = pairs[i].bodyA;
            var bodyB = pairs[i].bodyB;

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
                this.touching[angleToPosition[anglePosition + PositiontoAngle[playerBody.label]]] = true
            }
        }
        console.log("Touching "+(this.touching.bottom?"bottom ":"")+(this.touching.top?"top ":"")+(this.touching.left?"left ":"")+(this.touching.right?"right ":""))
    }

    moveSprite(cursor){
        
        if(cursor.left.isDown && this.sensor.body.body.onFloor()){
            this.sprite.setVelocityX(-this.speed)
            // console.log("sprite")
            // console.log(getAttributes(this.sprite))
            // console.log("x : ", this.sprite.x, ", y : ", this.sprite.y)
            // console.log("sensor")
            // console.log(getMethods(this.sensor.body.body))
        }
        else if(cursor.right.isDown && this.sensor.body.body.onFloor()){
            this.sprite.setVelocityX(this.speed)
        }

        if(cursor.up.isDown && this.sensor.body.body.onFloor()){
            this.sprite.setVelocityY(-this.speed)
        }

        // console.log(this.sprite.angle)
        // this.sensor.body.setX(this.sprite.x)
        // this.sensor.body.setY(this.sprite.y)
    }

    moveSensor(){
        this.sensor.body

        //
    }

    getAngle(){
        return this.sprite.angle
    }
}

const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
  }

const getAttributes = (obj) => {
    return Object.getOwnPropertyNames(obj);
}