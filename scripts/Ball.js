import { ctx, scooter, bricks, specials, balls, removeBall, removeBrick, GameMeasures} from "./index.js"
import { randomMovement, collision } from "./tools.js"
import { Special } from "./Special.js"



export class Ball{ 
    constructor(radius){ 
        this.radius = radius
        this.x = balls.length > 0 ? balls[balls.length - 1].x : scooter.x + scooter.width / 2
        this.y = balls.length > 0 ? balls[balls.length - 1].y : scooter.y - this.radius * 2
        this.dx = randomMovement(-4, 4, GameMeasures.speed);
        this.dy = randomMovement(-5, -3, GameMeasures.speed);
        this.color = "white"
        this.id = Math.random() * 1000000
    }

    draw(){ 
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }

    resize(shiftX){ 
      if(this.x < Math.abs(shiftX)){
        if(shiftX < 0) this.x = this.radius * 2
        else this.x = window.innerWidth - this.radius * 2
      }else{ 
        this.x += shiftX
      }
    }

    move(){ 

            if(balls.length > 0){
              if (this.y + this.radius >= window.innerHeight) {
                removeBall(this);
              }

              var i = bricks.data.length;

              while (i--) {
                let brick = bricks.data[i];

                    let potentionalCollision = collision(this, brick)
                    if(potentionalCollision){
                      brick.hit ++ 

                      if(!brick.rock || brick.rock && brick.hit === 3){
                        removeBrick(brick)

                        if(brick.special){
                          const special = new Special(brick.x + brick.width / 2, brick.y + brick.height)
                          specials.push(special)
                        }
                      }

                      if(potentionalCollision === "left" || potentionalCollision === "right"){
                        this.dx *= -1
                      }else if(potentionalCollision === "top" || potentionalCollision === "bottom"){
                        this.dy *= -1
                      }
                    }
              }

              if (this.y + this.radius <= scooter.y){
                if (
                  this.y + this.radius + this.dy >= scooter.y &&
                  this.x + this.radius + this.dx >= scooter.x &&
                  this.x - this.radius - this.dx < scooter.x + scooter.width
                ) {
                  let toleration = 10;
                  let x_limit = 1;
                  let scooter_center = scooter.x + scooter.width / 2;

                  if (
                    this.x >= scooter_center - toleration &&
                    this.x <= scooter_center + toleration
                  ) {
                    this.dx = Math.random() < 0.5 ? 0.5 : -0.5;
                  } else if (this.x >= scooter_center) {
                    // right side collision
                    this.dx =
                      x_limit +
                      (scooter.x + scooter.width - scooter_center) /
                        (this.x - scooter_center);
                  } else if (this.x <= scooter_center) {
                    //left side collision
                    this.dx = -(
                      x_limit +
                      (scooter_center - scooter.x) / (this.x - scooter.x)
                    );
                  }
                  this.dy *= -1;
                } 
              }
              
              
              if (
                this.x - this.radius + this.dx <= 0 ||
                this.x + this.radius + this.dx >= window.innerWidth
              ) {
                this.dx *= -1;
              } if (this.y - this.radius + this.dy <= 0)
              {
                this.dy *= -1;
              }
              this.x += this.dx;
              this.y += this.dy;
            }
        this.draw();
        }
}