// JavaScript Document

//sprite images

var playerAnim = new Tileset('images/sprites/player_sprite_sheet.png', 80, 70);
var myBackground = new Tileset ('images/background/the_town.png', 640, 480);
var myBackground2 = new Tileset ('images/background/levelTwo.png', 640, 640);
var goblinWalk = new Tileset ('images/sprites/goblin.png', 21, 28);
var goblinWalk2 = new Tileset ('images/sprites/goblin2.png', 21, 28);
var goblinWalk3 = new Tileset ('images/sprites/goblin3.png', 21, 28);
var sideBar = new Tileset ('images/background/side.png', 96, 320);
var forest = new Tileset('images/background/forest.jpg', 1680, 1050);
var forrestBlade = new Tileset('images/text/forrestblade.png',161,178);
var treeBackground = new Tileset('images/background/sideBack.png', 96, 320);
var startButton = new Tileset('images/text/start.png',100 ,34 );
var highscoreButton = new Tileset('images/text/highscore.png',162 ,38 );
var exitButton = new Tileset('images/text/exit.png',80 ,36 );

var lifeBar = new Tileset('images/background/life.png',85 ,16 );
var hearts = new Tileset('images/items/hearts.png', 16, 16);
var chest = new Tileset('images/items/chest.png', 16, 16);
var help = new Tileset('images/text/help.png', 220, 193);

//player animations

var spriteLeftAnim = new Animation(playerAnim, ['0,3','1,3','2,3','3,3','4,3','5,3',], 100);
var spriteRightAnim = new Animation(playerAnim, ['5,4','4,4','3,4','2,4','1,4','0,4',], 100);
var spriteUpAnim = new Animation(playerAnim, ['0,2','1,2','2,2','3,2','4,2','5,2',], 100);
var spriteDownAnim = new Animation(playerAnim, ['0,1','1,1','2,1','3,1','4,1','5,1',], 100);
var attackUp = new Animation(playerAnim, ['3,0',],100);
var attackDown = new Animation(playerAnim, ['1,0',],100);
var attackLeft = new Animation(playerAnim, ['0,0',],100);
var attackRight = new Animation(playerAnim, ['2,0',],100);
var spriteLeftHit = new Animation(playerAnim, ['0,8','1,8','2,8','3,8','4,8','5,8',], 100);
var spriteRightHit = new Animation(playerAnim, ['5,9','4,9','3,9','2,9','1,9','0,9',], 100);
var spriteUpHit = new Animation(playerAnim, ['0,7','1,7','2,7','3,7','4,7','5,7',], 100);
var spriteDownHit = new Animation(playerAnim, ['0,6','1,6','2,6','3,6','4,6','5,6',], 100);

//items

var shinyHeart = new Animation(hearts, ['0,0', '0,0','0,0','0,0','0,0','0,0','0,0','0,0','1,0', '2,0', '3,0', '4,0', '5,0', ], 100);
var treasureChest = new Animation(chest, ['0,0',],100);
//Background

var staticAnim = new Animation(myBackground, ['0,0',],100);
var staticAnim2 = new Animation(myBackground2, ['0,0',],100);
var sideBarStatic = new Animation(sideBar, ['0,0',],100);
var introForest = new Animation(forest, ['0,0',],100);
var forrestTextStatic = new Animation(forrestBlade, ['0,0',], 100);
var treeBackgroundtStatic = new Animation(treeBackground, ['0,0',], 100);
var staticStartText = new Animation(startButton, ['0,0',],100);
var statichighscoreText = new Animation(highscoreButton, ['0,0',],100);
var staticExitText = new Animation(exitButton, ['0,0',],100);
var staticLifeBar = new Animation(lifeBar, ['0,0',],100);
var controls = new Animation(help, ['0,0',],100);

//bad guys

var goblinDown = new Animation(goblinWalk, ['0,0','1,0','2,0',], 100);
var goblinLeft = new Animation(goblinWalk, ['0,1','1,1','2,1',], 100);
var goblinUp = new Animation(goblinWalk, ['0,2','1,2','2,2',], 100);
var goblinRight = new Animation(goblinWalk, ['0,3','1,3','2,3',], 100);
var goblinDown2 = new Animation(goblinWalk2, ['0,0','1,0','2,0',], 100);
var goblinLeft2 = new Animation(goblinWalk2, ['0,1','1,1','2,1',], 100);
var goblinUp2 = new Animation(goblinWalk2, ['0,2','1,2','2,2',], 100);
var goblinRight2 = new Animation(goblinWalk2, ['0,3','1,3','2,3',], 100);
var goblinDown3 = new Animation(goblinWalk3, ['0,0','1,0','2,0',], 100);
var goblinLeft3 = new Animation(goblinWalk3, ['0,1','1,1','2,1',], 100);
var goblinUp3 = new Animation(goblinWalk3, ['0,2','1,2','2,2',], 100);
var goblinRight3 = new Animation(goblinWalk3, ['0,3','1,3','2,3',], 100);
//Sprite Objects

var player = new Sprite({'downHit':spriteDownHit, 'leftHit':spriteLeftHit,'rightHit':spriteRightHit,'upHit':spriteUpHit,'attackUp':attackUp, 'attackDown':attackDown, 'attackLeft':attackLeft, 'attackRight':attackRight, 'left': spriteLeftAnim, 'right': spriteRightAnim, 'up': spriteUpAnim, 'down': spriteDownAnim}, 'right', 192, 192, 80, 70, 100);
var levelBackground = new Sprite({'static': staticAnim}, 'static', 0, 0, 640, 480, 100);
var levelBackground2 = new Sprite({'static': staticAnim2}, 'static', 0, 0, 640, 640, 100);

var goblin = new Sprite({'left': goblinLeft, 'right': goblinRight, 'up': goblinUp, 'down': goblinDown}, 'down', 32, 160, 21, 28, 100);
var goblin2 = new Sprite({'left': goblinLeft2, 'right': goblinRight2, 'up': goblinUp2, 'down': goblinDown2}, 'down', 32, 160, 21, 28, 100);
var goblin3 = new Sprite({'left': goblinLeft3, 'right': goblinRight3, 'up': goblinUp3, 'down': goblinDown3}, 'down', 32, 160, 21, 28, 100);


var sidemenu = new Sprite({'staticSide': sideBarStatic}, 'staticSide', 0, 0, 96, 320, 100);
var forest = new Sprite({'staticF': introForest}, 'staticF', 0, 0, 1680, 1050, 100);
var forrestText = new Sprite({'staticFt': forrestTextStatic}, 'staticFt', 80, 32, 161, 178, 100);
var treeBackgroundSide = new Sprite({'staticTb': treeBackgroundtStatic}, 'staticTb', 0, 0, 96, 320, 100);
var startText = new Sprite({'staticSt': staticStartText}, 'staticSt', 110, 230, 100, 34, 100);
var highScoreText = new Sprite({'staticHs': statichighscoreText}, 'staticHs', 78, 272, 162, 38, 100);
var exitText = new Sprite({'staticEt': staticExitText}, 'staticEt', 230, 278, 80, 36, 100);
var life = new Sprite({'staticL': staticLifeBar}, 'staticL', 6, 248, 85, 16, 100);
var helpScreen = new Sprite({'staticH': controls}, 'staticH',  52, 80, 220, 193, 100);
//items/ collectables
var tChest = new Sprite({'staticChest': treasureChest}, 'staticChest', 6, 248, 16, 16, 100);
var heart = new Sprite({'staticHeart': shinyHeart}, 'staticHeart', 0, 0, 16, 16, 100);


//player variables

player.swordTimer = Date.now();
player.swordDelay = 500;
player.xDelta = 32;
player.yDelta = 32;



