import { ctx, gradient, GameMeasures  } from "./index.js"

export class Brick{
    constructor(x,y,width, height,id){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.id = id
        this.special = Math.random() < (GameMeasures.mode === "easy" ? 0.8 : GameMeasures.mode === "medium" ? 0.6 : GameMeasures.mode === "hard" ? 0.3 : 0.1)
        this.rock = Math.random() < (GameMeasures.mode === "easy" ? 0.1 : GameMeasures.mode === "medium" ? 0.2 : GameMeasures.mode === "hard" ? 0.3 : 0.4)
        this.show_special = false
        this.hit = 0

        addEventListener("keypress", (e) => {
        if (e.key === "s" && this.special) {
            this.show_special = true;
        } else if (e.key === "h" && this.show_special) {
            this.show_special = false;
        }
        });
    }

    draw(){ 
            ctx.beginPath();
            ctx.fillStyle = gradient //"rgba(255,255,255,0.5)"
            ctx.strokeStyle = "white"
            if(this.rock){
                switch(this.hit){
                    case 0:
                        ctx.fillStyle = "rgb(58, 58, 58)";
                        break;
                    case 1:
                        ctx.fillStyle = "rgb(110, 110, 110)";
                        break;
                    case 2:
                        ctx.fillStyle = "rgb(201, 201, 201)";
                        break
                }
            }
            else if(this.show_special){
                ctx.fillStyle = "green"
            }
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill()
            ctx.closePath()
    }
}