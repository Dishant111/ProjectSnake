function createWall() {
  var $body = $(".grid-table tbody");
  $body.on("mousedown", function (evt) {
    $("td").mouseover(function () {
      if ($(this).hasClass("bgBlack")) {
        $(this).removeClass("bgBlack").addClass("bgWhite");
      } else if ($(this).hasClass("bgWhite")) {
        $(this).removeClass("bgWhite").addClass("bgBlack");
      } else {
        $(this).addClass("bgBlack");
      }

      // console.log($(this).css("background-color"));
      // console.log("color");
      return false;
    });
    $body.on("mouseup", function () {
      // console.log("all event offed");
      $("td").off("mouseover");
    });
    // console.log("done");
  });
}

export { createWall };
