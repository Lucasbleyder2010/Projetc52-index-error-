var Mario,Marioimg
var Bowser,Bowserimg
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, groundImage;
var obstaclesGroup, obstacle1,obstacle1img
var restart,restartimg
var gameOver


function preload() {
    Marioimg = loadImage("Mario.png")
    Bowserimg = loadImage("Bowser.png")
    groundimg = loadImage("Ground.png");
    obstacle1img = loadImage("turtle.png")
    restartimg = loadImage("restart.png")
}
function setup(){
        createCanvas(windowWidth,windowHeight);
        
        Mario = createSprite(50,height-20,20,50)
        Mario.scale = 0.5           
        Bowser = createSprite(50,height-20,20,50);
        Bowser.scale = 0.6
        gameOver = createSprite(width/2,height/2)
        ground = createSprite(width/2,height-20,width,20);
        ground.x = ground.width /2;
        console.log("Olá" + 5);
        Mario.setCollider("circle",0,0,50);
        Mario.debug= false
        score = 0;
}
function draw() {
    background(180);
    text("bem vindo", width-200,height/2);
    
    if(gameState === PLAY){
         
    
      ground.velocityX = -(4+3*score/100);
     
      score = score + Math.round(getFrameRate()/60);
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
     
      if((touches.lenght>0 ||keyDown("space"))&& trex.y >= height-70) {
          Mario.velocityY = -13;
          touches = []
        }
      
    
      Mario.velocityY = trex.velocityY + 0.8
    
    
      
    
     
      spawnObstacle();
      
      if(obstaclesGroup.isTouching(Mario)){
        gameState = END;
        Mario.velocityY = -10
      }
     
    }
     else if (gameState === END) {
         
        ground.velocityX = 0;
        Mario.velocityY = 0
       obstaclesGroup.setVelocityXEach(0);
       gameOver.visible = true;
       restart.visible = true;
      obstaclesGroup.setLifetimeEach(-1);
      if(mousePressedOver(restart)){
      reset()
      }
    }
    
   
  
    Mario.collide(invisibleGround);
    
    
    
    drawSprites();
  }
  function reset(){
  console.log("resetGame")
  gameState = PLAY
  obstaclesGroup.destroyEach()
  gameOver.visible = false
  restart.visible = false
  
  }
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(width,height-30,10,40);
     obstacle.velocityX = -(6+score/100);
     
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        default: break;
      }
     
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
     
      obstacleGroup.add(obstacle);
   }
  }