let allMonsters;
let monsterList;
let monster;
let index = 0;
let currentCR = 1;
let pageSkip = false;

let backgroundImg;
let lighting;
let candleLight;
let book;
let bookBlank;
let sizeImages;

let pageFlip;
let tavernAmbience;

let helpPage = true;

function preload() {
  allMonsters = loadJSON("monsters.json");
  book = loadImage("Book.png");
  bookBlank = loadImage("BookBlank.png");

  backgroundImg = loadImage("Background.png");
  lighting = loadImage("lighting.png");
  candleLight = loadImage("candlelighting.png");

  pageFlip = loadSound("pageflip_monster.mp3");
  tavernAmbience = loadSound("255_The_Hearth_Inn.mp3");

  sizeImages = {
    Tiny: loadImage("size_0.png"),
    Small: loadImage("size_1.png"),
    Medium: loadImage("size_2.png"),
    Large: loadImage("size_3.png"),
    Huge: loadImage("size_4.png"),
    Gargantuan: loadImage("size_5.png"),
  };
}

function setup() {
  let HTMLCanvas = createCanvas(640, 480);
  HTMLCanvas.parent("canvas-container"); 
  
  tavernAmbience.setVolume(0.3);
  tavernAmbience.play();
  textFont("MedievalSharp");
  textSize(16);
  fill(255);
  background(20);
  allMonsters = Object.values(allMonsters);
  filterCR(currentCR);
  loadMonster(index);
}

function filterCR(cr) {
  if (cr === 0) {
    monsterList = allMonsters.filter(
      (i) =>
        parseFloat(i.challenge_rating) >= 0 &&
        parseFloat(i.challenge_rating) < 1
    );
  } else {
    monsterList = allMonsters.filter(
      (i) => parseFloat(i.challenge_rating) === cr
    );
  }

  index = 0;
  if (monsterList.length > 0) {
    loadMonster(index);
  } else {
    forceNextPage();
  }
}

function loadMonster(i) {
  if (monsterList && i >= 0 && i < monsterList.length) {
    monster = monsterList[i];
  }
}

function draw() {
  pageFlip.setVolume(0.25);

  fill(37, 21, 5);
  image(backgroundImg, 0, 0, 640, 480);
  image(book, 0, 0, 640, 480);



  if (helpPage == true) {
    
      image(bookBlank, 0, 0, 640, 480);

    textAlign(CENTER);

    textSize(28);
    text("Monster", 190, 130);
        text("Manual", 190, 160);
        textSize(16);

            text("By Irwin Jin", 190, 190);
    
            textSize(16);

                text("Press SPACE to continue", 190, 320);
                textSize(20);

        text("Controls", 450, 130);
            textSize(16);

    textAlign(LEFT);


    text("Next Page:", 350, 180);
    text("Last Page: ", 350, 210);
    text("Raise CR: ", 350, 240);
    text("Lower CR: ", 350, 270);
    text("Random Page: ", 350, 300);
        text("Help: ", 350, 330);



    textAlign(RIGHT);

    text("Right Arrow", 550, 180);
    text("Left Arrow", 550, 240);
    text("Up Arrow", 550, 210);
    text("Down Arrow", 550, 270);
    text("[R]", 550, 300);
        text("[I]", 550, 330);




    
    
  } else {
    textAlign(LEFT);
    if (currentCR == 0) {
      textSize(16);

      text("CR 0-1", 580, 195);
    } else {
      textSize(16);

      text("CR " + currentCR, 580, 195);
    }
    textAlign(CENTER);

    textSize(20);
    text(monster.name, 190, 130);

    textSize(16);

    text(monster.strength, 280, 165);
    text(monster.dexterity, 280, 195);
    text(monster.constitution, 280, 225);
    text(monster.intelligence, 280, 255);
    text(monster.wisdom, 280, 285);
    text(monster.charisma, 280, 315);

    textAlign(LEFT);
    textSize(20);

    text("Monster " + (index + 1) + " / " + monsterList.length, 385, 130);
    textSize(16);

    text("STR", 220, 165);
    text("DEX", 220, 195);
    text("CON", 220, 225);
    text("INT", 220, 255);
    text("WIS", 220, 285);
    text("CHA", 220, 315);

    text("Size: " + monster.size, 80, 165);
    let bookImg = sizeImages[monster.size];
    image(bookImg, 80, 170, 120, 160);

    text("Type: ", 350, 180);
    text("Armor Class: ", 350, 240);
    text("Hit Points: ", 350, 210);
    text("Challenge: ", 350, 270);

    textAlign(RIGHT);

    text(monster.type, 550, 180);
    text(monster.armor_class[0].value, 550, 240);
    text(monster.hit_points, 550, 210);
    text(monster.challenge_rating, 550, 270);
  }
    textAlign(LEFT);
  textSize(16);
  text("Help(i) ", 10, 155);

    tint(255, 125);

  image(lighting, 0, 0, 640, 480);

  tint(255, random(180, 220));
  image(candleLight, 0, 0, 640, 480);

  tint(255, 255);

}

function keyPressed() {
  if (helpPage == false) {
    if (keyCode === UP_ARROW) {
      pageSkip = true;
      currentCR++;
      filterCR(currentCR);
      flipPage();
    } else if (keyCode === DOWN_ARROW) {
      pageSkip = false;
      currentCR--;
      filterCR(currentCR);
      flipPage();
    }
    if (keyCode === RIGHT_ARROW && index < monsterList.length - 1) {
      index++;
      loadMonster(index);
      flipPage();
    } else if (keyCode === LEFT_ARROW && index > 0) {
      index--;
      loadMonster(index);
      flipPage();
    } else if (key == "r") {
      index = floor(random(0, monsterList.length));
      loadMonster(index);
      flipPage();
    }
  }
  if (key == "i" || key == " ") {
    if (helpPage == true) {
      helpPage = false;
    } else helpPage = true;
  }
}

function forceNextPage() {
  if (pageSkip == true) {
    if (currentCR < 30) {
      currentCR++;
      filterCR(currentCR);
    } else {
      currentCR = 0;
      filterCR(currentCR);
    }
  } else {
    if (currentCR > 0) {
      currentCR--;
      filterCR(currentCR);
    } else {
      currentCR = 30;
      filterCR(currentCR);
    }
  }
}

function flipPage() {
  pageFlip.setPitch(random(60, 70));
  pageFlip.play();
}
