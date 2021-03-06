var frameWidth = 39.47;
var frameHeight = 61;
var tFrame = 14; // total frames
var cFrame = 0; // the current frame it is on
var mySprite; // name of my image holder
var pause = false; // boolean to know what state the game is in
var fighterArray = []; // array that holds all fighters
var arrowArray = []; // array that holds all arrows
var ufoArray = []; // array that holds all ufos
var speed = Math.floor((Math.random() * 6) + 2); //speed of the units, different each playthrough

var gc;
var canvas;
var totalFrame;
var deathCheck;  // var that holds data of fighter deaths
var deathCheck1;  // var that holds data of ufo deaths
var pauseSwitch;  // holds info of play/pause buttons
var checkXpos;   // hold X position of screen touch
var checkYpos;    // hold Y position of screen touch


var fighterYloc = 1016;  // Y loc of fighters
var fighterLoc0 = -400;  //initial Xloc of fighters

var ufoX = -600;
var ufoY = 650;
var ufoSpeed = 4;
var ufoHeight = 106;
var ufoWidth = 150;

var stage2alert = true;    // booleans to hold info of what stage the game is in
var stage3alert = false;  //
var stage4alert = false; //
var arrows;
//other variables
var castleLife = 1000;
var arrowX = -300;
var arrowY = 300;
var arrowCount = 0;
var deathCount = 0;
var stage1 = false;
var stage2 = false;
var stage3 = false;
var stage4 = false;
var pauseCheck = 1;
var castleY = 675;

window.onload = function () {
  // load canvas and graphic content
  canvas = document.getElementById("myCanvas");
  gc = canvas.getContext("2d");
  //Event listeners
  document.addEventListener("click", mouseClickHandler, false);
  document.addEventListener("click", pause2, false);
  window.setInterval(render, 35);
  window.setInterval(arrowDownRender, 16);

  //Loading images
  background = document.getElementById("background");
  castle = document.getElementById("castle");
  mySprite = document.getElementById("fighter");
  arrow = document.getElementById("arrow");
  ufo = document.getElementById("ufo");
  pauseI = document.getElementById("pause");
  pauseSwitch = pauseI;
  playI = document.getElementById("play");
  exit = document.getElementById("exit");

  swal({   //Sweet alert JS library
    title: "Welcome to CastleDefender!",
    text: ("Tap the screen to shoot enemies with arrows!"),
    type: "info",
    showCancelButton: false,
    confirmButtonColor: "#006600",
    confirmButtonText: "lets begin!",
    closeOnConfirm: true
  },
    function (isConfirm) {
      stage1 = true;
      populateS1();
    });
}

function pause2(event) {

  event.preventDefault();
  checkXpos = event.clientX; // var that holds info of what are the player touched
  checkYpos = event.clientY; //

  if (checkXpos > 1700 && checkXpos < 1870 && checkYpos > 50 && checkYpos < 220) { // if player click this canvas area then pause
    if (pauseCheck > 0) {
      pause = true;
      pauseCheck = pauseCheck * -1;
      pauseSwitch = playI;

      //Using *-1 to get the double negative into positive and vice versa
    }
    else if (pauseCheck < 0) {
      pause = false;
      pauseCheck = pauseCheck * -1;
      pauseSwitch = pauseI;

    }
  }
  if (checkXpos > 30 && checkXpos < 200 && checkYpos > 55 && checkYpos < 155) {
    window.location.href = "index.html";  // if player clicks exit, load index.html

  }
}

function mouseClickHandler(event) {  // on touch, shoot arrow
  if (pause == false) {
    if (event.target.tagName.localeCompare("canvas") && event.button == 0) {
      if (checkXpos < 1700 || checkXpos > 1870 && checkYpos < 50 || checkYpos > 220) {
        if (arrows !== 0) {
          arrowCount = arrowCount + 1;
          arrowX = event.clientX;
          arrowY = -50;
          arrowArray.push({ file: arrow, x: arrowX, y: arrowY });
          arrows = arrows - 1;
        }
      }
    }
  }
}

function populateS1() {   // fires on game start, populates fighter array with enemies
  arrows = 15;
  for (var i = 0; i < 5; i++) {
    fighterArray.push({ file: mySprite, frame: totalFrame, zero: 0, frameW: frameWidth, frameH: frameHeight, locationX: fighterLoc0 -= 50, locationY: fighterYloc, frameW2: frameWidth, frameH2: frameHeight, life: true, speed: speed });
  }
}

function populateS2() {  // fires on stage 1 completion, resets the array then repopulates it
  arrows += 35;
  fighterArray = [];
  fighterLoc0 = -400;
  for (var i = 0; i < 20; i++) {
    fighterArray.push({ file: mySprite, frame: totalFrame, zero: 0, frameW: frameWidth, frameH: frameHeight, locationX: fighterLoc0 -= 50, locationY: fighterYloc, frameW2: frameWidth, frameH2: frameHeight, life: true, speed: speed });
  }
}

function populateS3() {  // fires on stage 2 completion, resets the array then repopulates it
  arrows = +50;
  fighterArray = [];
  fighterLoc0 = -400;
  for (var i = 0; i < 40; i++) {
    fighterArray.push({ file: mySprite, frame: totalFrame, zero: 0, frameW: frameWidth, frameH: frameHeight, locationX: fighterLoc0 -= 50, locationY: fighterYloc, frameW2: frameWidth, frameH2: frameHeight, life: true, speed: speed });
  }
}

function populateS4() { // fires on stage 3 completion, resets the array then repopulates it
  arrows += 50; // add arrows to player
  fighterArray = [];  // reset array
  fighterLoc0 = -400;
  for (var i = 0; i < 40; i++) {
    fighterArray.push({ file: mySprite, frame: totalFrame, zero: 0, frameW: frameWidth, frameH: frameHeight, locationX: fighterLoc0 -= 50, locationY: fighterYloc, frameW2: frameWidth, frameH2: frameHeight, life: true, speed: speed });
  }
  for (var j = 0; j < 10; j++) {   // stage 4 has ufos in it, populate ufo array
    ufoArray.push({ file: ufo, locationX: ufoX -= 200, locationY: ufoY, life: true, speed: ufoSpeed, hp: 10 });
  }
}

function drawArrow(arrows) {   // constructor of arrows
  gc.drawImage(arrows.file, arrows.x, arrows.y);
}

function drawFighter(fighters) {  // constructor of fighters
  gc.drawImage(fighters.file, cFrame * frameWidth, fighters.zero, fighters.frameW, fighters.frameH, fighters.locationX, fighters.locationY, fighters.frameW2, fighters.frameH2);
}

function drawUfo(ufos) {  // constructor of ufos
  gc.drawImage(ufos.file, ufos.locationX, ufos.locationY);
}

function arrowDownRender() {
  if (pause == false) {                                  //this function renders the arrow, little faster then render function which renders other graphics
    for (var i = 0; i < arrowArray.length; i++) {
      drawArrow(arrowArray[i]);


      if (arrowY < 1080 && arrowArray[i].y < 1080) {
        arrowArray[i].y += 32;
      }
    }
  }
}

//renders all graphic content /////////////////////////////////////////////////////////////////////////////////////////////////
function render() {
  gc.drawImage(background, 0, 0);  // draw background
  gc.drawImage(pauseSwitch, 1700, 50);  // draw pause button, the var pauseSwitch changes depending on what state the game is in(pause/play)
  gc.drawImage(exit, 30, 55); // draw exit button
  gc.drawImage(castle, 800, castleY); // draw castle
  gc.font = "50px Georgia";
  gc.fillText("Castle durability: " + castleLife, 950, 50); // draw UI
  gc.fillText("Score: " + deathCount, 950, 100);  // UI
  gc.fillText("Arrows left: " + arrows, 950, 150); // UI
  gc.drawImage(arrow, arrowX, arrowY);

  if (castleLife <= 0) {   //if the castle is destoyed, player loses the game
    castleY = castleY += 5;
    if (castleY > 1000) {
      pause = true;

      swal({  //Sweetalert
        title: "YOU LOST!",
        text: "Try again or exit",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#006600",
        confirmButtonText: "New Game",
        closeButtonText: "Exit",
        closeButtonColor: '#ff0000',
        closeOnConfirm: false,
        closeOnCancel: false
      },
        function (isConfirm) {
          if (isConfirm) {
            location.reload();  // reload game

          } else {
            window.location.href = "index.html";  // go back to menu
          }
        });
    }
  }

  for (var i = 0; i < fighterArray.length; i++) {  // checks if every fighter is dead
    if (fighterArray[i].life == false && deathCheck < fighterArray.length) {
      deathCheck++;
    }
    else {
      deathCheck = 0;
    }
  }

  for (var i = 0; i < ufoArray.length; i++) {   // checks if every ufo is dead
    if (ufoArray[i].hp <= 0 && deathCheck1 < ufoArray.length) {
      deathCheck1++;
    }
    else {
      deathCheck1 = 0;
    }
  }

  cFrame = (cFrame + 1) % tFrame; //loops the frames of the fighters
  //STAGE 1  //////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////
  if (stage1 == true) {

    for (var i = 0; i < fighterArray.length; i++) {  // loop through the fighter array and draw all fighters
      if (fighterArray[i].life == true) {
        drawFighter(fighterArray[i]);  // using constructor
      }

      if (pause == false) {     //make fighter move
        if (fighterArray[i].locationX <= 1000 && fighterArray[i].life == true) {
          fighterArray[i].locationX += fighterArray[i].speed;
        }
        if (fighterArray[i].locationX >= 1000 && fighterArray[i].life == true) {
          castleLife -= 2;
          navigator.vibrate(200);  // PhoneGap plugin
        }
      }
    }

    for (var i = 0; i < arrowArray.length; i++) {  // if arrow colides with fighter then kill fighter
      for (var j = 0; j < fighterArray.length; j++) {
        if (arrowArray[i].x < fighterArray[j].locationX + frameWidth &&
          arrowArray[i].x + arrow.width > fighterArray[j].locationX &&
          arrowArray[i].y < fighterArray[j].locationY + frameHeight &&
          arrow.height + arrowArray[i].y > fighterArray[j].locationY) {
          fighterArray[j].life = false;
          deathCount = deathCount + 1;
        }
      }
    }
  }

  //STAGE 2   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (deathCheck == fighterArray.length && stage2alert == true && stage3alert == false && castleY == 675) {
    swal({  //SweetAlert JS library
      title: "Stage 1 completed!",
      text: "Get ready for stage 2!",
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#006600",
      confirmButtonText: "go!",
      closeOnConfirm: true
    },
      function (isConfirm) {
        stage2 = true;
        stage2alert = false;
        stage1 = false;
        stage3alert = true;
        populateS2(); // populate array after stage 1 completed
      });
  }

  if (stage2 == true) {

    for (var i = 0; i < fighterArray.length; i++) {
      if (fighterArray[i].life == true) {
        drawFighter(fighterArray[i]);
      }
      if (pause == false) {      // Change X location of fighters, makes them walk
        if (fighterArray[i].locationX <= 1000 && fighterArray[i].life == true) {
          fighterArray[i].locationX += fighterArray[i].speed + (0.2 * fighterArray[i].speed);
        }
        if (fighterArray[i].locationX >= 1000 && fighterArray[i].life == true) {
          castleLife -= 2;
          navigator.vibrate(200); // PhoneGap plugin
        }
      }
    }

    for (var i = 0; i < arrowArray.length; i++) {  // IF any arrow colides with any fighter, kill fighter
      for (var j = 0; j < fighterArray.length; j++) {
        if (arrowArray[i].x < fighterArray[j].locationX + frameWidth &&
          arrowArray[i].x + arrow.width > fighterArray[j].locationX &&
          arrowArray[i].y < fighterArray[j].locationY + frameHeight &&
          arrow.height + arrowArray[i].y > fighterArray[j].locationY) {
          fighterArray[j].life = false;
          deathCount = deathCount + 1;
        }
      }
    }
  }
  //STAGE 3   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (deathCheck == fighterArray.length && stage3alert == true && stage2alert == false && castleY == 675) {
    swal({ //SweetAlert JS library
      title: "Stage 2 completed!",
      text: "Get ready for stage 3! More incoming!",
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#006600",
      confirmButtonText: "go!",
      closeOnConfirm: true
    },
      function (isConfirm) {
        stage3 = true;
        stage3alert = false;
        stage2 = false;
        stage4alert = true;
        populateS3();
      });
  }

  if (stage3 == true) {

    for (var i = 0; i < fighterArray.length; i++) {
      if (fighterArray[i].life == true) {
        drawFighter(fighterArray[i]);
      }
      if (pause == false) {      // Change X location of fighters, makes them walk
        if (fighterArray[i].locationX <= 1000 && fighterArray[i].life == true) {
          fighterArray[i].locationX += fighterArray[i].speed + (0.2 * fighterArray[i].speed);
        }
        if (fighterArray[i].locationX >= 1000 && fighterArray[i].life == true) {
          castleLife -= 2;
          navigator.vibrate(200); // PhoneGap plugin
        }
      }
    }

    for (var i = 0; i < arrowArray.length; i++) { // IF any arrow colides with any fighter, kill fighter
      for (var j = 0; j < fighterArray.length; j++) {
        if (arrowArray[i].x < fighterArray[j].locationX + frameWidth &&
          arrowArray[i].x + arrow.width > fighterArray[j].locationX &&
          arrowArray[i].y < fighterArray[j].locationY + frameHeight &&
          arrow.height + arrowArray[i].y > fighterArray[j].locationY) {
          fighterArray[j].life = false;
          deathCount = deathCount + 1;
          console.log("collision");
        }
      }
    }
  }


  //STAGE 4 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (deathCheck == fighterArray.length && stage4alert == true && stage3alert == false && castleY == 675) {
    swal({ //SweetAlert JS library
      title: "Stage 3 completed!",
      text: "Oh no, Aliens are coming! Protect the castle Hero!",
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#006600",
      confirmButtonText: "go!",
      closeOnConfirm: true
    },
      function (isConfirm) {
        stage4 = true;
        stage4alert = false;
        stage3 = false;
        populateS4();
      });
  }

  if (stage4 == true) {

    for (var i = 0; i < fighterArray.length; i++) {
      if (fighterArray[i].life == true) {
        drawFighter(fighterArray[i]);
      }
      if (pause == false) {     // Change X location of fighters, makes them walk
        if (fighterArray[i].locationX <= 1000 && fighterArray[i].life == true) {
          fighterArray[i].locationX += fighterArray[i].speed + (0.2 * fighterArray[i].speed);
        }
        if (fighterArray[i].locationX >= 1000 && fighterArray[i].life == true) {
          castleLife -= 2;
          navigator.vibrate(200); // PhoneGap plugin
        }
      }
    }

    for (var j = 0; j < ufoArray.length; j++) {  // new enemy, ufos, draw ufos
      if (ufoArray[j].hp >= 0) {
        drawUfo(ufoArray[j]); // using constructor to draw ufos
      }
      if (pause == false) {              // Change X location of ufos, makes them fly     
        if (ufoArray[j].locationX <= 1000 && ufoArray[j].life == true) {
          ufoArray[j].locationX += ufoArray[j].speed;
          if (ufoArray[j].locationY == 650) {
            ufoArray[j].locationY++;
          }
          else if (ufoArray[j].locationY == 700) {
            ufoArray[j].locationY--;
          }
        }
        if (ufoArray[j].locationX >= 1000 && ufoArray[j].hp >= 0) {
          castleLife -= 2;
          navigator.vibrate(200); // PhoneGap plugin
        }
      }
    }

    for (var i = 0; i < arrowArray.length; i++) { // collision : arrow with fighter
      for (var j = 0; j < fighterArray.length; j++) {
        if (arrowArray[i].x < fighterArray[j].locationX + frameWidth &&
          arrowArray[i].x + arrow.width > fighterArray[j].locationX &&
          arrowArray[i].y < fighterArray[j].locationY + frameHeight &&
          arrow.height + arrowArray[i].y > fighterArray[j].locationY) {
          fighterArray[j].life = false;
          deathCount = deathCount + 1;
        }
      }
    }

    for (var i = 0; i < arrowArray.length; i++) { // collision : arrow with ufo
      for (var j = 0; j < ufoArray.length; j++) {
        if (arrowArray[i].x < ufoArray[j].locationX + ufoWidth &&
          arrowArray[i].x + arrow.width > ufoArray[j].locationX &&
          arrowArray[i].y < ufoArray[j].locationY + ufoHeight &&
          arrow.height + arrowArray[i].y > ufoArray[j].locationY) {
          ufoArray[j].hp -= 3;
          deathCount = deathCount + 1;
        }
      }
    }
  }

  //Game Won!         //checks if each fighter in stage 3 died, if so sweet alert pops up
  if (deathCheck + deathCheck1 == fighterArray.length + ufoArray.length && stage4alert == false && stage3alert == false && castleY == 675) {
    swal({ //SweetAlert JS library
      title: "YOU WON THE GAME!",
      text: "You are the ultimate Defender!",
      type: "success",
      showCancelButton: true,
      confirmButtonColor: "#006600",
      confirmButtonText: "New Game",
      closeButtonText: "Exit",
      closeButtonColor: '#ff0000',
      closeOnConfirm: false,
      closeOnCancel: false
    },
      function (isConfirm) {
        if (isConfirm) {
          window.location.href = "index.html";

        } else {
          window.location.href = "index.html";
        }
      });
  }

}
function exitApp() {
  navigator.app.exitApp();
  window.close();
}