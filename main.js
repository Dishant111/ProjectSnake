import { noOfRow, noOfCol } from "./initParam.js";
import { intialPos, movement,makeGrid , snakeFood,Snake } from "./snakeLib.js";

$(document).ready(function () {
  console.log(noOfRow, noOfCol, noOfCol * noOfRow);
  makeGrid(noOfRow, noOfCol);
  intialPos();
  movement();
  snakeFood();
  // console.log(Snake);
  // console.log(snakeFood());
});

