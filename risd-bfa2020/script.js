var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var rectangle, ellip, ellip2, ellip3, triang, rectangle1, hexagon;

var engine;
var world;
var boxes = [];
var mConstraint;
var ground, wall1, wall2, wall3;
var HelveticaNeue, lido;
var ctx;
var logo;
var scrollPos = 0;
var gScale;
var grid;
var bool=2;
var imgx;
// var iframe;
// var link;
var photo;
var maskImage;


function setup() {
  photo = loadImage("asset/firework6.gif");
  photo2 = loadImage("asset/firework3.gif");
  maskImage = createGraphics(200, 200);
  maskImage2 = createGraphics(250, 250);

  HelveticaNeue = loadFont("fonts/HelveticaNeueLTStd-Roman.otf");
  lido = loadFont("fonts/LidoSTF.otf");
  logo = loadImage("asset/logo.svg");
  // grid=loadImage("asset/cartesian.jpg");
  frameRate(60);
  var canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(width / 2, height + 50, width + 200, 98, options);
  wall1 = Bodies.rectangle(width / 2, -50, width + 200, 98, options);
  wall2 = Bodies.rectangle(-50, height / 2, 98, height, options);
  wall3 = Bodies.rectangle(width + 50, height / 2, 98, height, options);

  World.add(world, ground);
  //  World.add(world, wall1);
  World.add(world, wall2);
  World.add(world, wall3);

  options = {
    friction: 0.7,
    restitution: 0.5
  };

  rectangle = Bodies.rectangle(width * 0.25, -200, 450, 140, options);
  World.add(world, rectangle);

  ellip = Bodies.circle(width * 0.3, -200, 250, options)
  Body.scale(ellip, 1, 0.28);
  World.add(world, ellip);

  triang = Bodies.polygon(width * 0.6, -200, 3, 160, options);
  Body.scale(triang, 0.9, 1);
  Body.rotate(triang, 90);
  World.add(world, triang); //h=210


  options = {
    friction: 0.7,
    restitution: 0.5,
    chamfer: {
      radius: 65
    }
  };

  rectangle1 = Bodies.rectangle(width * 0.7, -200, 650, 130, options);
  World.add(world, rectangle1);
  options = {
    friction: 0.7,
    restitution: 0.5
  };

  hexagon = Bodies.polygon(width * 0.7, -300, 6, 160, options);
  Body.scale(hexagon, 0.8, 1);
  Body.rotate(hexagon, 90);
  World.add(world, hexagon);

  ellip2 = Bodies.polygon(width * 0.45, -300, 6, 160, options);
  Body.scale(ellip2, 0.5, 1);
  Body.rotate(ellip2, 90);
  World.add(world, ellip2);


  ellip3 = Bodies.polygon(width * 0.45, -20, 6, 160, options);
  Body.scale(ellip3, 0.5, 1);
  Body.rotate(ellip3, 90);
  World.add(world, ellip3);

  circle1 = Bodies.circle(width * 0.25, -100, 100, options)
  Body.scale(circle1, 0.3, 1);
  Body.rotate(circle1, 90);
  World.add(world, circle1);

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
  canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);
  canvasmouse.pixelRatio = pixelDensity();
  options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  world.gravity.y = 0.8;


  imgx=width/2;

  // iframe = createElement('iframe');
  // iframe.attribute('src', 'https://player.vimeo.com/video/379784240?title=0&byline=0&portrait=0');

}





function draw() {
  if (frameCount == 40) {
    World.add(world, wall1);
  }
  background(150);
  Engine.update(engine);


  if ((bool==1)&(imgx>=width*0.35)){
    imgx-=(width/2-width*0.35)/14;
  };
  if ((bool==0)&(imgx<=width/2)){
    imgx+=(width/2-width*0.35)/13;
  };
  imageMode(CENTER);
  push();

  translate(imgx,height/2+100);

  pop();

    drawRect();
    drawEllipse();
    drawEllipse2();
    drawEllipse3();
    // drawTriangle();
    drawRect1();
    drawHex();
    // drawCircle();

  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;
      World.add(world, wall1);
  }
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


function drawRect() {
  var pos = rectangle.position;
  var angle = rectangle.angle;

  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  //textAlign(CENTER);
  noStroke();
  fill(255, 102, 94);
  rect(0, 0, 500, 140);
  fill(0);
  textFont(HelveticaNeue);
  textSize(40);
  track("A CELEBRATION OF ", -178, -3, -1.5);
  textFont(lido);
  textSize(38);
  track("RISD GD Class of 2020", -170, 34, -1.5);
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
  fill(0, 120, 191);
  ellipse(0, 0, 500, 140);
  fill(0);
  textSize(40);
  textFont(HelveticaNeue);
  track("SPREAD THE WORD!", -180, -6, -1);
  pop();
}

function drawTriangle() {
  var pos = triang.position;
  var angle = triang.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle + PI * 3);
  scale(0.9, 1);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);
  noStroke();
  fill(0, 169, 92);
  polygon(0, 0, 160, 3);

  pop();
  push();
  fill(0);
  textSize(38);
  translate(pos.x, pos.y);
  rotate(angle + PI * 3 + PI / 2);
  textFont(lido);
  // trackTime("We", -55, -10, -2);
  // trackTime("Did it!", -40, 30, -2);

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
  rect(0, 0, 650, 130, 65);
  fill(0);

  // textFont(lido);
  // textSize(38);
  // track("Senior Show 2020 Catalogue", -200, -3, -1.5);
  // textFont(HelveticaNeue);
  // textSize(40);
  // track("DOWNLOAD ", -110, 34, -1.5);

  textFont(HelveticaNeue);
  textSize(40);
  track("END OF YEAR EVENT", -190, -3, -1.5);
  textFont(lido);
  textSize(38);
  track("May 29th, 2020",  -100, 34, -1.5);
 
  pop();

}

function clickable() {
     var Events = Matter.Events;
     var Render = Matter.Render;
   
     var render = Render.create({
       element: document.body,
       engine: engine,
       options: {
         width: 66,
         height: 5,
         wireframes: false,
         background: '#111',
         wireframeBackground: '#76F09B',
       }
   });
     var mouseInteractivity = MouseConstraint.create(engine, {
       mouse: render.mouse,
       constraint: {
         stiffness: 0.2,
         render: { visible: false }
       }
      });
   World.add(world, mouseInteractivity);
   
   // Create a On-Mouseup Event-Handler
   Events.on(mouseInteractivity, 'mouseup', function(event) {
     var mouseConstraint = event.source;
     var bodies = engine.world.bodies;
     if (!mouseConstraint.bodyB) {
       for (i = 0; i < bodies.length; i++) { 
         var body = bodies[i]; 
         if (Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
           var bodyUrl = body.url;
           console.log("Body.Url >> " + bodyUrl);
           // Hyperlinking feature
           if (bodyUrl != undefined) {
             window.open(bodyUrl, '_blank');
             console.log("Hyperlink was opened");
           }
           break;
         }
       }
     }
   });
}

// function pointer() {
//   link.addClass('hover');
// }


function drawHex() {
  var pos = hexagon.position;
  var angle = hexagon.angle;
  push();
  translate(pos.x, pos.y);

  rotate(angle + PI / 2);
  scale(1, 0.8);
  rectMode(CENTER);
  //textAlign(CENTER);
  noStroke();
  // fill(0, 120, 191);
  fill(0, 169, 92);
  polygon(0, 0, 140, 6);
  pop();
  push();

  fill(0);
  translate(pos.x, pos.y);
  rotate(angle + PI / 2 * 3);
  textSize(40);
  textFont(HelveticaNeue);

  track("CHECK", -70, -25, -1.5);
  track("US", -35, 15, -1.5);
  track("OUT!", -45, 55, -1.5);
  pop();

}

function drawEllipse2() {
  var pos = ellip2.position;
  var angle = ellip2.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);
  noStroke();
   // fill(255, 51, 51);

  // ellipse(0, 0, 200, 200);
  maskImage.fill(255);
  maskImage.ellipse(100, 100, 200, 200);
  photo.mask(maskImage);
  image(photo, 0, 0, 200, 200);
  pop();

  // fill(0);
  // textSize(40);
  // textFont(HelveticaNeue);
  // track("WOOT", -60, 20, -1);
  // track("WOOT", -60, -20, -1);

}

function drawEllipse3() {
  var pos = ellip3.position;
  var angle = ellip3.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);
  noStroke();
  maskImage2.fill(255);
  maskImage2.ellipse(125, 125, 250, 250);
  photo2.mask(maskImage2);
  image(photo2, 0, 0, 250, 250);
  pop();
}
function drawCircle() {
  var pos = circle1.position;
  var angle = circle1.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  textAlign(CENTER);
  noStroke();
  fill(255, 51, 51);
  ellipse(0, 0, 50, 50);
  fill(0);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bool=0;
  World.remove(world, wall3);
 
  options = {
    isStatic: true
  };
  wall3 = Bodies.rectangle(width + 50, height / 2, 98, height, options);
  World.add(world, wall3);
}



function sizeDown(){

  bool=1;

  width = width * 0.7;
  var canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  var options = {
    isStatic: true
  };

  ground = Bodies.rectangle(width / 2, height + 50, width + 200, 98, options);
  wall1 = Bodies.rectangle(width / 2, -50, width + 200, 98, options);
  wall2 = Bodies.rectangle(-50, height / 2, 98, height, options);
  wall3 = Bodies.rectangle(width*0.7 + 50, height / 2, 98, height, options);

  World.add(world, ground);

  World.add(world, wall2);
  World.add(world, wall3);

  options = {
    friction: 0.7,
    restitution: 0.5
  };

  rectangle = Bodies.rectangle(width * 0.25, -200, 450, 140, options);
  World.add(world, rectangle);

  ellip = Bodies.circle(width * 0.25, -200, 250, options)
  Body.scale(ellip, 1, 0.28);
  World.add(world, ellip);

  ellip2 = Bodies.circle(width * 0.25, -200, 250, options)
  Body.scale(ellip2, 1, 0.28);
  World.add(world, ellip2);

  ellip3 = Bodies.circle(width * 0.25, -200, 250, options)
  Body.scale(ellip3, 1, 0.28);
  World.add(world, ellip3);

  triang = Bodies.polygon(width * 0.3, -200, 3, 160, options);
  Body.scale(triang, 0.9, 1);
  Body.rotate(triang, 90);
  World.add(world, triang); //h=210


  options = {
    friction: 0.7,
    restitution: 0.5,
    chamfer: {
      radius: 65
    }
  };

  rectangle1 = Bodies.rectangle(width * 0.4, -200, 650, 130, options);
  World.add(world, rectangle1);
  options = {
    friction: 0.7,
    restitution: 0.5
  };

  hexagon = Bodies.polygon(width * 0.45, -300, 6, 160, options);
  Body.scale(hexagon, 0.8, 1);
  Body.rotate(hexagon, 90);
  World.add(world, hexagon);




  circle1 = Bodies.circle(width * 0.25, -100, 100, options)
  Body.scale(circle1, 0.5, 1);
  Body.rotate(circle1, 90);
  World.add(world, circle1);

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
  canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);
  canvasmouse.pixelRatio = pixelDensity();
  options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  world.gravity.y = 0.8;

  // iframe.remove();
  // iframe = createElement('iframe');
  // iframe.attribute('src', 'https://player.vimeo.com/video/379784240?title=0&byline=0&portrait=0');
  // iframe.addClass('active');

}



function sizeUp(){
  bool=0;
  World.remove(world, wall3);
 
  options = {
    isStatic: true
  };
  wall3 = Bodies.rectangle(width + 50, height / 2, 98, height, options);
  World.add(world, wall3);

  // iframe.removeClass('active');
}

function keyPressed() {
  if (keyCode === 32) {
    jump();
}}

function jump() {
  options = {
    isStatic: true
  };
  wall1 = Bodies.rectangle(width / 2, -50, width + 200, 98, options);
  World.add(world, wall1);

  Body.applyForce( rectangle, {x: rectangle.position.x, y: rectangle.position.y}, {x: 0, y: -4});
  Body.applyForce( ellip, {x: ellip.position.x, y: ellip.position.y}, {x: 0, y: -4});
  Body.applyForce( ellip2, {x: ellip2.position.x, y: ellip2.position.y}, {x: 0, y: -1});
  Body.applyForce( ellip3, {x: ellip3.position.x, y: ellip3.position.y}, {x: 0, y: -1});
  Body.applyForce( triang, {x: triang.position.x, y: triang.position.y}, {x: 0, y: -1});
  Body.applyForce( rectangle1, {x: rectangle1.position.x, y: rectangle1.position.y}, {x: 0, y: -6});
  Body.applyForce( hexagon, {x: hexagon.position.x, y: hexagon.position.y}, {x: 0, y: -1});
  Body.applyForce( circle1, {x: circle1.position.x, y: circle1.position.y}, {x: 0, y: -2});

}

/*  =========================================================================
  Toggle Menu
  ==========================================================================   */

$("header h1:nth-child(2)").click(function(){

    if (!(mConstraint.body)) {
      if (!$("#names").hasClass("active")) {
        $('#names').toggleClass('active');
        $('header').toggleClass('active');
        sizeDown();
      }
      else if (mouseX<width*0.7) {
        $('#names').toggleClass('active');
          $('header').toggleClass('active');
        sizeUp();
      }
    }

});


/*  =========================================================================
  Hovered item shows on each students name
  ==========================================================================   */

function hoverName(){
  $("li[data-icon]").hover(
    function(){
      var thisPosition = $(this).position();
      var right = 20;
      var bottom = $(window).height() - event.pageY;
     
      if(($(this).is('li[data-icon]:last'))||($(this).is('li[data-icon]:nth-last-child(3)')) || (bottom < 500 ) ) {
        if ($(this).hasClass('square')){
          var top = thisPosition.top - 260;
        }  if ($(this).hasClass('portrait')){
          var top = thisPosition.top - 330;
        } if ($(this).hasClass('landscape')){
          var top = thisPosition.top - 200;
        } if ($(this).hasClass('wide')){
          var top = thisPosition.top - 140;
        }
      } else {
        if ($(this).hasClass('square')){
          var top = thisPosition.top + 45;
        }  if ($(this).hasClass('portrait')){
          var top = thisPosition.top + 45;
        } if ($(this).hasClass('landscape')){
          var top = thisPosition.top + 45;
        } if ($(this).hasClass('wide')){
          var top = thisPosition.top + 45;
        }
      }
  
      $('#thumb').css({"top": top + "px", "right": right + "px"});
      $('#thumb').addClass('visible');
      $('body').find('#thumb').append("<img src='./img/" + $(this).attr('data-icon') + "'>"); 
      console.log($(this).attr('data-icon'));
    }, function(){
      $('body').find('#thumb').find('img').remove();
      $('#thumb').removeClass('visible');
    }
  )
};

/*  =========================================================================
  iframe update on menu open/close
  ==========================================================================   */

  $( document ).ready(function(){
    
    if($('header').hasClass('active')) {
      // $('iframe').addClass('active'); 
     }
      hoverName();
  });

  $(window).on('resize', function(){
      hoverName();
  });
  


