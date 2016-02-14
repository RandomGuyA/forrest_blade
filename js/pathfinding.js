// JavaScript Document

function getX(sprite){
	var x = Math.floor(Math.abs((sprite.x)/16));
	return x;
	
}
function getY(sprite){
	
	var y = Math.floor(Math.abs((sprite.y)/16));
	return y;
}
function getDeltaX(sprite){
	var x = Math.floor(Math.abs((sprite.x+sprite.xDelta)/16));
	return x;
	
}
function getDeltaY(sprite){
	
	var y = Math.floor(Math.abs((sprite.y+sprite.xDelta)/16));
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


function Square(x, y){
	this.x=x;
	this.y=y;
	}

function ChildSquare(x,y,direction){
	this.x=x;
	this.y=y;
	this.direction=direction;	
}

function isValidSquare(childSquare, level, closedList){
	var validSquares = new Array();
	validSquares = level.mapArray;
	
	for(var a=0; a<validSquares.length; a+=2){
		if(	childSquare.x==validSquares[a]&&
			childSquare.y==validSquares[a+1]){
			
			
					return true;
			/*
			for(var b=0; b<closedList.length; b++){
				if(	childSquare.x==closedList[b].x&&
					childSquare.y==closedList[b].y){
					
				}
			}*/	
		}
	}
	
	return false;
		
}

function notClosed(childSquare, closedList){
	var counter=0;
	for(var a=0; a<closedList.length; a++){
		
		//console.log("cx1 "+childSquare.x+" , "+childSquare.y);
		//console.log("cx2 "+closedList[a].x+" , "+closedList[a].y);
		if(	childSquare.x==closedList[a].x&&
			childSquare.y==closedList[a].y){
			
			counter++;	
		}
		
	}
	if(counter==0){
		return true;	
	}
		
}



function createPath(player, goblin, level){
	var thePath=new Array();
	var tempPath=new Array();
	var closedList = new Array();
	var goblinX=getX(goblin);
	var goblinY=getY(goblin);
		
	var playerX=getDeltaX(player);
	var playerY=getDeltaY(player);
		
	var square= {
		x:goblinX,
		y:goblinY,
		//x:39,
		//y:18,
		};
	
	//console.log("player.x "+playerX+" player.y "+playerY);
	
	for(var i=0;i<20;i++){ //only adding a max of 50 steps
		var allClosed=0;
		var openList=new Array();
			
		//console.log("x: "+square.x+" y: "+square.y);
		//console.log("x: "+goblin.x+" y: "+goblin.y);
		//console.log("x: "+square.x+" y: "+square.y);
		//add current square to closed list
		
		var sq = new Square(square.x, square.y);
		closedList.push(sq);
		
		//create child squares add them to appropriate list
		var right = new ChildSquare(square.x+1,square.y,'right');
		
		//console.log("x "+right.x+" y "+right.y);
		
		if(	isValidSquare(right, level, closedList)&&
			notClosed(right, closedList)){
			//console.log("open");
			openList.push(right);
		}else{
			//console.log("closed");
			allClosed++;
			closedList.push(right);
		}			
		
		
		var left = new ChildSquare(square.x-1,square.y,'left');
		//console.log("x "+left.x+" y "+left.y);
		if(	isValidSquare(left, level, closedList)&&
			notClosed(left, closedList)){
				
			//console.log("open");
			openList.push(left);
		}else{
			//console.log("closed");
			allClosed++;
			closedList.push(left);
		}	
		
		
		var down = new ChildSquare(square.x,square.y+1,'down');
		//console.log("dx "+down.x+" dy "+down.y);
		if(	isValidSquare(down, level, closedList)&&
			notClosed(down, closedList)){
			
			//console.log("open");
			openList.push(down);
		}else{
			//console.log("closed");
			allClosed++;
			closedList.push(down);
		}	
		
		
		var up = new ChildSquare(square.x,square.y-1,'up');
		//console.log("x "+up.x+" y "+up.y);
		if(	isValidSquare(up, level, closedList)&&
			notClosed(up, closedList)){
			
			//console.log("open");
			openList.push(up);
		}else{
			//console.log("closed");
			allClosed++;
			closedList.push(up);
		}	
		
		
		//console.log(openList[0].x+", "+openList[1].x+", "+ openList[2].x+", "+ openList[3].x) 
		var tempManhattanArray=new Array();
		for(var a=0; a<openList.length; a++){
			openList[a].mValue=getManhattanValue(openList[a].x, playerX,  openList[a].y, playerY);
			tempManhattanArray.push(openList[a].mValue);
		}
		//zero index is lowest MValue
		var sortedArray = tempManhattanArray.sort(sortNumber);	
		
		for( var b=0; b<openList.length; b++){
			//console.log("M: "+openList[b].direction+" : " +openList[b].mValue);
			if(openList[b].mValue==sortedArray[0]){	
				
				var iteration = 16/goblin.movement;
				for(var c=0;c<iteration;c++){
				thePath.push(openList[b].direction);
				tempPath.push(openList[b]);
				}
				
				square.x=openList[b].x;
				square.y=openList[b].y;
				//console.log("M: " +openList[b].mValue);
				//console.log("direction: " +openList[b].direction);
				break;
			}
		}
		
		if(tempPath[tempPath.length-1].mValue==0||allClosed==4){
			//	console.log("end");
				break;
			}
		//console.log("x "+square.x+" y "+square.y);
		//console.log("closed length "+closedList.length);
		//console.log("path length "+thePath.length);
		
		/*for(var t=0; t<closedList.length; t++){
			console.log("closed list "+closedList[t].x+", "+closedList[t].y);
				
		}*/
		/*
		for(var t=0; t<thePath.length; t++){
			console.log("directions: "+thePath[t].direction);
				
		}*/
	}
	return thePath;
}


function updateEnemyMovement(level){
	var enemies = level.activeEnemyArray;
	
	//console.log("a"+a+": "+enemies[0].path.length/8);
	
	for(var a=0; a<enemies.length; a++){
		
	if(enemies[a].path.length<1){
		//console.log("update path");
		enemies[a].path=createPath(player, enemies[a], level);
	
	}
	
	//console.log("x: "+enemies[a].x+" , "+enemies[a].y);
		
		switch(enemies[a].path[0]){
	case 'right':
		enemies[a].currentState = 'right';
		updateAnimation(enemies[a].stateAnimations[enemies[a].currentState]);
		enemies[a].x+=enemies[a].movement;
		break;
	
	case 'left':
		enemies[a].currentState = 'left';
		updateAnimation(enemies[a].stateAnimations[enemies[a].currentState]);
		enemies[a].x-=enemies[a].movement;
		break;
	
	case 'down':
		enemies[a].currentState = 'down';
		updateAnimation(enemies[a].stateAnimations[enemies[a].currentState]);
		enemies[a].y+=enemies[a].movement;
		break;
	
	case 'up':
		enemies[a].currentState = 'up';
		updateAnimation(enemies[a].stateAnimations[enemies[a].currentState]);
		enemies[a].y-=enemies[a].movement;
		break;
		}	
		enemies[a].path.splice(0,1);
	}	
	
}






