//functions

function Tileset(image, tileWidth, tileHeight) {
    this.image = new Image();
    game.images ++;
    this.image.onload = imageLoaded;
    this.image.src = image;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
}

function updateAnimation(anim) {
    if (Date.now() - anim.frameTimer > anim.frameDuration) {
        if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame ++;
        else anim.currentFrame = 0;
        anim.frameTimer = Date.now();
    }
}

function enemy(goblin, x, y){
	goblin.startingState='down';
	this.stateAnimations = goblin.stateAnimations;
    this.currentState = goblin.startingState;
    this.x = x;
    this.y = y;
    this.width = goblin.width;
    this.height = goblin.height;
    this.speed = goblin.speed;
	this.movement = goblin.movement;
	this.score=goblin.score;
}

function items(theItem, x, y){
	this.stateAnimations = theItem.stateAnimations;
    this.currentState = theItem.currentState;
    this.x = x;
    this.y = y;
    this.width = theItem.width;
    this.height = theItem.height;
    this.speed = theItem.speed;
	this.score=theItem.score;
	this.type=theItem.type;
}

function createCollectables(level){
	var collectables = new Array();
	var colItems = [];
	tChest.score = 300;
	tChest.type='chest';
	heart.score = 100;
	heart.type='heart';
	colItems.push(tChest);
	colItems.push(heart);
	
	for(var a=0; a<level.totalItems; a++){
		var seed = (Math.floor(Math.random()*level.itemSpawns)*2);
		var rand = Math.floor(Math.random()*2);
		var spawnX = (level.itemSpawnArray[seed]*16);
		var spawnY = (level.itemSpawnArray[seed+1]*16);
		collectables.push(new items(colItems[rand], spawnX, spawnY));
	}
	return collectables;
}

function addRandomItem(level){
	level.activeItems++;
	level.activeItemsArray.push(level.itemArray[0]);
	level.itemArray.splice(0,1);
}

function createEnemies(level){
	var levelEnemies= new Array();
	
	var goblins = [];
	goblin.movement = 2;
	goblin2.movement = 4;
	goblin3.movement = 4;
	goblin.score = 100;
	goblin2.score = 200;
	goblin3.score = 200;
	goblins.push(goblin);
	goblins.push(goblin2);
	goblins.push(goblin3);
	
	for(var a=0; a<level.totalEnemyCount; a++){
		var seed = (Math.floor(Math.random()*level.NoOfSpawnSpots)*2);
		var rand = Math.floor(Math.random()*3);
		var spawnX = (level.spawnArray[seed]*16);
		var spawnY = (level.spawnArray[seed+1]*16);
		levelEnemies.push(new enemy(goblins[rand], spawnX, spawnY));
		levelEnemies[levelEnemies.length-1].xDelta = 4;
		levelEnemies[levelEnemies.length-1].yDelta = 50;
		levelEnemies[levelEnemies.length-1].path=[];//createPath(player, levelEnemies[levelEnemies.length-1], level);
	}
	return levelEnemies;
}

function addEnemy(level){
	level.activeEnemies++;
	//createPath(player, level.enemyArray[0]);
	level.activeEnemyArray.push(level.enemyArray[0]);
	level.enemyArray.splice(0,1);
}
function updatePath(player, level){
	for(var i=0; i<level.enemyArray.length; i++){
		createPath(player, level.activeEnemyArray[i]);
	}	
}
function moveEnemies(level){
	
	for(var i=0; i<level.activeEnemyArray.length; i++){
		followPath(level.activeEnemyArray[i]);
	}	
}

function Sprite(stateAnimations, startingState, x, y, width, height, speed) {
    this.stateAnimations = stateAnimations;
    this.currentState = startingState;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
}

function drawSprite(sprite) {
    ctx.drawImage(
        sprite.stateAnimations[sprite.currentState].tileset.image, 
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[0] * sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[1] * sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        Math.round(sprite.x),
        Math.round(sprite.y),
        sprite.width,
        sprite.height
    );
}
function drawSpriteSide(sprite) {
    context.drawImage(	
        sprite.stateAnimations[sprite.currentState].tileset.image, 
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[0] * sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[1] * sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        Math.round(sprite.x),
        Math.round(sprite.y),
        sprite.width,
        sprite.height
    );
}


function Animation(tileset, frames, frameDuration) {
    this.tileset = tileset;
    this.frames = frames;
    this.currentFrame = 0;
    this.frameTimer = Date.now();
    this.frameDuration = frameDuration;
}

function scrollWrapper(x, y){
    var wrapper = document.getElementById('wrapper');  
    wrapper.scrollTop = x;
    wrapper.scrollLeft = y;
}


function sortNumber(a,b) {
    return a - b;
}
function itemCollision(sprite, level){
	var W=16;
	var H=16;
	
	
	var colX, colY;
	var arrayLength = level.activeItemsArray.length;
	console.log("size: "+level.activeItemsArray.length);
	for (var i=0; i<arrayLength; i++){
		colX = level.activeItemsArray[i].x;
		colY = level.activeItemsArray[i].y;
		 
		if(
		(sprite.x+37) < colX + W &&					//left side
		 sprite.x + (sprite.width-38) > colX &&		//right side
		(sprite.y+30) < colY + H &&					//top side
		sprite.y + (sprite.height-13) > colY		//bottom side
		){	
					
			if(level.activeItemsArray[i].type=='chest'){
				score+=level.activeItemsArray[i].score;
				level.activeItems--;
				level.activeItemsArray.splice(i, 1);
				pickup.play();
				return true;
			}
			else if(level.activeItemsArray[i].type=='heart'){
				pickup.play();
				if(lifeCounter==10){
					score+=level.activeItemsArray[i].score;
					level.activeItems--;
					level.activeItemsArray.splice(i, 1);
					return true;
				}
				if(lifeCounter<10){
					increaseLife();
					level.activeItems--;
					level.activeItemsArray.splice(i, 1);
					return true;
				}		
			}
		}
	}
}

function checkCollisions(sprite, level){	
	var W=16;
	var H=16;
	
	var colX, colY;
	var arrayLength = level.collisionArray.length;
	for (var i = 0; i < arrayLength; i+=2) {
		colX = level.collisionArray[i]*16;
		colY = level.collisionArray[i+1]*16;
		
		//adjustments in the formula are to account for collisions with feet only
		
		if(
		(sprite.x+37) < colX + W &&					//left side
		 sprite.x + (sprite.width-38) > colX &&		//right side
		(sprite.y+52) < colY + H &&					//top side
		sprite.y + (sprite.height-13) > colY		//bottom side
		){			
			return true;
		}
	}
	if(
	sprite.x+37 < 0 ||
	sprite.x + sprite.width-38 > level.boundWidth||
	sprite.y+30 < 0 ||
	sprite.y + sprite.height-13 > level.boundHeight
	){
		return true;	
	}
}

function enemyHit(sprite,offSetX1, offSetX2, offSetY1, offSetY2,  level){	
	var W=21;
	var H=28;
	var colX, colY;
	var arrayLength =  level.activeEnemyArray.length;
	
	if(arrayLength>0){
		for (var i = 0; i < arrayLength; i++) {
			colX =  level.activeEnemyArray[i].x;
			colY =  level.activeEnemyArray[i].y;
			
			if(
			(sprite.x+offSetX1) < colX + W &&				//left side
			 sprite.x + (sprite.width-offSetX2) > colX &&	//right side
			(sprite.y+offSetY1) < colY + H &&				//top side
			sprite.y + (sprite.height-offSetY2) > colY		//bottom side
			){		
				swipe.pause();
				hit.play();
				level.activeEnemies--;
				score+=level.activeEnemyArray[i].score;
				level.activeEnemyArray.splice(i,1);
				kills++;
				return;
			}
		}
	}
	return 0;
}

function enemyCollision(sprite, level){	
	var W=16;
	var H=16;
	
	var colX, colY;
	var arrayLength =  level.activeEnemyArray.length;
	
	if(arrayLength>0){
		for (var i = 0; i < arrayLength; i++) {
			colX =  level.activeEnemyArray[i].x;
			colY =  level.activeEnemyArray[i].y;
			
			if(
			(sprite.x+37) < colX + W &&					//left side
			 sprite.x + (sprite.width-38) > colX &&		//right side
			(sprite.y+30) < colY + H &&					//top side
			sprite.y + (sprite.height-13) > colY		//bottom side
			){		
				return true;
			}	
		}
	}
	return false;
}

function clickObject(object){
	if(
	mouse.x < object.x + object.width &&
	mouse.x > object.x &&
	mouse.y < object.y + object.height &&
	mouse.y > object.y
	){
		return true;	
	}
	else
	{
		return false;
	}
}
function decreaseLife(){
	life.width=life.width-8.5;
	lifeCounter--;	
}
function increaseLife(){
	life.width=life.width+8.5;
	lifeCounter++;	
}

function backgroundMovement(forest){
	
	if(forest.x<-1320){
		direction = 'right';
	}
	if(forest.x>0){
		direction = 'left';
	}
	
	if(direction == 'left'){
		forest.x-=1;
	}
	if(direction == 'right'){
		forest.x+=1;
	}		
}

function getScores(){
	var theScoreBoard = JSON.parse(localStorage.getItem('Score'));
	return theScoreBoard;
}

function resetScores(){
	localStorage.removeItem( 'Score', JSON.stringify(scoreboard) );	
}


function fullReset(){

lifeCounter = 10;
kills = 0;
time = 0;
score = 0;
elapsedTime = 0;
player.x=192;
player.y=192;
life.width=85;
life.height=16;
//level one reset

levelOne.enemyArray = [];
levelOne.itemArray = [];
levelOne.enemyArray = createEnemies(levelOne);
levelOne.itemArray = createCollectables(levelOne);
levelOne.boundWidth=640;
levelOne.boundHeight=480;
levelOne.totalEnemyCount=50;
levelOne.activeEnemies=0;
levelOne.itemSpawns=9;
levelOne.totalItems=10;
levelOne.maxItems=2;
levelOne.activeItems=0;
levelOne.enemyCount=0;
levelOne.activeEnemies=0;
levelOne.activeEnemyArray = [];
levelOne.activeItemsArray = [];

//level two reset
levelTwo.enemyArray = createEnemies(levelTwo);
levelTwo.itemArray = createCollectables(levelTwo);
levelTwo.boundWidth=640;
levelTwo.boundHeight=640;
levelTwo.totalEnemyCount=100;
levelTwo.activeEnemies=0;
levelTwo.itemSpawns=9;
levelTwo.totalItems=10;
levelTwo.maxItems=3;
levelTwo.activeItems=0;
levelTwo.enemyCount=0;
levelTwo.activeEnemies=0;
levelTwo.activeEnemyArray = [];
levelTwo.activeItemsArray = [];

gameReset=true;
tartofLevel1=true;
startofLevel2=true;
currentLevel=levelOne;

document.getElementById("enterScore").value="";
}
