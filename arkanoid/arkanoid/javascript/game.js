var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var out = document.getElementById("out");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var player = new Player(350,780,80,15);
let life = 0;
var ball = new Ball(300,400,10,4,4,"red");
var bricks;
var dKeyDown = false;
var aKeyDown = false;
var try_again = true;
var gameOver = false;
var winner = false;

loadMap();
start();

function Brick(x,y,width,height,color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

function Ball(x,y,r,dx,dy,color){//r=ball's dimension dx,dy= speed
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
}

function Player(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.moveSpeedLimit = 10;
	this.accel = 0.75;
	this.decel = 0.75;
	this.xVel = 0;
	this.yVel = 0;
	this.color = "black";
}

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
        out.innerHTML = "Remained lifes:"+ life;
	} else {
		out.innerHTML = "Game over";
		if(winner){
			out.innerHTML += ", you won!";
		}
		out.innerHTML += "<br>";
		out.innerHTML += "Press R to restart";
	}
		
}

function moveBall(){
	ball.x = ball.x+ball.dx;
	ball.y = ball.y+ball.dy;
}

document.onkeydown = function(e){
	if(e.keyCode === 65){
		aKeyDown = true;
	}
	if(e.keyCode === 68){
		dKeyDown = true;
	}
	if(e.keyCode === 82){
		if(gameOver) restart();
        if(life>0) tryAgain();
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
			prevX = ball.x - ball.dx - ball.r;
			prevY = ball.y - ball.dy - ball.r;
			if((prevX > bx2 || prevX < bx1) && prevY >= by1 && prevY <= by2){
				ball.dx = -ball.dx;	
			} else {
				ball.dy = -ball.dy;
			}
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
        if(life<=2){
            life=life+1;
            gameOver = false;
            winner = false; 
        }
        else{
            gameOver = true;
            winner = false; 
        }
        
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

function loadMap(){
	bricks = [ //x,y,width,height,color
        new Brick(60,70,100,20,"blue"),
        new Brick(165,70,100,20,"blue"),
        new Brick(270,70,100,20,"blue"),
        new Brick(375,70,100,20,"blue"),
        new Brick(480,70,100,20,"blue"),
        new Brick(585,70,100,20,"blue"),//Row 1

        new Brick(60,100,100,20,"green"),
        new Brick(165,100,100,20,"green"),
        new Brick(270,100,100,20,"green"),
        new Brick(375,100,100,20,"green"),
        new Brick(480,100,100,20,"green"),
        new Brick(585,100,100,20,"green"),//Row 2

        new Brick(60,130,100,20,"darkcyan"),
        new Brick(165,130,100,20,"darkcyan"),
        new Brick(270,130,100,20,"darkcyan"),
        new Brick(375,130,100,20,"darkcyan"),
        new Brick(480,130,100,20,"darkcyan"),
        new Brick(585,130,100,20,"darkcyan"),//Row 3

        new Brick(60,160,100,20,"coral"),
        new Brick(165,160,100,20,"coral"),
        new Brick(270,160,100,20,"coral"),
        new Brick(375,160,100,20,"coral"),
        new Brick(480,160,100,20,"coral"),
        new Brick(585,160,100,20,"coral"),//Row 4

        new Brick(60,190,100,20,"darkolivegreen"),
        new Brick(165,190,100,20,"darkolivegreen"),
        new Brick(270,190,100,20,"darkolivegreen"),
        new Brick(375,190,100,20,"darkolivegreen"),
        new Brick(480,190,100,20,"darkolivegreen"),
        new Brick(585,190,100,20,"darkolivegreen"),//Row 5

        new Brick(60,220,100,20,"lightsteelblue"),
        new Brick(165,220,100,20,"lightsteelblue"),
        new Brick(270,220,100,20,"lightsteelblue"),
        new Brick(375,220,100,20,"lightsteelblue"),
        new Brick(480,220,100,20,"lightsteelblue"),
        new Brick(585,220,100,20,"lightsteelblue"),//Row 6
	];
}

function checkWinner(){
	if(bricks.length < 1){
		gameOver = true;
		winner = true;
	}
}

function restart(){
	out.innerHTML = "";
	ball = new Ball(300,400,10,4,4,"red");
	player = new Player(350,780,80,15);
    gameOver = false;
    loadMap();
	start();
}

function tryAgain(){
    out.innerHTML = "";
	ball = new Ball(300,400,10,4,4,"red");
	player = new Player(350,780,80,15);
    start()
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