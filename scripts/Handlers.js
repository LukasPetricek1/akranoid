import { scooter, GameOver, scooterMovement } from "./index.js";

let dragging = false;
export function mouseDownHandler(e) {
  if (!GameOver) {
    dragging = true;
    document.body.style.cursor = "grabbing";
  }
}

export function mouseMoveHandler(e) {
  if (dragging && e.clientX > scooter.width / 2 && e.clientX < window.innerWidth - scooter.width/2) {
    scooter.dragging(e.clientX);
  }
}

export function mouseUpHandler(e) {
  dragging = false;
  scooterMovement.left = false
  scooterMovement.right = false
  document.body.style.cursor = "default";
}

export function keyDownHandler(e) {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        scooterMovement.right = true;
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        scooterMovement.left = true;
      }
}

export function keyUpHandler(e) {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        scooterMovement.right = false;
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        scooterMovement.left = false;
      }
}