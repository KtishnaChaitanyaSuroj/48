
const PLAY = 1
const END = 0
var gameState = PLAY



var bg,bgImg;
var runner,runnerAnim,collideImg;
var dragonImgs,spikeImg,snakesImgs;
var obstacle,obstacleGroup;
var score = 0;
var restart,restartImg;

 // localStorage["HighestScore"] = 0


function preload(){
  bgImg = loadImage("bg.png")
  runnerAnim = loadAnimation
("sprite_00.png","sprite_01.png","sprite_02.png","sprite_04.png","sprite_05.png","sprite_06.png","sprite_07.png");
  dragonImgs = loadAnimation("sprite_0.png","sprite_1.png");
  spikeImg = loadImage("spikes.png");
  snakesImgs = loadAnimation
("snake1.png","snake2.png","snake3.png","snake4.png","snake5.png")
  collideImg = loadAnimation("sprite_00.png")
  restartImg = loadImage("restart.png")
}


function setup(){
  createCanvas(750,400);
  
  obstacleGroup = new Group();
  
  bg = createSprite(100,200,1000);
  // bg.shapeColor = "white"
   bg.addImage(bgImg)
   bg.scale = 2.14
  
  bg.x = bg.width/2
  
  runner = createSprite(100,360,30,30)
  runner.addAnimation("running",runnerAnim)
  runner.addAnimation("colliding",collideImg)
  runner.scale = 0.2
  
  invisibleGround = createSprite(500,390,1000,10);
  invisibleGround.visible = false;
  
  restart = createSprite(375,200,100,30);
  restart.addImage(restartImg)
  restart.scale = 0.3
}

function draw() {
  background("grey")
  
  if(gameState === PLAY){
    
    bg.velocityX = -6
     
  if(bg.x < 250){
    bg.x = 500
  }
  
  if(keyDown("space") && runner.y > 330){
  runner.velocityY = -12
  }
    runner.velocityY = runner.velocityY + 0.4
  //console.log(runner.y)
  runner.collide(invisibleGround)
    
    
    score = score+Math.floor(getFrameRate()/60)
    restart.visible = false
    
  if(runner.isTouching(obstacleGroup)){
    gameState = END
  }}
  
  
    if(gameState === END){
     runner.changeAnimation("colliding",collideImg)
   // obstacle.velocityX = 0
    bg.velocityX = 0
    obstacleGroup.destroyEach()
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    runner.collide(invisibleGround)  
    runner.velocityY = 0  
    restart.visible = true  
      
  if(mousePressedOver(restart)){
    reset();
  }
  }
 
  
  runner.debug = true
  runner.setCollider("rectangle",0,0,140,400)
  
 
 
 drawSprites()
    text("score:" + score , 375,100)
 createObstacles() 
  
    // text("HI:" + localStorage["HighestScore"], 330,100) 
  
 }

function createObstacles(){
  if(frameCount%100 === 0){
  obstacle = createSprite(750,350,20,20)
  obstacle.velocityX = -4
 
  var rand = Math.round(random(1,3))
  
  switch(rand){
       case 1 : obstacle.addImage(spikeImg)
            break;
       case 2 : obstacle.addAnimation("fire",dragonImgs)
            break;
       case 3 : obstacle.addAnimation("venom",snakesImgs)
            break;
            default:break;  
      }  
    obstacle.scale = 0.30  
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 250
  }
}

 function reset(){
   gameState = PLAY
   runner.changeAnimation("running",runnerAnim)
   obstacleGroup.setVelocityXEach(-4)
   obstacleGroup.setLifetimeEach(250)
   
   // if(localStorage["HighestScore"]>score){
   //    localStorage["HighestScore"]=score
   // }
   score = 0
 }