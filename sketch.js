var dog, dogImg, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock, showError);
  foodStock.set(20);

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  
}


function draw() {  
  background("green");
  drawSprites();

  textSize(20);
  fill("white");
  text("Note: Press UpArrow Key To Feed DRAGO Milk!", 40, 50);
  text("Food Remaining : " + foodS, 150, 100);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS===0){
    foodS=20;
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function showError(){
  console.log(virtualPet1);
}

