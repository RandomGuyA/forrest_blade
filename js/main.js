

function update(mod) {
    														//GAMESTATES
	if(gameState=='intro'){
		life.width=85;
		scrollWrapper(0,0);
		if(gameReset){
			intro.play();
			fullReset();
			gameReset=false;
		}
		backgroundMovement(forest);
		
		if(mouse.down&&clickObject(startText)){
			gameState='levelTrans';
			levelName="Level - 1";
			nextLevel='levelOne';
			transitionCounter=0;
		}
		if(mouse.down&&clickObject(highScoreText)){
			gameState='highScores';
		}
	}
	if(gameState=='highScores'){
		if(mouse.down&&clickObject(exitText)){
			gameState='intro';
		}
	}
	if(gameState=='levelTrans'){
		intro.pause();
		music.pause();	
		transitionCounter++;
		scrollWrapper(0,0);
		if(transitionCounter>=40){ //delayed efect before going to next level
			gameState=nextLevel;	
		}
	}
	if(gameState=='pause'){	
		scrollWrapper(0,0);
		if(13 in keysDown){
			gameState=nextLevel;
		}
	}
	if(gameState=='enterScore'){
		gameReset=true;
		document.getElementById("enterScore").type="text";
		
		
		if(13 in keysDown){
			playerName=document.getElementById("enterScore").value;
			var playerScore= {pName:playerName,pScore:score,pKills:kills,pTime:time,};
			var scoreboard = new Array();
			if(localStorage.getItem('Score')!=null){
				var scoreboard = getScores();
				for(var i=scoreboard.length; i>0; i--){		//i 5 4 3 2 1 //4 3 2 1 0 
					if(playerScore.pScore>scoreboard[i-1].pScore){
						scoreboard[i]=scoreboard[i-1];
						scoreboard[i-1]=playerScore;	
					}
				}
				
			}
			else{
				scoreboard.push(playerScore);
			}
			localStorage.setItem('Score', JSON.stringify(scoreboard));
			//fillScoreBoard();
			document.getElementById("enterScore").type="hidden";
			gameState='highScores';
		}
	}															
																//LEVEL ONE
	if(gameState=='levelOne'){
		currentLevel=levelOne;
		var px = player.x-130;
		var py = player.y-120;
		scrollWrapper(py,px);
		
		if(levelOne.activeEnemies>0){
			updateEnemyMovement(currentLevel);
		}
		if(startofLevel1){
			
			player.x=272;
			player.y=154;
			//canvas.width=640;
			//canvas.height=480;	
			startofLevel1=false;
		}	
		//add random enemy	
		if(elapsedTime%50==0){
			if(levelOne.maxActiveEnemiesAllowed>levelOne.activeEnemies&&levelOne.enemyArray.length>0){
				addEnemy(levelOne);
			}
		}
		//add random item
		if(levelOne.maxItems>levelOne.activeItems&&levelOne.itemArray.length>0){
			addRandomItem(levelOne);
		}
		if(kills==levelOne.totalEnemyCount){
			gameState= 'levelTrans';
			levelName="Level - 2";
			nextLevel='levelTwo';
			transitionCounter=0;
		}	
		elapsedTime++;	
		
		//GAME OVER
		if(lifeCounter<=0){
			//console.log(lifeCounter);
			gameover.play();
			lifeCounter=10;
			gameState= 'levelTrans';
			levelName="Game Over";
			nextLevel='enterScore';
			transitionCounter=0;
		}
		//PRESS 'P' TO PAUSE	
	if (80 in keysDown) {	
		nextLevel=gameState;
		gameState= 'pause';
	}
	

	
	//CLICK PAUSE BUTTON
	if(	mouse.down&&
		mouse.x < 90 &&
		mouse.x > 5 &&
		mouse.y < 287 &&
		mouse.y > 270
	){
		nextLevel=gameState;
		gameState='pause';		
	}
	}															//END OF LEVEL ONE
														
																
																//LEVEL TWO
	if(gameState=='levelTwo'){
		
		if(startofLevel2){
			
			canvas.width=640;
			canvas.height=640;
			player.x=304;
			player.y=416;
			currentLevel=levelTwo;
			startofLevel2=false;
		}
		
		if(levelTwo.activeEnemies>0){
			updateEnemyMovement(currentLevel);
		}
		
		//add enemies
		if(elapsedTime%50==0){
			
			if(levelTwo.maxActiveEnemiesAllowed>levelTwo.activeEnemies&&levelTwo.enemyArray.length>0){
			addEnemy(levelTwo);
			}
		
		}
		
		//add items
		if(levelTwo.maxItems>levelTwo.activeItems&&levelTwo.itemArray.length>0){
			console.log("add item");
			addRandomItem(levelTwo);
		}
		
		if(kills-50==levelTwo.totalEnemyCount){
			gameState= 'levelTrans';
			levelName="You Win!";
			nextLevel='enterScore';
			transitionCounter=0;
		}
		
		checkCollisions(player, currentLevel);
		
		var px = player.x-130;
		var py = player.y-120;
		//keeps the viewpoint over the player
		scrollWrapper(py,px);	
		
		//GAME OVER
		if(lifeCounter<=0){
			gameover.play();
			gameState= 'levelTrans';
			levelName="Game Over";
			
			nextLevel='enterScore';
			transitionCounter=0;
		}
		//PRESS 'P' TO PAUSE	
	if (80 in keysDown) {	
		nextLevel=gameState;
		gameState= 'pause';
	}
	

	
	//CLICK PAUSE BUTTON
	if(	mouse.down&&
		mouse.x < 90 &&
		mouse.x > 5 &&
		mouse.y < 287 &&
		mouse.y > 270
	){
		nextLevel=gameState;
		gameState='pause';		
	}
		elapsedTime++;
	}															//END OF LEVEL TWO
	
	
	
	
																////GENERAL PURPOSE FUNCTIONS
	
	
	
	//CLICK EXIT BUTTON
	if(	mouse.down&&
		mouse.x < 90 &&
		mouse.x > 5 &&
		mouse.y < 313 &&
		mouse.y > 295
	){
		gameState='intro';		
	}
	
	//COLLISION WITH ITEMS
	itemCollision(player, currentLevel);
	

	//PLAYER MOVEMENT
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
	
	if(attacked){
		
		if(player.currentState == 'attackLeft'){
			player.currentState='left';
		}
		else if(player.currentState == 'attackRight'){
			player.currentState='right';
		}
		else if(player.currentState == 'attackUp'){
			player.currentState='up';
		}
		else if(player.currentState == 'attackDown'){
			player.currentState='down';
		}
		attacked=false;
	}
	
	
	//ATTACK KEYS
	if((32 in keysDown && (player.currentState == 'left') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		enemyHit(player,1,50,6,14,currentLevel);
		player.currentState = 'attackLeft';	
		attacked=true;
		swipe.play();
		updateAnimation(player.stateAnimations[player.currentState]);
		player.swordTimer = Date.now();
	}
	else if((32 in keysDown && (player.currentState == 'right') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		enemyHit(player,50,0,6,14,currentLevel);
		player.currentState = 'attackRight';	
		attacked=true;
		swipe.play();
		updateAnimation(player.stateAnimations[player.currentState]);
		player.swordTimer = Date.now();	
	}
	else if((32 in keysDown && (player.currentState == 'up') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		enemyHit(player,30,22,1,30,currentLevel);
		player.currentState = 'attackUp';
		attacked=true;
		swipe.play();	
		updateAnimation(player.stateAnimations[player.currentState]);
		player.swordTimer = Date.now();	
	}
	else if((32 in keysDown && (player.currentState == 'down') &&(Date.now() - player.swordTimer) > player.swordDelay)){
		enemyHit(player,29,28,20,4,currentLevel);
		player.currentState = 'attackDown';
		attacked=true;
		swipe.play();	
		updateAnimation(player.stateAnimations[player.currentState]);
		player.swordTimer = Date.now();
	}

	//COLLISION WITH ENEMY
	if(!ehit){
		if (
			enemyCollision(player, currentLevel)  //collide with enemy
		) {
			if(player.currentState == 'down'|| player.currentState == 'attackDown'){
				ehit=true;
				//player.currentState = 'downHit'
				if(lifeCounter>0){
					score-=20;
					decreaseLife();
				}
			}
			if(player.currentState == 'up'|| player.currentState == 'attackUp'){
				ehit=true;
				//player.currentState = 'upHit'
				if(lifeCounter>0){
					score-=20;
					decreaseLife();
				}
			}
			if(player.currentState == 'left'|| player.currentState == 'attackLeft'){
				ehit=true;
				//player.currentState = 'leftHit'
				if(lifeCounter>0){
					score-=20;
					decreaseLife();
				}
			}
			if(player.currentState == 'right'|| player.currentState == 'attackRight'){
				ehit=true;
				//player.currentState = 'rightHit'
				if(lifeCounter>0){
					score-=20;
					decreaseLife();
				}
			}
		}
	}
	if(ehit){
		hitCounter++;
		
		if(hitCounter>=10){
			hitCounter=0;
			ehit=false;
		}
	}
	
	
	if (  //COLLISION WITH BACKGROUND
		checkCollisions(player,currentLevel)
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
	/*//TEMPORARY STATE CHANGERS
	if (49 in keysDown) {	
		gameState='enterScore';
		levelName="Level - 1";
		
	}
	if (50 in keysDown) {	
		gameState= 'levelTwo';
		startofLevel2=true;
		//levelName="Level - 2";
		//nextLevel='levelTwo';
		//transitionCounter=0;
	}*/
	
	time=Math.floor(elapsedTime/20);
}												//END OF UPDATE

function render() {
	
	if(gameState=='intro'){
		drawSprite(forest);
		drawSprite(forrestText);
		drawSprite(startText);
		drawSprite(highScoreText);
		drawSpriteSide(treeBackgroundSide);
	}
	
	if(gameState=='levelOne'){
		
		drawSpriteSide(treeBackgroundSide);	
		drawSpriteSide(sidemenu);
		drawMap();
		context.font = "10pt bold arial";
		context.fillStyle = 'white';
		context.fillText(kills, 10, 150);
		context.fillText(time, 10, 182);
		context.fillText(score, 10, 118);
		drawSpriteSide(life);	
		drawSprite(levelBackground);
		
		//console.log("here: "+levelOne.enemyArray.length);
		
		if(levelOne.activeEnemyArray.length>0){
			for(var a=0; a<levelOne.activeEnemyArray.length; a++){
			
				drawSprite(levelOne.activeEnemyArray[a]);	
			}
		}
		
		//console.log("here: "+levelOne.itemArray.length);
		if(levelOne.activeItemsArray.length>0){
			for(var a=0; a<levelOne.activeItemsArray.length; a++){
			
				drawSprite(levelOne.activeItemsArray[a]);	
			}
		}
		drawSprite(player);
	}
	
	if(gameState=='levelTwo'){
		
		drawSpriteSide(treeBackgroundSide);	
		drawSpriteSide(sidemenu);
		context.font = "10pt bold arial";
		context.fillStyle = 'white';
		context.fillText(kills, 10, 150);
		context.fillText(time, 10, 182);
		context.fillText(score, 10, 118);
		drawSpriteSide(life);
		drawSprite(levelBackground2);
		
		if(levelTwo.activeEnemyArray.length>0){
			for(var a=0; a<levelTwo.activeEnemyArray.length; a++){
				drawSprite(levelTwo.activeEnemyArray[a]);	
			}
		}
		if(levelTwo.activeItemsArray.length>0){
			for(var a=0; a<levelTwo.activeItemsArray.length; a++){
			
				drawSprite(levelTwo.activeItemsArray[a]);	
			}
		}
		drawSprite(player);
	}
	
	if(gameState=='levelTrans'){
		
		ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
		ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.font = "28pt bold arial";
		ctx.fillStyle = 'white';
		ctx.fillText(levelName, 88, 150);
		ctx.font = "20pt bold arial";
		if(levelName=="Level - 1"||levelName=="Level - 2"){
			ctx.fillText(levelText, 56, 200);
		}
	}
	
	if(gameState=='pause'){
		
		ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
		ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.font = "20pt bold arial";
		ctx.fillStyle = 'white';
		ctx.fillText("PAUSED", 108,60);
		ctx.font = "12pt bold arial";
		ctx.fillText("Press Enter to Resume Game", 72,300);
		drawSprite(helpScreen); 
	}
	
	if(gameState=='enterScore'){
		ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
		ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.font = "20pt bold arial";
		ctx.fillStyle = 'white';
		ctx.fillText("Enter your Name", 75,60);
		
	}
	
	if(gameState=='highScores'){
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.font = "20pt bold arial";
		ctx.fillStyle = 'white';
		ctx.fillText("HighScores", 95,30);
		
		var theScore = getScores();
		if(theScore!=null){
			var limit = 5;
			if(theScore.length<5){
				limit=theScore.length;
			}
				ctx.font = "16pt bold arial";
				ctx.fillText("Name", 10,70);
				ctx.fillText("Time", 120,70);
				ctx.fillText("Kills", 180,70);
				ctx.fillText("Score", 240,70);
			
			for(var i=0; i<limit; i++){
				ctx.fillText(theScore[i].pName, 10,100+(i*40));
				ctx.fillText(theScore[i].pTime, 120,100+(i*40));
				ctx.fillText(theScore[i].pKills, 180,100+(i*40));
				ctx.fillText(theScore[i].pScore, 240,100+(i*40));
				
			}
		}
		
		
		drawSprite(exitText);	
	}
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
setInterval(main, 50);

var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});
window.addEventListener("keydown", function(e) {
   
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

canvas.addEventListener('mousedown', function(e) {
    mouse.down = true;
});
canvas.addEventListener('mouseup', function(e) {
    mouse.down = false;
});
canvas.addEventListener('mousemove', function(e) {
     	var rect = canvas.getBoundingClientRect();
        mouse.y= e.clientY - rect.top;
        mouse.x= e.clientX - rect.left;
});