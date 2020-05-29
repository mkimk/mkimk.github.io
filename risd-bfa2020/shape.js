function drawCircles () {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
}


function circles(x, y, w, h) {
    options = {
        friction: 0.7,
        restitution: 0.5
      };

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    this.show = function () {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        noStroke();
        circle(this.w-50, this.h, 50);
        pop();
    }
}


function drawRect() {
    var pos = rectangle.position;
    var angle = rectangle.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(255, 38, 17);
    rect(0, 0, 550, 170);
    fill(0);
    textFont(HelveticaNeue);
    textSize(47);
    track("A CELEBRATION OF ", -208, -5, -1.5);
    textFont(lido);
    textSize(45);
    track("RISD GD Class of 2020", -200, 37, -1.5);
    pop();
}


function drawEllipse() {
    var pos = ellip.position;
    var angle = ellip.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    textAlign(LEFT, CENTER);
    noStroke();
    fill(43, 153, 255);
    ellipse(0, 0, 580, 170);
    fill(0);
    textSize(47);
    textFont(HelveticaNeue);
    track("SPREAD THE WORD!", -220, -7, -1);
    pop();
}


function drawRect1() {
    var pos = rectangle1.position;
    var angle = rectangle1.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(255, 232, 0);
    rect(0, 0, 650, 140, 70);
    fill(0);
    textFont(HelveticaNeue);
    textSize(47);
    track("END OF YEAR EVENT", -210, -7, -1.5);
    textFont(lido);
    textSize(45);
    track("May 29th, 2020",  -120, 39, -1.5);
    pop();
}

function drawHex() {
    var pos = hexagon.position;
    var angle = hexagon.angle;
    push();
    translate(pos.x, pos.y);
  
    rotate(angle + PI / 2);
    scale(1, 0.8);
    rectMode(CENTER);
    noStroke();
    fill(0, 173, 52);
    polygon(0, 0, 150, 6);
    pop();
    push();
  
    fill(0);
    translate(pos.x, pos.y);
    rotate(angle + PI / 2 * 3);
    textSize(47);
    textFont(HelveticaNeue);
    track("CHECK", -80, -25, -1.5);
    track("US", -40, 20, -1.5);
    track("OUT!", -55, 65, -1.5);
    pop();
}

function drawEllipse2() {
    var pos = ellip2.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    noStroke();
    image(photo, -100, -100, 200, 200);
    pop();
}


function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}


function track(type, x, y, tracking) {
    for (var i = 0; i < type.length; i++) {
      text(type[i], x, y);
      x = x + textWidth(type[i]) + tracking;
    }
}


//kerning pair for P.M.
function trackTime(type, x, y, tracking) {
    for (var i = 0; i < type.length; i++) {
      text(type[i], x, y);
      x = x + textWidth(type[i]) + tracking;
      if (type[i] == "P") {
        x -= 5;
      }
    }
}
