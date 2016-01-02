var sun, earth, planets;

function Planet(x, y, mass, radius, velocity) {
  this.acceleration = createVector(0, 0)

  if (velocity) this.velocity = createVector(velocity.x, velocity.y)
  else this.velocity = createVector(0, 0)

  this.position = createVector(x || 0, y || 0)
  this.mass = mass;
  this.radius = radius;

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass)
    this.acceleration.add(f);
  }

  this.display = function() {
    stroke(0);
    fill(255);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }

  return this;
}

function setup(argument) {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  noStroke();

  sun = new Planet(window.innerWidth / 2, window.innerHeight / 2, 1000, 140);
  mars = new Planet(window.innerWidth / 8, window.innerHeight / 2, .5, 20, {x: 0, y: 3});
  earth = new Planet(window.innerWidth / 5, window.innerHeight / 2, 1, 20, {x: 0, y: 3});
  venus = new Planet(window.innerWidth / 4, window.innerHeight / 2, .01, 10, {x: 0, y: 3});
  mercury = new Planet(window.innerWidth / 3, window.innerHeight / 2, .001, 10, {x: 0, y: 3});

  planets = [sun, earth, mars, venus, mercury];
}

var init = true;
function draw(argument) {
  background(0);

  planets.map(function (planet) {
    for (var i = 0; i < planets.length; i++) {
      if (planets[i] !== planet) {
        var gravity = getGravity(planets[i], planet);
        planet.applyForce(gravity);
      }
    }

    planet.update();
    planet.display();
  });
}

function getGravity(p2, p1) {
  var pos2 = p2.position.copy();
  var pos1 = p1.position.copy();

  var force = pos2.sub(pos1);
  var dist = force.mag();

  dist = constrain(dist, p2.radius, 50);

  force.normalize();
  force.mult(.4 * p2.mass * p1.mass / Math.pow(dist, 2));
  return force;
}
