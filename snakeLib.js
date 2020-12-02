import { pathList } from "./DS.js";
import { noOfRow, noOfCol,delay } from "./initParam.js";
let intervals = [];
let Snake = {
  length: 1,
  headPos: -1,
  path: new pathList(),
  lastPos: -1,
  food : -1,
  updateHead: function (newPos, cLength) {
    // console.log(this.path);
    // console.log(this.path.head.id);
    let newPos1 = $(`#${newPos}`);
    let headPos = $(`#${this.headPos}`);
    if (!newPos1.hasClass("bgBlack")) {
      if (cLength) {
        newPos1.addClass("SnakHead");
        headPos.removeClass("SnakHead");
        headPos.removeClass("bgWhite");
        // console.log("removed white");
        headPos.addClass("bgBlack");
        // console.log("added black");

        this.path.addLast(newPos);
        // this.path.removeFirst();
        this.lastPos = this.headPos;
        this.headPos = newPos;
        this.length += 1;
        snakeFood();
      } else {
        // console.log("hello");
        newPos1.addClass("SnakHead");
        headPos.removeClass("SnakHead");
        // console.log("removed head");
        headPos.addClass("bgBlack");
        // console.log("added black");
        $(`#${this.path.head.id}`).removeClass("bgBlack");
        $(`#${this.path.head.id}`).addClass("bgWhite");
        this.path.addLast(newPos);
        // console.log(this.path.head);

        this.path.removeFirst();
        if (!(this.length == 1)) {
          this.lastPos = this.headPos;
          this.headPos = newPos;
        } else {
          this.lastPos = newPos;
          this.headPos = newPos;
        }
        // length += 1;
      }
    } else {
      // reset
      gameOver();
      console.log(this.path);
    }
    // console.log(this);
  },
};
function snakeFood() {
  let max = noOfRow * noOfCol;
  let min = 1;
  let food = Math.floor(Math.random() * (max - min + 1) ) + min;
  while (Snake.path.isExist(food) || $(`#${food}`).hasClass("bgRed")) {
    food = Math.floor(Math.random() * (max - min + 1) ) + min;
  } 
  $(`#${Snake.food}`).removeClass("food");
  Snake.food = food;
  $(`#${Snake.food}`).addClass("food");
}
function intialPos() {

  let center = Math.floor(
    $(".grid-table tbody tr:last td:last").attr("id") / 2
  );
  if ($(`#${center}`).hasClass("bgRed")) {
    // console.log(center);
    center = center - Math.floor((screen.width / 15) * 0.5);
    // console.log(center);
  }
  // console.log($(`#${center}`));
  Snake.headPos = center;
  Snake.path.addLast(center);
  Snake.lastPos = center;
  Snake.length = 1;
  $(`#${center}`).addClass("SnakHead");
  // console.log(Snake);
}
function movement() {
  $(document).keydown(function (e) {
    switch (e.which) {
      case 37:
        clearAllIntervals(intervals);
         var temp = setInterval(makeMove, delay,"left");
         intervals.push(temp);
        // makeMove("left");
        console.log("move Left");
        break;
      case 38:
        clearAllIntervals(intervals);
         var temp = setInterval(makeMove, delay,"up");
         intervals.push(temp);
        // makeMove("up");
        console.log("move Up");
        break;
      case 39:
        clearAllIntervals(intervals);
         var temp = setInterval(makeMove, delay,"right");
         intervals.push(temp);
        // makeMove("right");
        console.log("move Right");
        break;
      case 40:
        clearAllIntervals(intervals);
         var temp = setInterval(makeMove, delay,"down");
         intervals.push(temp);
        // makeMove("down");
        console.log("move Down");
        break;
      default:
        console.log("Please use arrow keys");
        break;
    }
  });
}
function makeGrid(row, col, tab) {
  let count = 1;
  for (let i = 1; i <= row; i++) {
    $(".grid-table tbody").append(`<tr id="${i + "r"}" ></tr>`);
    for (let j = 1; j <= col; j++) {
      //   if (count == 50) {
      //     $(".grid-table tbody tr:last")
      //       .append(`<td id="${count}"><svg style="color: grey; height: 10px; width: 10px" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      //       <circle cx="8" cy="8" r="8"/>
      //     </svg></td>`);
      //   } else {
      $(".grid-table tbody tr:last").append(`<td id="${count}"></td>`);
      //   }
      count += 1;
    }
  }  
  makeBoundries();
}
// function not to be exported

function makeMove(dir) {
  switch (dir) {
    case "left":
      // console.log("hi");
      if (!(Snake.lastPos == Snake.headPos - 1)) {
        let nextPos= $(`#${Snake.headPos - 1}`);
        // console.log(Snake.headPos,$(`#${Snake.headPos}`).attr("id"));
        if (nextPos.hasClass("bgRed")) {
          gameOver();
        }else if (
          !nextPos.hasClass("bgRed") &&
          !(Snake.headPos - 1 == Snake.lastPos)
        ) {

          if (nextPos.hasClass("food")) {
            Snake.updateHead(Snake.headPos - 1, true);
          } else {
            Snake.updateHead(Snake.headPos - 1, false);
          }
          
        }
      }
      break;
    case "up":
      if (!(Snake.lastPos == Snake.headPos - noOfCol)) {
        let nextPos= $(`#${Snake.headPos - noOfCol}`);
        if (nextPos.hasClass("bgRed")) {
          gameOver();
        }else if (
          !nextPos.hasClass("bgRed") &&
          !(Snake.headPos - noOfCol == Snake.lastPos)
        ) {

          if (nextPos.hasClass("food")) {
            Snake.updateHead(Snake.headPos - noOfCol, true);
          } else {
            Snake.updateHead(Snake.headPos - noOfCol, false);
          }

          
        }
      }
      break;
    case "right":
      if (!(Snake.lastPos == Snake.headPos + 1)) {
        let nextPos = $(`#${Snake.headPos + 1}`);
        if (nextPos.hasClass("bgRed")) {
          gameOver();
        }else if (
          !nextPos.hasClass("bgRed") &&
          !(Snake.headPos + 1 == Snake.lastPos)
        ) {

          if (nextPos.hasClass("food")) {
            Snake.updateHead(Snake.headPos + 1, true);
          } else {
            Snake.updateHead(Snake.headPos + 1, false);
          }
       
        }
      }
      break;
    case "down":
      if (!(Snake.lastPos == Snake.headPos + noOfCol)) {
        let nextPos = $(`#${Snake.headPos + noOfCol}`);
        if (nextPos.hasClass("bgRed")) {
          gameOver();
        }else if (
          !nextPos.hasClass("bgRed") &&
          !(Snake.headPos + noOfCol == Snake.lastPos)
        ) {
          if (nextPos.hasClass("food")) {
            Snake.updateHead(Snake.headPos + noOfCol, true);
          } else {
            Snake.updateHead(Snake.headPos + noOfCol, false);
          }
          // Snake.updateHead(Snake.headPos + noOfCol, true);
        }
      }
      break;
    default:
      break;
  }
}
function makeBoundries() {
  $(".grid-table tbody tr:last > td").each(function () {
    $(this).addClass("bgRed");
  });
  $(".grid-table tbody tr:first > td").each(function () {
    $(this).addClass("bgRed");
  });
  $(".grid-table tbody > tr > td:last-child").each(function () {
    $(this).addClass("bgRed");
    // console.log(this.parent());
  });
  $(".grid-table tbody > tr > td:first-child").each(function () {
    $(this).addClass("bgRed");
    // console.log(this.parent());
  });
}
function gameOver(len) {
  alert(`game over!! Score:${Snake.length}`);
  reset();
}
function reset() {
  clearAllIntervals(intervals);
  setTimeout(location.reload(), 100);
}

function clearAllIntervals(ar) {
  if (ar.length) {
    for (let i=0 ; i<ar.length;i++) {
      clearInterval(ar[i]);
    }
    console.log("All intervals are cleared");
  }else{
    console.log("there is no intervals to clear");
  }
}
export { intialPos, movement ,makeGrid ,snakeFood, Snake};
