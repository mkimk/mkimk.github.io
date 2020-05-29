var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var rectangle, ellip, ellip2, rectangle1, hexagon;

var engine;
var world;
var mConstraint;
var ground, wall1, wall2, wall3;
var HelveticaNeue, lido;
var ctx;
var scrollPos = 0;
var gScale;
var bool = 2;
var photo;
var boxes = [];
var bgcolor;

function setup() {
  photo = loadImage("asset/firework6.gif");
  HelveticaNeue = loadFont("fonts/08edde9d-c27b-4731-a27f-d6cd9b01cd06.woff");
  lido = loadFont("fonts/font.woff");
  frameRate(60);
  bgcolor = 155;
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
  World.add(world, wall2);
  World.add(world, wall3);

  options = {
    friction: 0.7,
    restitution: 0.5
  };

  rectangle = Bodies.rectangle(width * 0.4, -200, 550, 170, options);
  World.add(world, rectangle);

  ellip = Bodies.circle(width * 0.5, -200, 300, options)
  Body.scale(ellip, 1, 0.3);
  World.add(world, ellip);

  ellip2 = Bodies.circle(width * 0.4, 100, 100, options)
  World.add(world, ellip2);

  hexagon = Bodies.polygon(width * 0.7, -300, 6, 150, options);
  Body.scale(hexagon, 0.8, 1);
  Body.rotate(hexagon, 90);
  World.add(world, hexagon);

  options = {
    friction: 0.7,
    restitution: 0.5,
    chamfer: {
      radius: 65
    }
  };

  rectangle1 = Bodies.rectangle(width * 0.7, -200, 650, 140, options);
  World.add(world, rectangle1);

  options = {
    friction: 0.7,
    restitution: 0.5
  };

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
}


function draw() {
  background(bgcolor*0.5, bgcolor, 50);
  Engine.update(engine);

  push();
  pop();

  drawCircles();
  drawRect();
  drawEllipse();
  drawEllipse2();
  drawRect1();
  drawHex();

  if (mConstraint.body) {
      World.add(world, wall1);
  }
  if (frameCount == 40) {
    World.add(world, wall1);
  }
}


function mouseDragged() {
  boxes.push(new circles(mouseX, mouseY, 50, 50));
  // boxes.push(drawCircles);
  bgcolor = frameCount % 400;
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

  boxes.splice(0, boxes.length);
  bool=1;

  width=width*0.65 + 50;
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
  wall3 = Bodies.rectangle(width*0.65 + 50, height / 2, 98, height, options);

  World.add(world, ground);
  World.add(world, wall2);
  World.add(world, wall3);

  options = {
    friction: 0.7,
    restitution: 0.5
  };

  rectangle = Bodies.rectangle(width * 0.25, -200, 450, 140, options);
  World.add(world, rectangle);

  ellip = Bodies.circle(width * 0.4, -200, 250, options)
  Body.scale(ellip, 1, 0.3);
  World.add(world, ellip);

  options = {
    friction: 0.7,
    restitution: 0.5,
    chamfer: {
      radius: 65
    }
  };

  rectangle1 = Bodies.rectangle(width * 0.4, -200, 650, 140, options);
  World.add(world, rectangle1);
  options = {
    friction: 0.7,
    restitution: 0.5
  };

  hexagon = Bodies.polygon(width * 0.4, -300, 6, 160, options);
  Body.scale(hexagon, 0.8, 1);
  Body.rotate(hexagon, 90);
  World.add(world, hexagon);
  

  ellip2 = Bodies.circle(width * 0.25, 100, 215, options)
  Body.scale(ellip2, 1, 0.28);
  World.add(world, ellip2);


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

  boxes.push(new circles(mouseX, mouseY, 50, 50));

}


function sizeUp(){
  bool=0;
  World.remove(world, wall3);
 
  options = {
    isStatic: true
  };
  wall3 = Bodies.rectangle(width + 50, height / 2, 98, height, options);
  World.add(world, wall3);
}


function keyPressed() {
    jump();
}


function jump() {
  options = {
    isStatic: true
  };
  wall1 = Bodies.rectangle(width / 2, -50, width + 200, 98, options);
  World.add(world, wall1);
  Body.applyForce( rectangle, {x: rectangle.position.x, y: rectangle.position.y}, {x: 0, y: -4});
  Body.applyForce( rectangle1, {x: rectangle1.position.x, y: rectangle1.position.y}, {x: 0, y: -6});
  Body.applyForce( ellip, {x: ellip.position.x, y: ellip.position.y}, {x: 0, y: -4});
  Body.applyForce( ellip2, {x: ellip2.position.x, y: ellip2.position.y}, {x: 0, y: -4});
  Body.applyForce( hexagon, {x: hexagon.position.x, y: hexagon.position.y}, {x: 0, y: -4});
}


//Hovered item shows on each students name
function hoverName(){
  $("li[data-icon]").hover(
    function(){
      var thisPosition = $(this).position();
      var right = 20;
      var bottom = $(window).height() - event.pageY;
     
      if(($(this).is('li[data-icon]:last'))||($(this).is('li[data-icon]:nth-last-child(3)')) || (bottom < 500 ) ) {
        if ($(this).hasClass('square')){
          var top = thisPosition.top - 310;
        } else if ($(this).hasClass('portrait')){
          var top = thisPosition.top - 360;
        } else if ($(this).hasClass('landscape')){
          var top = thisPosition.top - 205;
        } else if ($(this).hasClass('wide')){
          var top = thisPosition.top - 168;
        }
      } else {
        if ($(this).hasClass('square')){
          var top = thisPosition.top + 45;
        } else if ($(this).hasClass('portrait')){
          var top = thisPosition.top + 45;
        } else if ($(this).hasClass('landscape')){
          var top = thisPosition.top + 45;
        } else if ($(this).hasClass('wide')){
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

$( document ).ready(function(){

    hoverName();

    //define text color on hover
    $("li[data-icon], li a, a#downloadlink").hover(
      function() {
        $(this).css({"color": "rgb(" + bgcolor*0.5 +',' + bgcolor + ','+ 50 +")"});
      }, function(){
        $(this).css({"color": "white"});
      }
    )
    //toggle menu
    $("header h1:nth-child(2)").click(function(){
      if (!(mConstraint.body)) {
        if (!$("#names").hasClass("active")) {
          $('#names').toggleClass('active');
          $('header').toggleClass('active');
          sizeDown();
        }
        else if (mouseX<width*0.65) {
          $('#names').toggleClass('active');
            $('header').toggleClass('active');
          sizeUp();
        }
      }
    });
});

$(window).on('resize', function(){
    hoverName();
});
  


