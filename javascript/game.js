var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var out = document.getElementById("out");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var player = new Player(350,780,80,15);
let life = 5;
var ball = new Ball(300,400,10,4,4,"red");
var bricks;
var score = 0;
var dKeyDown = false;
var aKeyDown = false;
var try_again = true;
var gameOver = false;
var winner = false;
var pause = false ;
	clear;

loadMap();
start();

function start(){
	checkKeyboardStatus();
	checkPlayer_BoundsCollision();
	checkBall_PlayerCollision();
	checkBall_BoundsCollision();
	checkBall_BrickCollision();
	clear();
	renderPlayer();
	moveBall();
	renderBall();
	renderBricks();
	checkWinner();
	if(gameOver === false){
		requestAnimationFrame(start);
	} else {
		document.getElementById("scoreId").innerHTML = "SCORE: " + score;
		document.getElementById("lifeId").innerHTML = "LIVES: " + life;

		if(winner){
			victoryDialog.hidden=false;
			victoryDialog.showModal();
		}
		else{
			life = life - 1;
			var audio = document.getElementById("audioBall");
        	audio.play();
			if(life<0){
				life = 5;
				score = 0;
				gameOverDialog.hidden = false;
				gameOverDialog.showModal();
				var audio = document.getElementById("audioGameOver");
        		audio.play();
			}
			else{
				restart()
			}
		}
	}
		
}

function moveBall(){
	ball.x = ball.x+ball.dx;
	ball.y = ball.y+ball.dy;
}

//KEYBOARD BUTTON
document.onkeydown = function(e){
	if(e.keyCode === 65){ //A 
		aKeyDown = true;
	}
	if(e.keyCode === 80){ //P
		//pause TODO
	}
	if(e.keyCode === 68){ //D 
		dKeyDown = true;
	}
	if(e.keyCode === 82){ //R
		victoryDialog.hidden=true;
		gameOverDialog.hidden = true;

		life = 5;
		score = 0;
		document.getElementById("scoreId").innerHTML = "SCORE: " + score;
		document.getElementById("lifeId").innerHTML = "LIVES: " + life;

		loadMap()
		restart();
	}
}

document.onkeyup = function(e){
	if(e.keyCode === 65){
		aKeyDown = false;
	}
	if(e.keyCode === 68){
		dKeyDown = false;
	}
}

function checkBall_BrickCollision(){
	var ax1 = ball.x-ball.r;
	var ay1 = ball.y-ball.r;
	var ax2 = ball.x+ball.r;
	var ay2 = ball.y+ball.r;
	var bx1;
	var bx2;
	var bx2;
	var by2;
	for(var i = 0; i < bricks.length; i++){
		bx1 = bricks[i].x;
		by1 = bricks[i].y;
		bx2 = bricks[i].x+bricks[i].width;
		by2 = bricks[i].y+bricks[i].height;
		if(!(ax2 <= bx1 || bx2 <= ax1 || ay2 <= by1 || by2 <= ay1)){

			var audio = document.getElementById("audioBrick");
        	audio.play();

			prevX = ball.x - ball.dx - ball.r;
			prevY = ball.y - ball.dy - ball.r;
			if((prevX > bx2 || prevX < bx1) && prevY >= by1 && prevY <= by2){
				ball.dx = -ball.dx;	
			} else {
				ball.dy = -ball.dy;
			}

			score = score + 100
			document.getElementById("scoreId").innerHTML = "SCORE: " + score;

			bricks.splice(i,1);
			return;
		}
	}
}

function checkBall_BoundsCollision(){
	var x = ball.x - ball.r;
	var y = ball.y - ball.r;
	var size = ball.r*2;
	var x2 = x + size;
	var y2 = y + size;
	if(x < 0){
		ball.x = 0 + ball.r;
		ball.dx = -ball.dx;
	} else if(x + size > canvas.width){
		ball.x = canvas.width - ball.r;
		ball.dx = -ball.dx;
	}
	if(ball.y < 0){
		ball.y = 0 + ball.r;
		ball.dy = -ball.dy
	} else if(ball.y + ball.r > canvas.height){
       	gameOver = true;
       	winner = false; 
    }
}

function checkBall_PlayerCollision(){
	var ax1 = player.x;
	var ay1 = player.y;
	var ax2 = player.x+player.width;
	var ay2 = player.y+player.height;
	var bx1 = ball.x-ball.r;
	var bx2 = ball.y-ball.r;
	var bx2 = ball.x+ball.r;
	var by2 = ball.y+ball.r;
	if(!(ax2 <= bx1 || bx2 <= ax1 || ay2 <= by1 || by2 <= ay1)){
		ball.dy = -ball.dy;
	}
}

function checkKeyboardStatus(){
	if(dKeyDown){
		if(player.xVel < player.moveSpeedLimit){
			player.xVel += player.accel;	
		} else {
			player.xVel = player.moveSpeedLimit;
		}
	} else {
		if(player.xVel > 0){
			player.xVel -= player.decel;
			if(player.xVel < 0) player.xVel = 0;
		}
	}
	if(aKeyDown){
		if(player.xVel > -player.moveSpeedLimit){
			player.xVel -= player.accel;	
		} else {
			player.xVel = -player.moveSpeedLimit;
		}
	} else {
		if(player.xVel < 0){
			player.xVel += player.decel;
			if(player.xVel > 0) player.xVel = 0;
		}
	}
	player.x+=player.xVel;
}

function checkPlayer_BoundsCollision(){
	if(player.x < 0){
		player.x = 0;
		player.xVel = 0;
	} else if(player.x + player.width > canvas.width){
		player.x = canvas.width - player.width;
		player.xVel = 0;
	}
	if(player.y < 0){
		player.y = 0;
		player.yVel = 0;
	} else if(player.y + player.height > canvas.height){
		player.y = canvas.height - player.height;
		player.yVel = 0;
	}
}

function renderPlayer(){
	c.save();
	c.fillStyle = player.color;
	c.fillRect(player.x,player.y,player.width,player.height);
	c.restore();
}

function checkWinner(){
	if(bricks.length < 1){
		gameOver = true;
		winner = true;
	}
}

function restart(){
	document.getElementById("lifeId").innerHTML = "LIVES: " + life;

	ball = new Ball(300,400,10,4,4,"red");
	player = new Player(350,780,80,15);
    gameOver = false;
	
	//loadMap();
	
	start();
}

function renderBall(){
	c.save();
	c.fillStyle = ball.color;
	c.beginPath();
	c.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
	c.fill();
	c.restore();
}

function clear(){
	c.clearRect(0,0,canvas.width,canvas.height);
}

function renderBricks(){
	for(var i = 0; i < bricks.length; i++){
		c.save();
		c.fillStyle = bricks[i].color;
		c.fillRect(bricks[i].x,bricks[i].y,bricks[i].width,bricks[i].height);
		c.restore();	
	}
}