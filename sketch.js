var  player,player_jumping,player_running
var building,building2,building3,building4,building5;
  var score=0;
var backgroundImg
var gameState="play";
var invisibleGround
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver,gameOverImg;

var bgimage;
function preload(){
backgroundImg=loadImage("bg.png")
groundImg=loadImage("ground2.png");
obstaclimg=loadImage("obstacle.png");
gameOverImg=loadImage("gameover.png");
characterImg=loadImage("player.png");
restartImg = loadImage("restartimage.png");

  
 player_running =   loadAnimation("2.png","12.png");
   player_collided = loadAnimation("dead.png");
}

function setup() {
  createCanvas(400,500);
  bgimage=createSprite(200,200);
bgimage.addImage(backgroundImg);

  bgimage.x = bgimage.width /2;
  
  player=createSprite(40,350,20,20);
   // player.addImage(characterImg)
//  player.addAnimation("running,player_running")
 //   player.scale=0.2
  player.addAnimation("running", player_running)
  player.addAnimation("collided", player_collided);
  player.scale = 0.8;
  // building=createSprite(width-200,500,50,800);
  // building2=createSprite(width-300,500,40,400);
  // building3=createSprite(width-400,500,40,500);
  // building4=createSprite(width-100,500,50,700);
  // building5=createSprite(width-500,500,70,190);
  // //   background= createSprite(300,300);
  // // backgroundImg.addImage("backgroundImg",background);
  // // tower.velocityY = 1;

    invisibleGround = createSprite(0,440,1000,10);
  invisibleGround.visible = false;
  obstaclesGroup = new Group()
   //   invisibleGround.velocityX = -(6 + 3*score/100);
  
  
  
player.setCollider("rectangle",0,0,40,130);
  player.debug = false
  
    restart = createSprite(200,320)
  restart.addImage(restartImg);
  restart.scale=0.4
  
 gameOver = createSprite(210,200,800,800);
   gameOver.addImage(gameOverImg);
 
}

function draw() {
 background("skyblue")


  
  if(gameState==="play"){
    bgimage.velocityX = -4; 
  if (bgimage.x < 0){
      bgimage.x = bgimage .width/2;
    }
  
    spawnObstacles()

  restart.visible = false
gameOver.visible= false;
    if(keyDown("space") && player.y >= 100) {
      player.velocityY = -12;
    }
    
  
    player.velocityY = player.velocityY + 0.8
  player.collide(invisibleGround);
    score = score + Math.round(frameCount/60);
    
    
    restartvisible=false;
    
  if(player.isTouching(obstaclesGroup)){
    gameState="end";
  }
    
   
  
  }
  if(gameState==="end"){
    bgimage.velocityX=0
   gameOver.visible = true
    obstaclesGroup.destroyEach();
    invisibleGround.velocityX=0;
    invisibleGround.velocityY=0;
     player.velocityY = 0
   
    gameOver.scale = 0.2
    player.changeAnimation("collided",player_collided);
     restart.visible=true;
    text("press R key to restart", 200,50)
  }
  
  if(keyDown("r") && gameState==="end"){
gameState="play"; 
gameOver.visible= false; 
player.changeAnimation("running", player_running);
score = 0
}
  
createEdgeSprites();
 drawSprites();
    textSize(30)
  text("Score: "+score,20,50);
}




function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,420,20,100);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.shapeColor = "red"
    //generate random obstacles
    // var rand = Math.round(random(1,6));
    // switch(rand) {
    //   case 1: obstacle.addImage(obstacle1);
    //           break;
    //   case 2: obstacle.addImage(obstacle2);
    //           break;
    //   case 3: obstacle.addImage(obstacle3);
    //           break;
    //   case 4: obstacle.addImage(obstacle4);
    //           break;
    //   case 5: obstacle.addImage(obstacle5);
    //           break;
    //   case 6: obstacle.addImage(obstacle6);
    //           break;
    //   default: break;
    // }
    obstacle.addImage(obstaclimg)
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

