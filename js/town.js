//set the size of the canvas

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
 
canvas.width = 1600;
canvas.height = 1584;

var lifeCounter = 25;

//must load images before game starts

//Bounds
var bounds = {
	x:0,
	y:0,
	width:640,
	height:480,
}

var game = {
    images: 0,
    imagesLoaded: 0,
}

function imageLoaded() {
    game.imagesLoaded ++;
}

function Tileset(image, tileWidth, tileHeight) {
    this.image = new Image();
    game.images ++;
    this.image.onload = imageLoaded;
    this.image.src = image;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
}

//sprite images

var playerAnim = new Tileset('images/sprites/player_sprite_sheet.png', 80, 70);
var myBackground = new Tileset ('images/background/the_town.png', 640, 480);
var goblinWalk = new Tileset ('images/sprites/goblin.png', 21, 28);
var sideBar = new Tileset ('images/background/side.png', 96, 320);


//player animations

var spriteLeftAnim = new Animation(playerAnim, ['0,3','1,3','2,3','3,3','4,3','5,3',], 100);
var spriteRightAnim = new Animation(playerAnim, ['5,4','4,4','3,4','2,4','1,4','0,4',], 100);
var spriteUpAnim = new Animation(playerAnim, ['0,2','1,2','2,2','3,2','4,2','5,2',], 100);
var spriteDownAnim = new Animation(playerAnim, ['0,1','1,1','2,1','3,1','4,1','5,1',], 100);
var attackUp = new Animation(playerAnim, ['3,0','3,0',],100);
var attackDown = new Animation(playerAnim, ['1,0','1,0',],100);
var attackLeft = new Animation(playerAnim, ['0,0','0,0',],100);
var attackRight = new Animation(playerAnim, ['2,0','2,0',],100);



//Background

var staticAnim = new Animation(myBackground, ['0,0',],100);
var sideBarStatic = new Animation(sideBar, ['0,0',],100);

//bad guys

var goblinDown = new Animation(goblinWalk, ['0,0','1,0','2,0',], 100);
var goblinLeft = new Animation(goblinWalk, ['0,1','1,1','2,1',], 100);
var goblinUp = new Animation(goblinWalk, ['0,2','1,2','2,2',], 100);
var goblinRight = new Animation(goblinWalk, ['0,3','1,3','2,3',], 100);

//Sprite Objects

var player = new Sprite({'attackUp':attackUp, 'attackDown':attackDown, 'attackLeft':attackLeft, 'attackRight':attackRight, 'left': spriteLeftAnim, 'right': spriteRightAnim, 'up': spriteUpAnim, 'down': spriteDownAnim}, 'right', 160, 160, 80, 70, 100);
var levelBackground = new Sprite({'static': staticAnim}, 'static', 0, 0, 640, 480, 100);
var goblin = new Sprite({'left': goblinLeft, 'right': goblinRight, 'up': goblinUp, 'down': goblinDown}, 'down', 32, 160, 21, 28, 100);
var sidemenu = new Sprite({'static': sideBarStatic}, 'static', 0, 0, 96, 320, 100);

//player variables

player.swordTimer = Date.now();
player.swordDelay = 200;
player.xDelta = 37;
player.yDelta = 52;

//goblin

goblin.xDelta = 10;
goblin.yDelta = 20;
goblin.path = [];

//functions

function updateAnimation(anim) {
    if (Date.now() - anim.frameTimer > anim.frameDuration) {
        if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame ++;
        else anim.currentFrame = 0;
        anim.frameTimer = Date.now();
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

function getX(sprite){
	var x = Math.floor(Math.abs((sprite.x+sprite.xDelta)/16));
	return x;
	
}
function getY(sprite){
	
	var y = Math.floor(Math.abs((sprite.y+sprite.yDelta)/16));
	return y;
}

function getManhattanValue(x1,x2, y1,y2){
	var mValue = Math.floor((Math.abs(x1-x2))+(Math.abs(y1-y2)));
	return mValue;
}
function getEclideanValue(x1,x2, y1,y2){
	
	var eValue = Math.sqrt((Math.pow(Math.abs(x1-x2)),2)+(Math.pow((Math.abs(y1-y2)),2)));
	return eValue;	
}

function sortNumber(a,b) {
    return a - b;
}
function spriteMove(player, goblin){
	
	var destX = getX(player);
	var destY = getY(player);
	
	
	var x = getX(goblin);
	var y = getY(goblin);
	var openSquare = mapArray;
	var closedSquare = new Array();
	var space = [x+1,y,x-1,y,x,y+1,x,y-1]; //coords of the surrounding squares
	
	
	//start of main loop
	while(true){
		//remove current square from open list
		for(var a=0; a<openSquare.length; a+=2){
			if(x==openSquare[a]&&y==openSquare[a+1]){
				openSquare.splice(a,1);
				openSquare.splice(a+1,1);
			}
		}
		//get manhattan value add it to array to be sorted
		var validSquares = new Array();
		var tempManhattanArray=new Array();
		for(var b=0; space.length; b+=2){
			var mValue = getManhattanValue(space[b], getX(player),  space[b+1], getY(player));
			tempManhattanArray.push(mValue);
			validSquares.push(space[b],space[b+1], mValue);
		}
		
		var sortedArray = tempManhattanArray.sort(sortNumber);	
		var vLen = validSquares.length;
		
		for(var e=0; e<sortedArray; e=+2){
			for(var c=0; c<vLen; c+=3){
				if(sortedArray[e]==validSquares[c+2]){
					for(var d=0;d<openSquare.length;d+=2){
						if(validSquares[c]==openSquare[d]&&validSquares[c+1]==openSquare[d+1]){
							openSquare.splice(d,1);
							openSquare.splice(d+1,1);	
							closedSquare.push(validSquares[c]);
							closedSquare.push(validSquares[c+1]);
							break;
						}
					}
				}
			}
		}
		
		if(openSquare[openSquare.length-1]==destX&&openSquare[openSquare.length-2]==destY){
			break;	
		}
	}
	console.log(closedSquare[4]+"\n");
	
}
function spriteMovement(player, goblin){
	
	var x = getX(goblin);
	var y = getY(goblin);
	var mValue = getManhattanValue(x, getX(player),  y, getY(player));

	goblin.path.push(x,y);
	var destX;
	var destY;
	var space = [x+1,y,x-1,y,x,y+1,x,y-1];
	var validSquares = new Array();
	var tempManhattanArray=new Array();
	var spaceLen = space.length;
	var mapArrayLen = mapArray.length;
	for(var i=0; i<spaceLen; i+=2){ 
		for(var j=0; j<mapArrayLen; j+=2){
			if(space[i]==mapArray[j]&&mapArray[j+1]==space[i+1]){		
				if((goblin.path.length>5)&&space[i]==goblin.path[goblin.path.length-4]&&goblin.path[goblin.path.length-3]==space[i+1]){
					var mV = getManhattanValue(space[i], getX(player),  space[i+1], getY(player))+5; //add cost to previosly visted square
					tempManhattanArray.push(mValue);
					validSquares.push(space[i],space[i+1], mV);
					//console.log("1x: "+space[i]+"y: "+space[i+1]+"mvalue:"+mValue+"\n");
					}
				
				else{
					var mValue = getManhattanValue(space[i], getX(player),  space[i+1], getY(player));
					tempManhattanArray.push(mValue);
					validSquares.push(space[i],space[i+1], mValue);
					//console.log("2x: "+space[i]+"y: "+space[i+1]+"mvalue:"+mValue+"\n");
				}
			}
		}
	}
	var sortedArray = tempManhattanArray.sort(sortNumber);	
	var lowest = sortedArray[0];
	//console.log(sortedArray[0]+","+sortedArray[1]+","+sortedArray[2]+","+sortedArray[3]+"\n");

	var vLen = validSquares.length;
	for(var c=0; c<vLen; c+=3){
			if(lowest==validSquares[c+2]){
				destX=validSquares[c];
				destY=validSquares[c+1];
			}
	}
	if(destX==(x+1)&&destY==y){
		goblin.currentState = 'right';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.x+=2;
	}
	if(destX==(x-1)&&destY==y){
		goblin.currentState = 'left';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.x-=2;
	}
	if(destX==x&&destY==(y+1)){
		goblin.currentState = 'down';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.y+=2;
	}
	if(destX==x&&destY==(y-1)){
		goblin.currentState = 'up';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.y-=2	;
	}
}

function checkCollisions(sprite){	
	var W=16;
	var H=16;
	
	var colX, colY;
	var arrayLength = collisionArray.length;
	for (var i = 0; i < arrayLength; i+=2) {
		colX = collisionArray[i]*16;
		colY = collisionArray[i+1]*16;
		
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
	sprite.x+37 < bounds.x ||
	sprite.x + sprite.width-38 > bounds.width ||
	sprite.y < bounds.y ||
	sprite.y + sprite.height-13 > bounds.height
	){
		return true;	
	}
}

function update(mod) {
    if (37 in keysDown) {
		
        player.currentState = 'left';
        player.x -= player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
    else if (39 in keysDown) {
		
        player.currentState = 'right';
        player.x += player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
	else if (38 in keysDown) {
		
        player.currentState = 'up';
        player.y -= player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
	else if (40 in keysDown) {	
        player.currentState = 'down';
        player.y += player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
		
	}
	
	if((32 in keysDown && (player.currentState == 'left') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		player.currentState = 'attackLeft';	
		updateAnimation(player.stateAnimations[player.currentState]);
		player.projectileTimer = Date.now();	
	}
	else if((32 in keysDown && (player.currentState == 'right') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		player.currentState = 'attackRight';	
		updateAnimation(player.stateAnimations[player.currentState]);
		player.projectileTimer = Date.now();	
	}
	else if((32 in keysDown && (player.currentState == 'up') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		player.currentState = 'attackUp';	
		updateAnimation(player.stateAnimations[player.currentState]);
		player.projectileTimer = Date.now();	
	}
	else if((32 in keysDown && (player.currentState == 'down') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		player.currentState = 'attackDown';	
		updateAnimation(player.stateAnimations[player.currentState]);
		player.projectileTimer = Date.now();
	}
	
	var px = player.x-130;
	var py = player.y-120;
	
	mapUpdate(getX(player), getY(player), 'red');
	mapUpdate(getX(goblin), getY(goblin), 'blue');
	
    scrollWrapper(py,px);
	checkCollisions(player);
	
	
	
	if (
		checkCollisions(player)
	) {
    	if(player.currentState == 'down'|| player.currentState == 'attackDown'){
			player.y -= player.speed * mod;
		}
		if(player.currentState == 'up'|| player.currentState == 'attackUp'){
			player.y += player.speed * mod;
		}
		if(player.currentState == 'left'|| player.currentState == 'attackLeft'){
			player.x += player.speed * mod;
		}
		if(player.currentState == 'right'|| player.currentState == 'attackRight'){
			player.x -= player.speed * mod;
		}
	}
}

function render() {
	drawSpriteSide(sidemenu);
	context.fillStyle = 'red';
	context.fillRect(7, 250, 83, 14);
	drawMap();
	drawSprite(levelBackground);
	drawSprite(goblin);
	drawSprite(player);
	
	
}

//checks that images == images loaded or will not render
function main() {
    update((Date.now() - then) / 1000);
    if (game.images == game.imagesLoaded) {
        render();
    }
    then = Date.now();
}

var then = Date.now();
setInterval(main, 10);



var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});



	