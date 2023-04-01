const angleToPosition = ["bottom", "left", "top", "right"];
const PositiontoAngle = {
    bottom: 0,
    left: 1,
    top: 2,
    right: 3,
};

export default class Player {
    sprite;
    sensor;
    touching;
    nbTouching;
    detectors;
    speed;
    reactivity;
    constructor(scene, mM) {
        const positionX = 300;
        const positionY = 300;
        this.sprite = scene.matter.add.sprite(
            positionX,
            positionY,
            "player",
            3
        );

        scene.anims.create({
            key: "left",
            frames: scene.anims.generateFrameNumbers("player", {
                start: 0,
                end: 2,
            }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: "right",
            frames: scene.anims.generateFrameNumbers("player", {
                start: 4,
                end: 6,
            }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: "stop",
            frames: scene.anims.generateFrameNumbers("player", {
                start: 3,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.touching = {
            top: false,
            right: false,
            bottom: false,
            left: false,
        };
        this.contact = {
            top: false,
            right: false,
            bottom: false,
            left: false,
        };
        this.sensor = {
            top: null,
            right: null,
            bottom: null,
            left: null,
        };

        this.speed = {
            jump: 6,
            run: 4,
            moveInJump: 1,
            maxJump: 2,
        };

        this.reactivity = 4;

        const h = this.sprite.height;
        const w = this.sprite.width;

        const playerBody = mM.Bodies.rectangle(w / 2, h / 2, w * 0.75, h, {
            chamfer: { radius: 10 },
        });

        this.sensor.bottom = mM.Bodies.rectangle(w / 2, h, w / 2, 5, {
            isSensor: true,
            label: "bottom",
        });
        this.sensor.top = mM.Bodies.rectangle(w / 2, 0, w / 2, 5, {
            isSensor: true,
            label: "top",
        });
        this.sensor.right = mM.Bodies.rectangle(
            (7 * w) / 8,
            h / 2,
            5,
            (3 * h) / 4,
            {
                isSensor: true,
                label: "right",
            }
        );
        this.sensor.left = mM.Bodies.rectangle(w / 8, h / 2, 5, (3 * h) / 4, {
            isSensor: true,
            label: "left",
        });

        const compoundBodySprite = mM.Body.create({
            parts: [
                playerBody,
                this.sensor.bottom,
                this.sensor.top,
                this.sensor.right,
                this.sensor.left,
            ],
            friction: 0.01,
        });

        this.sprite
            .setExistingBody(compoundBodySprite)
            .setPosition(positionX, positionY)
            .setFixedRotation();
    }

    resetTouching() {
        this.touching = {
            top: false,
            right: false,
            bottom: false,
            left: false,
        };
    }

    collisionStart(event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var bodyA = pairs[i].bodyA;
            var bodyB = pairs[i].bodyB;

            if (pairs[i].isSensor) {
                var blockBody;
                var playerBody;

                if (bodyA.isSensor) {
                    blockBody = bodyB;
                    playerBody = bodyA;
                } else if (bodyB.isSensor) {
                    blockBody = bodyA;
                    playerBody = bodyB;
                }

                this.touching[playerBody.label] = true;
            }
        }
    }

    setContact() {
        this.contact["top"] = this.touching["top"];
        this.contact["right"] = this.touching["right"];
        this.contact["bottom"] = this.touching["bottom"];
        this.contact["left"] = this.touching["left"];
    }

    moveSprite(cursor) {
        let lastSpeedX = this.sprite.body.velocity.x;

        // moving
        if (
            (cursor.left.isDown && !this.contact["left"]) ||
            (cursor.right.isDown && !this.contact["right"])
        ) {
            let newSpeedX =
                (cursor.left.isDown ? -1 : 1) *
                (this.contact["bottom"]
                    ? this.speed.run
                    : this.speed.moveInJump);

            if (
                this.contact["bottom"] ||
                Math.abs(newSpeedX) >= Math.abs(lastSpeedX)
            ) {
                let effectiveSpeedX =
                    lastSpeedX + (newSpeedX - lastSpeedX) / this.reactivity;
                this.sprite.setVelocityX(effectiveSpeedX);
            } else {
                let effectiveSpeedX =
                    lastSpeedX +
                    (this.speed.maxJump * Math.sign(lastSpeedX) - lastSpeedX) /
                        this.reactivity;
                this.sprite.setVelocityX(effectiveSpeedX);
            }
        }

        if (this.sprite.body.velocity.x >= 0.9) {
            this.sprite.anims.play("right", true);
        } else if (this.sprite.body.velocity.x <= -0.9) {
            this.sprite.anims.play("left", true);
        } else {
            this.sprite.anims.play("stop", true);
        }

        // jump
        if (cursor.up.isDown && this.contact["bottom"]) {
            // from floor
            this.sprite.setVelocityY(-this.speed.jump);
        } else if (cursor.up.isDown && this.contact["left"]) {
            // from wall left
            this.sprite.setVelocityY(-this.speed.jump);
            this.sprite.setVelocityX(this.speed.maxJump);
        } else if (cursor.up.isDown && this.contact["right"]) {
            // from wall right
            this.sprite.setVelocityY(-this.speed.jump);
            this.sprite.setVelocityX(-this.speed.maxJump);
        }

        // console.log(this.sprite.angle)
        // this.sensor.body.setX(this.sprite.x)
        // this.sensor.body.setY(this.sprite.y)
    }
}

const getMethods = (obj) => {
    let properties = new Set();
    let currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map((item) =>
            properties.add(item)
        );
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    return [...properties.keys()].filter(
        (item) => typeof obj[item] === "function"
    );
};

const getAttributes = (obj) => {
    return Object.getOwnPropertyNames(obj);
};
