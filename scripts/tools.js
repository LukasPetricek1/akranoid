export function randomColor(limit){
    const r = Math.round(Math.random() * (limit - 100)) + 100
    const g = Math.round(Math.random() * (limit - 100)) + 100
    const b = Math.round(Math.random() * (limit - 100)) + 100

    return `rgba(${r}, ${g}, ${b}, 1)`
}

let randomMovements = []
export function randomMovement(min, max, speed){
    let number = (Math.random() * (max - min + 1) + min) * speed;
    while(randomMovements.indexOf(number) !== -1){ 
      number = (Math.floor(Math.random() * (max - min + 1)) + min) * speed;
    } 
    randomMovements.push(number)
    return number
}

export function getDate(){
    const date = new Date();
    const object = {
      year: date.getFullYear(),
      day: date.getDate(), 
      month: date.getMonth() + 1,
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };

    while (String(object.minute).length < 2) {
      object.minute = `0${object.minute}`;
    }
    while (String(object.second).length < 2) {
      object.second = `0${object.second}`;
    }
    return `${object.day}.${object.month}.${object.year}; ${object.hour}:${object.minute}:${object.second}`;
}



export function localStorageSet(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

export function collision(ball, brick) {
  const distX = Math.abs(ball.x - brick.x - brick.width / 2);
  const distY = Math.abs(ball.y - brick.y - brick.height / 2);

  if (
    distX > brick.width / 2 + ball.radius ||
    distY > brick.height / 2 + ball.radius
  ) {
    return false;
  }

  if (distX <= brick.width / 2 || distY <= brick.height / 2) {
    // Collision detected, determine the side of collision
    const overlapX = brick.width / 2 - distX;
    const overlapY = brick.height / 2 - distY;

    if (overlapX > overlapY) {
      // Collision from top or bottom
      return ball.y < brick.y ? "top" : "bottom";
    } else {
      // Collision from left or right
      return ball.x < brick.x ? "left" : "right";
    }
  }

  return false;
}