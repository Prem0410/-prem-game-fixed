var car;
var carImg;
var SERVE = 0;
var PLAY = 1;
var END = 2;
var gameState = SERVE;
var gameOver,restart;
var form;
var ground;
var bullet;
var score;
var canvs, backgroundImg;
var button1,button2
var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;



function preload(){
   backgroundImg = loadImage("sprites/track.jpg");
   carImg = loadImage("sprites/car.png");
   obstacle1 = loadImage("sprites/obstacle1.png");
   obstacle2 = loadImage("sprites/obstacle2.png");
   obstacle3 = loadImage("sprites/obstacle3.png");
   obstacle4 = loadImage("sprites/obstacle4.png");
   obstacle5 = loadImage("sprites/obstacle5.png");
   obstacle6 = loadImage("sprites/obstacle6.png");

   
   
   // ground = loadImage("track.png");
   
}
function setup(){
    createCanvas(windowWidth,windowHeight);
    track = createSprite(windowWidth/2,windowHeight/2,100,100);
    track.addImage("track",backgroundImg)
    image(backgroundImg, windowWidth*2,-windowHeight*4,windowWidth/2, windowHeight*5);
    track.velocityY = -8;
    form = new Form();

    car = createSprite(windowWidth/2,windowHeight/2,50,50);
    car.addImage("car",carImg,10,10);
    car.scale = 0.1
    //car.debug = true;
    car.setCollider("circle",0,0,400)

    this.button2 = createButton('Restart');
    this.button2.position(displayWidth/2,displayHeight/2 + 50);
    


    obstacleGroup = new Group();

}
function draw(){
    background(101,101,101);
    
    
    if(track.y < 0){
        track.y = track.height/2
    }
   if(gameState === SERVE){
        form = new Form();
        form.display();
        gameState = 1;
    }
   
  else if(gameState === PLAY){
       
       score = score + Math.round(getFrameRate()/60);
       textSize(30);
       text("Score:"+ score,windowWidth/1,windowHeight/1)
      car.x = mouseX;
      //createBullet(player.x);
      spawnObstacle();
      if(obstacleGroup.isTouching(car)){
       gameState = END;
       textSize(20);
       text("YOU LOSE",windowWidth/2,windowHeight/2)
      }
    }
    else if(gameState === END){
        textSize(30);
       text("YOU LOSE",windowWidth/2,windowHeight/2);
       obstacleGroup.setVelocityYEach(0);
       obstacleGroup.setLifetimeEach(-1);

       if(mousePressedOver(button2)){
           reset();
       }

      
     }

  drawSprites();
}
function spawnObstacle(){
    if(frameCount % 30 === 0){
        var obstacle = createSprite(windowWidth/0.5,50,10,10);
        //obstacle.debug = true;
        obstacle.velocityY = 9;
        obstacle.velocityY = -(8 +4*score/100);

        obstacle.x = random(400,windowWidth-400);
        var rand = Math.round(random(1,5));
        switch(rand){
            case 1 : obstacle.addImage("obstacle",obstacle1);
            break;
            case 2 : obstacle.addImage("obstacle",obstacle2);
            break;
            case 3 : obstacle.addImage("obstacle",obstacle3);
            break;
            case 4 : obstacle.addImage("obstacle",obstacle4);
            break;
            case 5 : obstacle.addImage("obstacle",obstacle5);
            break;
            case 6 : obstacle.addImage("obstacle",obstacle6);
            break;
            default : break;
        }
        obstacle.scale = 0.1;
        console.log(car.x);
        obstacle.setCollider("circle",0,0,400);
        car.depth = obstacle.depth;
        car.depth = car.depth + 1;

        
        obstacleGroup.add(obstacle);
        //obstacle.lifetime = 300;
    }
    
}
function reset(){
    gameState = PLAY;
    obstacleGroup.destroyEach();


}