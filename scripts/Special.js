import { ctx, scooter, special_images, balls, removeSpecial, GameMeasures } from "./index.js";
import { Ball } from "./Ball.js"

export class Special{
    constructor(x, y){ 
        this.x = x
        this.y = y
        this.dy = 5
        this.height = 50
        this.width = 50
        this.special_number = Math.floor(Math.random() * (special_images.length));
        this.image = special_images[this.special_number]
        this.id = Math.random() * 1000000
    }

    draw(){
            ctx.beginPath();
            ctx.fillStyle = "rgba(211, 210, 210,0.5)";
            ctx.roundRect(this.x, this.y, this.width, this.height,10)
            ctx.fill()
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.closePath()
    }

    move(){ 
        if(this.y + this.height + this.dy >= window.innerHeight){ 
            removeSpecial(this);
        }
        if(this.y + this.height + this.dy >= scooter.y){ 
             if((this.x >= scooter.x && this.x <= scooter.x + scooter.width) || this.x + this.width >= scooter.x && this.x + this.width <= scooter.x + scooter.width){
                for (let i = 1; i <= this.special_number + 1; i++) {
                    const ball = new Ball(GameMeasures.ball.r);
                    //ball.dy = -Math.abs(ball.dy)
                    balls.push(ball);
                }  
                removeSpecial(this)
            }
        }
        this.y += this.dy
        this.draw()
    }
}