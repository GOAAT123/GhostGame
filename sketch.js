var gameState="play";
var tower, towerImage;
var door, doorImage;
var doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage
var invBlock, invBlockGroup;

function preload(){
towerImage=loadImage("tower.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png");
ghostImage=loadImage("ghost-standing.png");
}

function setup(){ 
createCanvas(600, 600);
tower=createSprite(300, 300);
tower.addImage("towerImage", towerImage);
tower.velocityY=1;
  
ghost=createSprite(200, 200);
ghost.addImage("ghostImage", ghostImage);
ghost.scale=0.4;
 
invBlockGroup=createGroup();  
doorGroup=createGroup();
climberGroup=createGroup();
  
}

function draw(){
background(0);
  
if (gameState==="play"){
    
  
if(tower.y>400){
tower.y=300;   
}
if(keyDown("space")){
ghost.velocityY=-5;
   }  
  ghost.velocityY=ghost.velocityY+0.8;
  
   if(keyDown("left_arrow")){
     ghost.x=ghost.x-3
   }  
if(keyDown("right_arrow")){
ghost.x=ghost.x+3
}  
if (climberGroup.isTouching(ghost)){
ghost.velocityY=0;
}
if(invBlockGroup.isTouching(ghost)|| ghost.y>600){
   ghost.destroy();
  
  gameState="end";
   }
  
spawnDoors();  

drawSprites();
}
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}
  
function spawnDoors(){
if(frameCount%240 === 0){
door=createSprite(200, -50);
door.addImage("doorImage", doorImage);
door.x=Math.round(random(120, 400))
door.velocityY=1;
door.lifetime=600;

  doorGroup.add(door);
  
climber=createSprite(200, 10);
climber.addImage("climberImage", climberImage);
climber.velocityY=1;
climber.x=door.x;
climber.lifetime=600;

  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  
  climberGroup.add(climber);
  
invBlock=createSprite(200, 15);
invBlock.width=climber.width;
invBlock.height=2;
invBlock.x=door.x;
invBlock.velocityY=1;
invBlock.debug=true;
invBlock.lifetime=600;
  
  invBlockGroup.add(invBlock);
}
}