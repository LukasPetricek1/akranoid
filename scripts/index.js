import { Ball } from "./Ball.js"
import { Scooter } from "./Scooter.js"
import { Brick } from "./Brick.js"
import { getDate, localStorageSet } from "./tools.js"
import { mouseDownHandler, mouseMoveHandler, mouseUpHandler, keyDownHandler, keyUpHandler } from "./Handlers.js"

const canvas = document.getElementById("canvas")
export const ctx = canvas.getContext("2d")  
export let animation;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

export let GameOver = false

const preferences = JSON.parse(localStorage.getItem("arkanoid-preferences"))
localStorage.removeItem("arkanoid-preferences");

if (!preferences) {
    location.pathname = "/index.html";
}


export const user_data = {
  points: 0,
  lifes: 3,
  time: 1,
  fps: 0,
};

class Measures {
      constructor() {
        this.padding = {
          x: window.innerWidth * 0.01,
          y: window.innerHeight * 0.1,
        };
        this.space = {
          x: 3,
          y: 3,
        },
        this.brick = {
            w:
              (window.innerWidth -
                ((preferences.columns - 1) * this.space.x +
                  2 * this.padding.x)) /
              preferences.columns,
            h:
              (window.innerHeight -
                ((preferences.columns - 1) * this.space.x +
                  2 * this.padding.x)) /
              preferences.columns /
              3,
          },
          this.scooter = {
            w: window.innerWidth * 0.15 >= 200 ? window.innerWidth * 0.15 : 200,
            h: this.brick.h / 2,
          },
          this.ball = {
            r: 5,
          },
          this.mode = preferences.mode,
          this.speed = preferences.speed
      }
    }

export let GameMeasures = new Measures();


function generateBricks() {

    let space = GameMeasures.space.x
    let rows = preferences.rows
    let cols = preferences.columns
    let width = GameMeasures.brick.w
    let height = GameMeasures.brick.h

      const result = [];
      let x_position = GameMeasures.padding.x;
      let y_position = GameMeasures.padding.y;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let brick = new Brick(
            x_position,
            y_position,
            width,
            height,
            Math.random() * 100000
          );
          result.push(brick);
          x_position += space + width;
        }
        y_position += space + height;
        x_position = GameMeasures.padding.x;
    }

      function update(){ 
        let x = GameMeasures.padding.x;
        for(let i = 0; i < bricks.data.length; i ++){
            let brick = bricks.data[i]
            if(!brick){ 
                x += GameMeasures.space.x + brick.width;
                continue;
            }
            brick.width = GameMeasures.brick.w;
            brick.height = GameMeasures.brick.h
            brick.x = x
            brick.y = brick.y

            if((i + 1) % preferences.columns === 0){
                x = GameMeasures.padding.x
            }else{
            x += GameMeasures.space.x + brick.width
            }
        }
      }

      return { 
        data : result,
        update
      }
}

export let gradient = ctx.createLinearGradient(
       0,
       0,
       canvas.width,
       canvas.height
     );
     gradient.addColorStop(0, "blue");
     gradient.addColorStop(1, "red");

export let scooter = new Scooter(
       GameMeasures.scooter.w,
       GameMeasures.scooter.h,
       GameMeasures.padding.y
     );


export let balls = [];
        function generateBalls(){
            for (let i = 0; i < preferences.balls; i++) {
                balls.push(new Ball(GameMeasures.ball.r));
            }
            return balls
}
        generateBalls()
        
export function removeBall(value) {
       balls = balls.filter((ball) => value.id !== ball.id);
       return balls;
     }
export let bricks = generateBricks()

const points_display = document.querySelector(".points h1");

export function removeBrick(brick) {
       user_data.points += 100;
       points_display.innerHTML = user_data.points;
       bricks.data = bricks.data.filter((a) => {
        if (a.id == brick.id){
            return undefined
        }
        return a
       });
     }

export let scooterMovement = {
        right: false,
        left: false,
        movement: 10,
};

export let specials = []
export let special_images = []

export function removeSpecial(special){
        specials = specials.filter(value => value.id !== special.id) 
        return specials
    }

function mobileInterface(){
  const controls = document.createElement("section");
  controls.setAttribute("class", "controls");

  const rightArrow = document.createElement("i")
  rightArrow.setAttribute("class", "fa-solid fa-angle-right");

  rightArrow.addEventListener("touchstart" , () => {
    scooterMovement.right = true
  })

  const leftArrow = document.createElement("i");
  leftArrow.setAttribute("class", "fa-solid fa-angle-left");

  leftArrow.addEventListener("touchstart" , () => {
    scooterMovement.left = true
  })

  controls.appendChild(leftArrow)
  controls.appendChild(rightArrow)
  document.body.appendChild(controls);
}

document.addEventListener("DOMContentLoaded" , () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // mobile or tablet
    mobileInterface()
  }
    init();
})

function init(){
    const fps_display = document.querySelector(".fps h1");
    const lifes_display = document.querySelector(".lifes h1");
    const time_display = document.querySelector(".time h1");

    function showLifes(){ 
        let string = ""
        if(user_data.lifes === 0){
            string = "💀"
        }
            for(let i = 0; i < user_data.lifes; i ++){
                string += "❤️"
            }
        lifes_display.innerHTML = string
        return string
    }

    showLifes()

    function timeDisplay(){
        const x = setInterval(() => {
            if(user_data.lifes === 0 || bricks.length === 0){ 
                clearInterval(x)
            }
            user_data.time += 1
            time_display.innerHTML = user_data.time
        } , 1000)
    }

    timeDisplay()

    let windowWidth = window.innerWidth;

    function Resizing(){ 
        canvas.width = this.innerWidth  

        let shiftX = window.innerWidth - windowWidth;

        GameMeasures = new Measures();
    
        scooter.resize(shiftX)
        balls.map(ball => ball.resize(shiftX))
        
        bricks.update()
        
        windowWidth = window.innerWidth

    }

    addEventListener("resize" , Resizing)

    addEventListener("keydown" , keyDownHandler)
    addEventListener("keyup" , keyUpHandler)

    addEventListener("mousedown" , mouseDownHandler)
    addEventListener("mouseup" , mouseUpHandler)
    addEventListener("mousemove", mouseMoveHandler)

    for(let i = 1; i <= 6; i ++){ 
        const image = new Image()
        image.src = `./images/dice-${i}.png`;
        special_images.push(image)
    }

    Promise.all(special_images.map(image => new Promise(resolve => image.onload = resolve))).then(() => {
        Animate()
    })

    let countdown = 20
    // in_game || winner || loser
    let status = "in_game"

    function endingMessage(message){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        
        ctx.beginPath()
        ctx.font = `${Math.round(window.innerWidth / 10)}px Arial`
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.baseLine = "start"
        ctx.fillText(message, canvas.width / 2, canvas.height / 2)
        ctx.closePath()

        ctx.beginPath();
        ctx.font = `${Math.round(window.innerWidth / 40)}px Arial`;
        ctx.fillStyle = "aqua";
        ctx.textAlign = "center";
        ctx.baseLine = "start";
        ctx.fillText(`New Game in: ${countdown}s`, canvas.width / 2, canvas.height / 1.5);
        ctx.closePath();
    }


    let lastTime = new Date()

    setInterval(() => {
        if(user_data.fps){
            fps_display.innerHTML = user_data.fps;
        }
    }, 1000)

    function Animate(){
        animation = window.requestAnimationFrame(Animate)
        let currentTime = new Date();
        user_data.fps = Math.round(1000 / (currentTime - lastTime))
        lastTime = currentTime;


        ctx.clearRect(0,0,canvas.width, canvas.height)
        
        var i = balls.length
        while(i--){ 
            balls[i].move()
        }
    
        scooter.move()

        var j = bricks.data.length;
        while (j--) {
        bricks.data[j].draw();
        }

        var k = specials.length;
        while (k--) {
        specials[k].move();
        }

        if(balls.length === 0 && user_data.lifes > 0){
            user_data.lifes -= 1 
            showLifes();
            generateBalls()
        }

        if(user_data.lifes === 0 || bricks.data.length === 0){ 
            GameOver = true
            window.cancelAnimationFrame(animation);

            let localResults = JSON.parse(localStorage.getItem("arkanoid-results"))
           

            if(!localResults || typeof localResults == "string"){
                localResults = []
            }
            localResults.push({
                time : user_data.time,
                points : user_data.points,
                lifes : user_data.lifes,
                date : getDate(),
                mode : GameMeasures.mode
            })
            localStorageSet("arkanoid-results" , localResults)

            const showResultButton = document.createElement("button");
            showResultButton.id = "show-results"
            showResultButton.innerHTML = "Show Results";
            showResultButton.onclick = function () {
            location.pathname = "/results.html";
            };
            document.body.appendChild(showResultButton);

            if(user_data.lifes === 0) {
                status = "loser"
            }
            else {
                status = "winner";
            }

            endingMessage( status === "loser" ? "Game Over ☠️" : "Winner 👍");

            let interval = setInterval(() => {
                countdown -= 1;
                endingMessage(
                  status === "loser" ? "Game Over ☠️" : "Winner 👍"
                );

                if(countdown == 0){
                    document.body.removeChild(showResultButton);
                    clearInterval(interval)
                    location.reload()
                }
            }, 1000)
        }
    }

}
