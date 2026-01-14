
// -----------------------------------------------------------------------------
// Scale Methods
// -----------------------------------------------------------------------------

var scaleFactor = 30;

var scaleToWorld = function(a,b) {
  if (a instanceof box2d.b2Vec2) {
    var newv = new box2d.b2Vec2();
    newv.x = (a.x)/scaleFactor;
    newv.y = (a.y)/scaleFactor;
    return newv;
  } else if ("undefined"!=typeof b) {
    var newv = new box2d.b2Vec2();
    newv.x = (a)/scaleFactor;
    newv.y = (b)/scaleFactor;
    return newv;
  } else {
    return a/scaleFactor;
  }
};

var scaleToPixels = function(a,b) {
  if (a instanceof box2d.b2Vec2) {
    var newv = new box2d.b2Vec2();
    newv.x = a.x*scaleFactor;
    newv.y = a.y*scaleFactor;
    return newv;
  } else if ("undefined"!=typeof b) {
    var newv = new box2d.b2Vec2();
    newv.x = a*scaleFactor;
    newv.y = b*scaleFactor;
    return newv;
  } else {
    return a*scaleFactor;
  }
};

// -----------------------------------------------------------------------------
// Create Methods
// -----------------------------------------------------------------------------

var createWorld = function() {

	var worldAABB = new box2d.b2AABB();
	// worldAABB.lowerBound.SetXY(-this.bounds, -this.bounds);
	// worldAABB.upperBound.SetXY(this.bounds, this.bounds);
	var gravity = new box2d.b2Vec2(0,10);
	var doSleep = true;

  scaleFactor = 10;

	return new box2d.b2World(gravity, doSleep);
};
