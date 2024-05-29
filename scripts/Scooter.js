import { ctx, scooterMovement, gradient, GameMeasures } from "./index.js"

export class Scooter {
    constructor(width, height){ 
        this.height = height
        this.width = width
        this.x = (window.innerWidth / 2) - (this.width / 2)
        this.y = window.innerHeight - this.height * 2
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.roundRect(this.x, this.y, this.width, this.height,10)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = "lime"
        ctx.lineWidth = 5
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.moveTo(this.x + this.width / 2, this.y)
        ctx.lineTo(this.x + this.width / 2, this.y -  10)
        ctx.stroke()
        ctx.closePath()
    }

    move(){ 
        if(scooterMovement.left && this.x > 0){
            this.x -= scooterMovement.movement * GameMeasures.speed 
        }
        else if(scooterMovement.right && this.x + this.width < window.innerWidth){
            this.x += scooterMovement.movement * GameMeasures.speed
        }
        this.draw()
    }

    resize(shiftX){ 
        this.width = GameMeasures.scooter.w
        this.height = GameMeasures.scooter.h

        if(this.x >= Math.abs(shiftX)){ 
          this.x += shiftX
        }else{ 
          if(shiftX > 0){ 
            this.x = window.innerWidth - this.width
          }else{ 
            this.x = 0
          }
        }
    }

    dragging(x){ 
        this.x = x - this.width / 2
        this.draw()
    }
}