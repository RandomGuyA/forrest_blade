//set the size of the canvas

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
 
canvas.width = 1600;
canvas.height = 1584;

//must load images before game starts

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

var upDown = new Tileset('images/sprites/up_down_tile.png', 21, 41);
var leftRight = new Tileset('images/sprites/left_right_tile.png', 23, 38);
var myBackground = new Tileset ('images/background/background.png', 1600, 1584);
var theBox = new Tileset ('images/items/box.png', 50,90);

//Sprite animations

var spriteLeftAnim = new Animation(leftRight, ['0,0','1,0','2,0','3,0','4,0','5,0',], 100);
var spriteRightAnim = new Animation(leftRight, ['5,1','4,1','3,1','2,1','1,1','0,1',], 100);
var spriteUpAnim = new Animation(upDown, ['5,1','4,1','3,1','2,1','1,1','0,1',], 100);
var spriteDownAnim = new Animation(upDown, ['0,0','1,0','2,0','3,0','4,0','5,0',], 100);
var staticAnim = new Animation(myBackground, ['0,0',],100);
var staticBox = new Animation(theBox, ['0,0',],100);


//Sprite Objects

var player = new Sprite({'left': spriteLeftAnim, 'right': spriteRightAnim, 'up': spriteUpAnim, 'down': spriteDownAnim}, 'right', 200, 200,23, 38, 100);
var levelBackground = new Sprite({'static': staticAnim}, 'static', 100, 0, 1600, 1584, 100);
var box = new Sprite({'static': staticBox}, 'static', 320, 204, 64, 80, 100);




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
	var px = player.x-190;
	var py = player.y-180;
	
    scrollWrapper(py,px);
	
	if (
		player.x < box.x + box.width &&
		player.x + player.width > box.x &&
		player.y < box.y + box.height &&
		player.y + player.height > box.y
	) {
    	if(player.currentState == 'down'){
			player.y -= player.speed * mod;
		}
		if(player.currentState == 'up'){
			player.y += player.speed * mod;
		}
		if(player.currentState == 'left'){
			player.x += player.speed * mod;
		}
		if(player.currentState == 'right'){
			player.x -= player.speed * mod;
		}
}
	

	
	
}
 
function render() {
    
	drawSprite(levelBackground);
	drawSprite(box);
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