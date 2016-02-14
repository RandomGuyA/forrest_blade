var squares=new Array();
var visitedSquares = new Array();

//destination first param, current position second param
function createPath(player, goblin){

	var goblinX = getX(goblin);
	var goblinY = getY(goblin);
	
	var playerX=getX(player);
	var playerY=getY(player);
	
	//Starting square the position of the goblin
	var goblinSquare = {
		x: goblinX,
		y: goblinY,
		//this square will always create children so the cost is unnessecary
		cost: 0,
		//this square has no parent its the root node
		//goblinSquare.parent;

		children: [],
		//this square has no steps taken to get there as its the root
		steps:[],
		};
 	
	//root square added to squares list
	squares.push(goblinSquare);
	//console.log("x "+squares[0].steps.length+"\n");
	
	//while the enemy is not one square away from the player aka goal not reached
	do{
		
		//console.log("square.x "+squares[0].x+"\n");
		createChildren(squares[0],playerX,playerY);
		/*
		for(var i=0;i<squares[0].children.length;i++){
			squares.push(squares[0].children[i]);
			}
		visitedSquares.push(squares[0]);
		//removes the top index aka squares[0]
		squares.pop();
		//bring the lowest cost to the front
		squares.sort(function(square1, square2) {return square1.cost - square2.cost});
		*/
		break;
		
		
	}
	while(((squares[0].x%playerX)+(squares[0].y%playerY))>1||((squares[0].x%playerX)+(squares[0].y%playerY)<-1));
		
		
		//console.log("goblin path");
		/*ATTENTION REQUIRED if you want the path stored in the goblin uncomment and comment the follow path method out 
		and uncomment the follow path method in town.js*/
		//return squares[0].steps.slice(0);
		return "h";
}
	

//Moves goblin in relation to the path and updates the path.
function followPath(goblin){
//pathLength is the index of the last step
var lastIndex = goblin.path.length()-1;
//the start of the path is the end of the steps array
	switch(goblin.path[lastIndex]){
	case "Right":
		goblin.currentState = 'right';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.x+=2;
		break;
	
	case "Left":
		goblin.currentState = 'left';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.x-=2;
		break;
	
	case "Down":
		goblin.currentState = 'down';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.y+=2;
		break;
	
	case "Up":
		goblin.currentState = 'up';
		updateAnimation(goblin.stateAnimations[goblin.currentState]);
		goblin.y-=2	;
		break;
	}	
	//remove the last index method not implemented yet
	goblin.path.slice(lastIndex,1);
}	

//will break if createPath hasnt been called
//children are created with the their manhattan distance calculated
function createChildren(square,playerX,playerY){



//move right
var indexOfX = mapArray.indexOf(square.x+1);
	if(indexOfX!=1&&mapArray[indexOfX+1]==square.y){
		var childSquare ={};
		childSquare.x = (square.x)+1;
		childSquare.y = square.y;
		
		console.log("right\n");
		
		

		// step cost completes the Manhattan distance
		var stepCount = (square.steps.length)+1;
		
		childSquare.cost = getManhattanValue(childSquare.x,playerX,childSquare.y,playerY)+stepCount;
		childSquare.parent = square;
		childSquare.children= [];
		childSquare.steps=square.steps.slice(0);
		//due to push directions are backwards
		childSquare.steps.push("Right");
		
		//contains method created custom
		if( ! (  checkDuplicates(childSquare, squares)  ||  checkDuplicates(childSquare, visitedSquares) )  ){
		square.children.push(childSquare);
		}
	}

	//move left
	var indexOfX = mapArray.indexOf(square.x-1);
	if(indexOfX!=1&&mapArray[indexOfX+1]==square.y){
		var childSquare ={};
		childSquare.x = (square.x)-1;
		childSquare.y = square.y;
		
		console.log("left\n");
		

		// step cost completes the Manhattan distance
		var stepCount = (square.steps.length)+1;
		
		childSquare.cost = getManhattanValue(childSquare.x,playerX,childSquare.y,playerY)+stepCount;
		childSquare.parent = square;
		childSquare.children= [];
		childSquare.steps=square.steps.slice(0);
		//due to push directions are backwards
		childSquare.steps.push("Left");
		
		//contains method created custom
		if( ! (  checkDuplicates(childSquare, squares)  ||  checkDuplicates(childSquare, visitedSquares) )  ){
		square.children.push(childSquare);
		}
	}

	//move down
	var indexOfX = mapArray.indexOf(square.x);
	if(indexOfX!=1&&mapArray[indexOfX+1]==(square.y+1)){
		var childSquare ={};
		childSquare.x = square.x;
		childSquare.y = (square.y)+1;
	
		console.log("down\n");
	
	

		// step cost completes the Manhattan distance
		var stepCount = (square.steps.length)+1;
		
		childSquare.cost = getManhattanValue(childSquare.x,playerX,childSquare.y,playerY)+stepCount;
		childSquare.parent = square;
		childSquare.children= [];
		childSquare.steps=square.steps.slice(0);
		//due to push directions are backwards
		childSquare.steps.push("Down");
		
		//contains method created custom
		if( ! (  checkDuplicates(childSquare, squares)  ||  checkDuplicates(childSquare, visitedSquares) )  ){
		square.children.push(childSquare);
		}
	}
	
	//move up
	var indexOfX = mapArray.indexOf(square.x);
	if(indexOfX!=1&&mapArray[indexOfX+1]==(square.y-1)){
		var childSquare ={};
		childSquare.x = square.x;
		childSquare.y = (square.y)-1;
		//console.log("up\n");
		

		// step cost completes the Manhattan distance
		var stepCount = (square.steps.length)+1;
		
		childSquare.cost = getManhattanValue(childSquare.x,playerX,childSquare.y,playerY)+stepCount;
		childSquare.parent = square;
		childSquare.children= [];
		childSquare.steps=square.steps.slice(0);
		//due to push directions are backwards
		childSquare.steps.push("Up");
		
		//contains method created custom
		
		//if the childsquare does not exists within visitedSquares and squares Array, add it to the squares array 
		if( ! (  checkDuplicates(childSquare, squares)  ||  checkDuplicates(childSquare, visitedSquares) )  ){
			square.children.push(childSquare);
		}
	}
}

function checkDuplicates(childObject, squareArray){
	for (var i=0; i<squareArray.length;i++) {
		if(	squareArray[i].x==childObject.x&&
			squareArray[i].y==childObject.y){
				return true;	
			}
			return false;
	}
}


