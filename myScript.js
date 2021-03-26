let _w, _h;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	angleMode(DEGREES);
	_w = windowWidth;
  _h = windowHeight;
}

class Creature{
	constructor(x, y, colour, size) {
		scale(size)
		push();
		translate(x, y);
		moveCreature(mouseX, mouseY);
		drawBg(0, 0);
		tiltCreature(mouseX, mouseY);
		push();
		translate(0, -75);
		draw3Heads(0,0);
		pop();

		push();
		translate(0, 25);
		drawBody(0,0);
		pop();

		push();
		translate(25 , 30);
		drawRightWing(0,0);
		pop();

		push();
		translate(-25 , 30);
		drawLeftWing(0,0);
		pop();

		push();
		translate(0, 150);
		drawCircle(0,0,3,30);
		pop();
		pop();
	}
	
	getSize() {
		return self.size
	}
	
	getPosition(){
		return x, y
	}

    moveMouse(mX, mY) {
        let dX = mX - _w/2;
        let dY = mY - _h/2;
        let x = map(dX, -_w/2, _w/2, 200, -200);
        let y = map(dY, -_w/2, _w/2, 200, -200);
        let noizX = noise(frameCount/500);
        let noizY = noise(100+(frameCount/500));
        if (mouseIsPressed){
            m += 10;
            if (m > 300) {
                m = 50
            }
        }
        let vibX = map(noizX, 0, 1, -m, m)
        let vibY = map(noizY, 0, 1, m, -m)
        translate(x + vibX, y + vibY);
    }
	
    tiltCreature(mX, mY) {
        let d = mouseX - _w/2
        let theta = map(d, 700, -700, -20, 20)
        rotate(theta);
    }


}
	

function drawEyes(x, y) {
	noFill();
	fill(255);
	circle(x, y, 20);
	fill('#413c69');
	circle(x, y, 10);
}

function drawMouth(x, y, colour) {
	noFill();
	fill('#810034');
	circle(x, y, 20);
	fill('#ff005c');
	circle(x, y, 10);
}

//headWidth is 50, headHeight is 120
function drawHead(x, y) {
	// noFill();fa1e0e
	fill('#bd2000');
	quad(x -10, y + 80, x + 10, y + 80, x + 10, y - 60, x -10, y - 60);
	fill('#fa1e0e')
	circle(x, y-60, 60);
	drawEyes(x-15,y-70);
	drawEyes(x+15,y-70);
	drawMouth(x, y-50);
}



//3headsWidth is 50, 3headsHeight is 170
function draw3Heads(x, y) {
	push();
	rotate(-40);
	for (let i = 0; i < 3; i++){
		drawHead(x, y-65);
		rotate(40);
	}
	pop();
}

//bodyWidth is 50, bodyHeight is 200
function drawBody(x, y) {
	rectMode(CENTER);
	fill('#8c0000');
	rect(x, y, 50, 200);
}

function drawRightWing(x, y) {
	let n = map(cos(frameCount*15), 1, -1, 12, 0)
	let ang = n;
	stroke('#ffbe0f')
	push();
	rotate (30);
	for (let i = 0; i < 10; i++) {
		line(x, y , x, -120);
		rotate(ang);
	}
	pop();
}

function drawLeftWing(x, y) {
	let n = map(cos(frameCount*15), 1, -1, 12, 0)
	let ang = n;
	stroke('#ffbe0f')
	push();
	rotate (-30);
	for (let i = 0; i < 10; i++) {
		line(x, y , x, -120);
		rotate(-ang);
	}
	pop();
}

//
function drawCircle(x, y, n) {
	noFill();
	stroke('#ffbe0f')
	let r = map ((sin(frameCount)**2), 0, 2, 10, 30);
	for (let i = 0; i < 3; i++) {
		ellipse(x, y, 2*r, r);
		translate(0, r/2);
		r += 10
	}
	
}

let m = 100;

function moveCreature(mX, mY) {
	let dX = mX - _w/2;
	let dY = mY - _h/2;
	let x = map(dX, -_w/2, _w/2, 200, -200);
	let y = map(dY, -_w/2, _w/2, 200, -200);
	let noizX = noise(frameCount/500);
	let noizY = noise(100+(frameCount/500));
	if (mouseIsPressed){
		m += 10;
		if (m > 300) {
			m = 50
		}
	}
	let vibX = map(noizX, 0, 1, -m, m)
	let vibY = map(noizY, 0, 1, m, -m)
	translate(x + vibX, y + vibY);
}

function tiltCreature(mX, mY) {
	let d = mouseX - _w/2
	let theta = map(d, 700, -700, -20, 20)
	rotate(theta);
}

function drawBg(_x, _y) {
	noStroke();
	fill(255);
	let n = 0;
	for (let i = 0; i <50; i++) {
		let dx = noise(frameCount/500 + n)
		let dy = noise(frameCount/500 + 100 + n)
		let x = map(dx, 0, 1, _x-200, _x +200)
		let y = map(dy, 0, 1, _y -50 , _y +150)
		n += 10
		circle(x, y, 5);
	}
}

let r;

function draw() {
	r = 10;
	if (mouseIsPressed){
		if (frameCount % 20 < 19) {
			background(0, 30);
		}
		else{
			background(255, 30);
		}
	}
	else{
		background(0,70);
	}
	
	let a = new Creature(_w/2, _h/2);
}