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