var SHAPE_BOX     = 0;
var SHAPE_CIRCLE  = 1;
var SHAPE_POLYGON = 2;
var SHAPE_CHAIN   = 3;
var SHAPE_EDGE    = 5;

var JOINT_PULLEY    = 4;
var JOINT_DISTANCE  = 0;
var JOINT_WELD      = 1;
var JOINT_REVOLUTE  = 2;
var JOINT_GEAR      = 5;
var JOINT_PRISMATIC = 6;
var JOINT_WHEEL     = 3;
var JOINT_ROPE      = 7;
var JOINT_FRICTION  = 9;
var JOINT_MOTOR     = 11;
var JOINT_MOUSE     = 10;

// box2d
var b2Settings = box2d.b2Settings;
var DEBUG = box2d.DEBUG;
var ENABLE_ASSERTS = box2d.ENABLE_ASSERTS;
var b2Assert = box2d.b2Assert;
var b2_maxFloat = box2d.b2_maxFloat;
var b2_epsilon = box2d.b2_epsilon;
var b2_epsilon_sq = box2d.b2_epsilon_sq;
var b2_pi = box2d.b2_pi;
var b2_maxManifoldPoints = box2d.b2_maxManifoldPoints;
var b2_maxPolygonVertices = box2d.b2_maxPolygonVertices;
var b2_aabbExtension = box2d.b2_aabbExtension;
var b2_aabbMultiplier = box2d.b2_aabbMultiplier;
var b2_linearSlop = box2d.b2_linearSlop;
var b2_angularSlop = box2d.b2_angularSlop;
var b2_polygonRadius = box2d.b2_polygonRadius;
var b2_maxSubSteps = box2d.b2_maxSubSteps;
var b2_maxTOIContacts = box2d.b2_maxTOIContacts;
var b2_velocityThreshold = box2d.b2_velocityThreshold;
var b2_maxLinearCorrection = box2d.b2_maxLinearCorrection;
var b2_maxAngularCorrection = box2d.b2_maxAngularCorrection;
var b2_maxTranslation = box2d.b2_maxTranslation;
var b2_maxTranslationSquared = box2d.b2_maxTranslationSquared;
var b2_maxRotation = box2d.b2_maxRotation;
var b2_maxRotationSquared = box2d.b2_maxRotationSquared;
var b2_baumgarte = box2d.b2_baumgarte;
var b2_toiBaumgarte = box2d.b2_toiBaumgarte;
var b2_invalidParticleIndex = box2d.b2_invalidParticleIndex;
var b2_maxParticleIndex = box2d.b2_maxParticleIndex;
var b2_particleStride = box2d.b2_particleStride;
var b2_minParticleWeight = box2d.b2_minParticleWeight;
var b2_maxParticlePressure = box2d.b2_maxParticlePressure;
var b2_maxParticleForce = box2d.b2_maxParticleForce;
var b2_maxTriadDistance = box2d.b2_maxTriadDistance;
var b2_maxTriadDistanceSquared = box2d.b2_maxTriadDistanceSquared;
var b2_minParticleSystemBufferCapacity = box2d.b2_minParticleSystemBufferCapacity;
var b2_barrierCollisionTime = box2d.b2_barrierCollisionTime;
var b2_timeToSleep = box2d.b2_timeToSleep;
var b2_linearSleepTolerance = box2d.b2_linearSleepTolerance;
var b2_angularSleepTolerance = box2d.b2_angularSleepTolerance;
var b2Alloc = box2d.b2Alloc;
var b2Free = box2d.b2Free;
var b2Log = box2d.b2Log;
var b2Version = box2d.b2Version;
var b2_version = box2d.b2_version;
var b2_changelist = box2d.b2_changelist;
var b2ParseInt = box2d.b2ParseInt;
var b2ParseUInt = box2d.b2ParseUInt;
var b2MakeArray = box2d.b2MakeArray;
var b2MakeNumberArray = box2d.b2MakeNumberArray;
var b2Color = box2d.b2Color;
var b2DrawFlags = box2d.b2DrawFlags;
var b2Draw = box2d.b2Draw;
var b2GrowableStack = box2d.b2GrowableStack;
var b2Math = box2d.b2Math;
var b2_pi_over_180 = box2d.b2_pi_over_180;
var b2_180_over_pi = box2d.b2_180_over_pi;
var b2_two_pi = box2d.b2_two_pi;
var b2Abs = box2d.b2Abs;
var b2Min = box2d.b2Min;
var b2Max = box2d.b2Max;
var b2Clamp = box2d.b2Clamp;
var b2Wrap = box2d.b2Wrap;
var b2WrapAngle = box2d.b2WrapAngle;
var b2Swap = box2d.b2Swap;
var b2IsValid = box2d.b2IsValid;
var b2Sq = box2d.b2Sq;
var b2InvSqrt = box2d.b2InvSqrt;
var b2Sqrt = box2d.b2Sqrt;
var b2Pow = box2d.b2Pow;
var b2DegToRad = box2d.b2DegToRad;
var b2RadToDeg = box2d.b2RadToDeg;
var b2Cos = box2d.b2Cos;
var b2Sin = box2d.b2Sin;
var b2Acos = box2d.b2Acos;
var b2Asin = box2d.b2Asin;
var b2Atan2 = box2d.b2Atan2;
var b2NextPowerOfTwo = box2d.b2NextPowerOfTwo;
var b2IsPowerOfTwo = box2d.b2IsPowerOfTwo;
var b2Random = box2d.b2Random;
var b2RandomRange = box2d.b2RandomRange;
var b2Vec2 = box2d.b2Vec2;
var b2Vec2_zero = box2d.b2Vec2_zero;
var b2Abs_V2 = box2d.b2Abs_V2;
var b2Min_V2_V2 = box2d.b2Min_V2_V2;
var b2Max_V2_V2 = box2d.b2Max_V2_V2;
var b2Clamp_V2_V2_V2 = box2d.b2Clamp_V2_V2_V2;
var b2Dot_V2_V2 = box2d.b2Dot_V2_V2;
var b2Cross_V2_V2 = box2d.b2Cross_V2_V2;
var b2Cross_V2_S = box2d.b2Cross_V2_S;
var b2Cross_S_V2 = box2d.b2Cross_S_V2;
var b2Add_V2_V2 = box2d.b2Add_V2_V2;
var b2Sub_V2_V2 = box2d.b2Sub_V2_V2;
var b2Add_V2_S = box2d.b2Add_V2_S;
var b2Sub_V2_S = box2d.b2Sub_V2_S;
var b2Mul_S_V2 = box2d.b2Mul_S_V2;
var b2Mul_V2_S = box2d.b2Mul_V2_S;
var b2Div_V2_S = box2d.b2Div_V2_S;
var b2AddMul_V2_S_V2 = box2d.b2AddMul_V2_S_V2;
var b2SubMul_V2_S_V2 = box2d.b2SubMul_V2_S_V2;
var b2AddCross_V2_S_V2 = box2d.b2AddCross_V2_S_V2;
var b2Mid_V2_V2 = box2d.b2Mid_V2_V2;
var b2Ext_V2_V2 = box2d.b2Ext_V2_V2;
var b2Distance = box2d.b2Distance;
var b2DistanceSquared = box2d.b2DistanceSquared;
var b2Vec3 = box2d.b2Vec3;
var b2Add_V3_V3 = box2d.b2Add_V3_V3;
var b2Sub_V3_V3 = box2d.b2Sub_V3_V3;
var b2Dot_V3_V3 = box2d.b2Dot_V3_V3;
var b2Cross_V3_V3 = box2d.b2Cross_V3_V3;
var b2Vec4 = box2d.b2Vec4;
var b2Mat22 = box2d.b2Mat22;
var b2Abs_M22 = box2d.b2Abs_M22;
var b2Mul_M22_V2 = box2d.b2Mul_M22_V2;
var b2MulT_M22_V2 = box2d.b2MulT_M22_V2;
var b2Add_M22_M22 = box2d.b2Add_M22_M22;
var b2Mul_M22_M22 = box2d.b2Mul_M22_M22;
var b2MulT_M22_M22 = box2d.b2MulT_M22_M22;
var b2Mat33 = box2d.b2Mat33;
var b2Mul_M33_V3 = box2d.b2Mul_M33_V3;
var b2Mul_M33_X_Y_Z = box2d.b2Mul_M33_X_Y_Z;
var b2Mul22_M33_V2 = box2d.b2Mul22_M33_V2;
var b2Mul_M33_X_Y = box2d.b2Mul_M33_X_Y;
var b2Rot = box2d.b2Rot;
var b2Mul_R_R = box2d.b2Mul_R_R;
var b2MulT_R_R = box2d.b2MulT_R_R;
var b2Mul_R_V2 = box2d.b2Mul_R_V2;
var b2MulT_R_V2 = box2d.b2MulT_R_V2;
var b2Transform = box2d.b2Transform;
var b2Mul_X_V2 = box2d.b2Mul_X_V2;
var b2MulT_X_V2 = box2d.b2MulT_X_V2;
var b2Mul_X_X = box2d.b2Mul_X_X;
var b2MulT_X_X = box2d.b2MulT_X_X;
var b2Sweep = box2d.b2Sweep;
var b2Dot = box2d.b2Dot;
var b2Cross = box2d.b2Cross;
var b2Add = box2d.b2Add;
var b2Sub = box2d.b2Sub;
var b2Mul = box2d.b2Mul;
var b2Mul22 = box2d.b2Mul22;
var b2MulT = box2d.b2MulT;
var b2DistanceProxy = box2d.b2DistanceProxy;
var b2SimplexCache = box2d.b2SimplexCache;
var b2DistanceInput = box2d.b2DistanceInput;
var b2DistanceOutput = box2d.b2DistanceOutput;
var b2_gjkCalls = box2d.b2_gjkCalls;
var b2_gjkIters = box2d.b2_gjkIters;
var b2_gjkMaxIters = box2d.b2_gjkMaxIters;
var b2SimplexVertex = box2d.b2SimplexVertex;
var b2Simplex = box2d.b2Simplex;
var b2ShapeDistance = box2d.b2ShapeDistance;
var b2Collision = box2d.b2Collision;
var b2ContactFeatureType = box2d.b2ContactFeatureType;
var b2ContactFeature = box2d.b2ContactFeature;
var b2ContactID = box2d.b2ContactID;
var b2ManifoldPoint = box2d.b2ManifoldPoint;
var b2ManifoldType = box2d.b2ManifoldType;
var b2Manifold = box2d.b2Manifold;
var b2WorldManifold = box2d.b2WorldManifold;
var b2PointState = box2d.b2PointState;
var b2GetPointStates = box2d.b2GetPointStates;
var b2ClipVertex = box2d.b2ClipVertex;
var b2RayCastInput = box2d.b2RayCastInput;
var b2RayCastOutput = box2d.b2RayCastOutput;
var b2AABB = box2d.b2AABB;
var b2TestOverlap_AABB = box2d.b2TestOverlap_AABB;
var b2ClipSegmentToLine = box2d.b2ClipSegmentToLine;
var b2TestOverlap_Shape = box2d.b2TestOverlap_Shape;
var b2TestOverlap = box2d.b2TestOverlap;
var b2CollideCircle = box2d.b2CollideCircle;
var b2CollideCircles = box2d.b2CollideCircles;
var b2CollidePolygonAndCircle = box2d.b2CollidePolygonAndCircle;
var b2CollideEdge = box2d.b2CollideEdge;
var b2CollideEdgeAndCircle = box2d.b2CollideEdgeAndCircle;
var b2EPAxisType = box2d.b2EPAxisType;
var b2EPAxis = box2d.b2EPAxis;
var b2TempPolygon = box2d.b2TempPolygon;
var b2ReferenceFace = box2d.b2ReferenceFace;
var b2EPColliderVertexType = box2d.b2EPColliderVertexType;
var b2EPCollider = box2d.b2EPCollider;
var b2CollideEdgeAndPolygon = box2d.b2CollideEdgeAndPolygon;
var b2CollidePolygon = box2d.b2CollidePolygon;
var b2FindMaxSeparation = box2d.b2FindMaxSeparation;
var b2FindIncidentEdge = box2d.b2FindIncidentEdge;
var b2CollidePolygons = box2d.b2CollidePolygons;
var b2TreeNode = box2d.b2TreeNode;
var b2DynamicTree = box2d.b2DynamicTree;
var b2Pair = box2d.b2Pair;
var b2BroadPhase = box2d.b2BroadPhase;
var b2PairLessThan = box2d.b2PairLessThan;
var b2MassData = box2d.b2MassData;
var b2ShapeType = box2d.b2ShapeType;
var b2Shape = box2d.b2Shape;
var b2CircleShape = box2d.b2CircleShape;
var b2EdgeShape = box2d.b2EdgeShape;
var b2ChainShape = box2d.b2ChainShape;
var b2PolygonShape = box2d.b2PolygonShape;
var b2Timer = box2d.b2Timer;
var b2Counter = box2d.b2Counter;
var b2_toiTime = box2d.b2_toiTime;
var b2_toiMaxTime = box2d.b2_toiMaxTime;
var b2_toiCalls = box2d.b2_toiCalls;
var b2_toiIters = box2d.b2_toiIters;
var b2_toiMaxIters = box2d.b2_toiMaxIters;
var b2_toiRootIters = box2d.b2_toiRootIters;
var b2_toiMaxRootIters = box2d.b2_toiMaxRootIters;
var b2TOIInput = box2d.b2TOIInput;
var b2TOIOutputState = box2d.b2TOIOutputState;
var b2TOIOutput = box2d.b2TOIOutput;
var b2SeparationFunctionType = box2d.b2SeparationFunctionType;
var b2SeparationFunction = box2d.b2SeparationFunction;
var b2TimeOfImpact = box2d.b2TimeOfImpact;
var b2Filter = box2d.b2Filter;
var b2FixtureDef = box2d.b2FixtureDef;
var b2FixtureProxy = box2d.b2FixtureProxy;
var b2Fixture = box2d.b2Fixture;
var b2BodyType = box2d.b2BodyType;
var b2BodyDef = box2d.b2BodyDef;
var b2Body = box2d.b2Body;
var b2Profile = box2d.b2Profile;
var b2TimeStep = box2d.b2TimeStep;
var b2Position = box2d.b2Position;
var b2Velocity = box2d.b2Velocity;
var b2SolverData = box2d.b2SolverData;
var b2WorldCallbacks = box2d.b2WorldCallbacks;
var b2DestructionListener = box2d.b2DestructionListener;
var b2ContactFilter = box2d.b2ContactFilter;
var b2ContactImpulse = box2d.b2ContactImpulse;
var b2ContactListener = box2d.b2ContactListener;
var b2QueryCallback = box2d.b2QueryCallback;
var b2RayCastCallback = box2d.b2RayCastCallback;
var b2MixFriction = box2d.b2MixFriction;
var b2MixRestitution = box2d.b2MixRestitution;
var b2ContactEdge = box2d.b2ContactEdge;
var b2Contact = box2d.b2Contact;
var b2ChainAndCircleContact = box2d.b2ChainAndCircleContact;
var b2ChainAndPolygonContact = box2d.b2ChainAndPolygonContact;
var b2CircleContact = box2d.b2CircleContact;
var b2ContactRegister = box2d.b2ContactRegister;
var b2ContactFactory = box2d.b2ContactFactory;
var b2ContactManager = box2d.b2ContactManager;
var b2EdgeAndCircleContact = box2d.b2EdgeAndCircleContact;
var b2EdgeAndPolygonContact = box2d.b2EdgeAndPolygonContact;
var b2PolygonAndCircleContact = box2d.b2PolygonAndCircleContact;
var b2PolygonContact = box2d.b2PolygonContact;
var g_blockSolve = box2d.g_blockSolve;
var b2VelocityConstraintPoint = box2d.b2VelocityConstraintPoint;
var b2ContactVelocityConstraint = box2d.b2ContactVelocityConstraint;
var b2ContactPositionConstraint = box2d.b2ContactPositionConstraint;
var b2ContactSolverDef = box2d.b2ContactSolverDef;
var b2ContactSolver = box2d.b2ContactSolver;
var b2PositionSolverManifold = box2d.b2PositionSolverManifold;
var b2Island = box2d.b2Island;
var b2JointType = box2d.b2JointType;
var b2LimitState = box2d.b2LimitState;
var b2Jacobian = box2d.b2Jacobian;
var b2JointEdge = box2d.b2JointEdge;
var b2JointDef = box2d.b2JointDef;
var b2Joint = box2d.b2Joint;
var b2AreaJointDef = box2d.b2AreaJointDef;
var b2AreaJoint = box2d.b2AreaJoint;
var b2DistanceJointDef = box2d.b2DistanceJointDef;
var b2DistanceJoint = box2d.b2DistanceJoint;
var b2FrictionJointDef = box2d.b2FrictionJointDef;
var b2FrictionJoint = box2d.b2FrictionJoint;
var b2JointFactory = box2d.b2JointFactory;
var b2World = box2d.b2World;
var b2MotorJointDef = box2d.b2MotorJointDef;
var b2MotorJoint = box2d.b2MotorJoint;
var b2MouseJointDef = box2d.b2MouseJointDef;
var b2MouseJoint = box2d.b2MouseJoint;
var b2PrismaticJointDef = box2d.b2PrismaticJointDef;
var b2PrismaticJoint = box2d.b2PrismaticJoint;
var b2_minPulleyLength = box2d.b2_minPulleyLength;
var b2PulleyJointDef = box2d.b2PulleyJointDef;
var b2PulleyJoint = box2d.b2PulleyJoint;
var b2RevoluteJointDef = box2d.b2RevoluteJointDef;
var b2RevoluteJoint = box2d.b2RevoluteJoint;
var b2GearJointDef = box2d.b2GearJointDef;
var b2GearJoint = box2d.b2GearJoint;
var b2RopeJointDef = box2d.b2RopeJointDef;
var b2RopeJoint = box2d.b2RopeJoint;
var b2WeldJointDef = box2d.b2WeldJointDef;
var b2WeldJoint = box2d.b2WeldJoint;
var b2WheelJointDef = box2d.b2WheelJointDef;
var b2WheelJoint = box2d.b2WheelJoint;
var b2Particle = box2d.b2Particle;
var b2ParticleFlag = box2d.b2ParticleFlag;
var b2ParticleColor = box2d.b2ParticleColor;
var B2PARTICLECOLOR_BITS_PER_COMPONENT = box2d.B2PARTICLECOLOR_BITS_PER_COMPONENT;
var B2PARTICLECOLOR_MAX_VALUE = box2d.B2PARTICLECOLOR_MAX_VALUE;
var b2ParticleColor_zero = box2d.b2ParticleColor_zero;
var b2ParticleDef = box2d.b2ParticleDef;
var b2CalculateParticleIterations = box2d.b2CalculateParticleIterations;
var b2ParticleHandle = box2d.b2ParticleHandle;
var b2ParticleGroupFlag = box2d.b2ParticleGroupFlag;
var b2ParticleGroupDef = box2d.b2ParticleGroupDef;
var b2ParticleGroup = box2d.b2ParticleGroup;
var std_iter_swap = box2d.std_iter_swap;
var std_sort = box2d.std_sort;
var std_stable_sort = box2d.std_stable_sort;
var std_remove_if = box2d.std_remove_if;
var std_lower_bound = box2d.std_lower_bound;
var std_upper_bound = box2d.std_upper_bound;
var std_rotate = box2d.std_rotate;
var std_unique = box2d.std_unique;
var b2GrowableBuffer = box2d.b2GrowableBuffer;
var b2FixtureParticleQueryCallback = box2d.b2FixtureParticleQueryCallback;
var b2ParticleContact = box2d.b2ParticleContact;
var b2ParticleBodyContact = box2d.b2ParticleBodyContact;
var b2ParticlePair = box2d.b2ParticlePair;
var b2ParticleTriad = box2d.b2ParticleTriad;
var b2ParticleSystemDef = box2d.b2ParticleSystemDef;
var b2ParticleSystem = box2d.b2ParticleSystem;
var b2StackQueue = box2d.b2StackQueue;
var b2VoronoiDiagram = box2d.b2VoronoiDiagram;
var b2RopeDef = box2d.b2RopeDef;
var b2Rope = box2d.b2Rope;
var b2ControllerEdge = box2d.b2ControllerEdge;
var b2Controller = box2d.b2Controller;
var b2BuoyancyController = box2d.b2BuoyancyController;
var b2ConstantAccelController = box2d.b2ConstantAccelController;
var b2ConstantForceController = box2d.b2ConstantForceController;
var b2GravityController = box2d.b2GravityController;
var b2TensorDampingController = box2d.b2TensorDampingController;
// Math
var abs = Math.abs;
var acos = Math.acos;
var acosh = Math.acosh;
var asin = Math.asin;
var asinh = Math.asinh;
var atan = Math.atan;
var atanh = Math.atanh;
var atan2 = Math.atan2;
var ceil = Math.ceil;
var cbrt = Math.cbrt;
var expm1 = Math.expm1;
var clz32 = Math.clz32;
var cos = Math.cos;
var cosh = Math.cosh;
var exp = Math.exp;
var floor = Math.floor;
var fround = Math.fround;
var hypot = Math.hypot;
var imul = Math.imul;
var log = Math.log;
var log1p = Math.log1p;
var log2 = Math.log2;
var log10 = Math.log10;
var max = Math.max;
var min = Math.min;
var pow = Math.pow;
var random = Math.random;
var round = Math.round;
var sign = Math.sign;
var sin = Math.sin;
var sinh = Math.sinh;
var sqrt = Math.sqrt;
var tan = Math.tan;
var tanh = Math.tanh;
var trunc = Math.trunc;
var E = Math.E;
var LN10 = Math.LN10;
var LN2 = Math.LN2;
var LOG10E = Math.LOG10E;
var LOG2E = Math.LOG2E;
var PI = Math.PI;
var SQRT1_2 = Math.SQRT1_2;
var SQRT2 = Math.SQRT2;

function physicsSprite(){

}

function b2Loader (){
	this.loadedBodies    = [];			// to store box2d bodies created to use when 
	this.loadedJoints    = [];			// to store box2d joints created
	this.loadedParticles = [];			// to store box2d particles created
	this.loadedSprites   = [];			// to store sprites created
	this.world = null;
}

b2Loader.prototype.reset = function(){

	this.loadedBodies = [];	
	if (this.loadedBodies.length > 0){
		delete(this.loadedBodies);
	}
	this.loadedBodies = [];	

	if (this.loadedParticles.length > 0){
		delete(this.loadedParticles);
	}
	this.loadedParticles = [];
	
	if (this.loadedJoints.length > 0){
		delete(this.loadedJoints);
	}
	this.loadedJoints = [];
	
	this.world = null;
};

b2Loader.prototype.loadScene = function(scene, world){
	this.reset();
	this.world = world;
	this.world.CreateParticleSystem(new b2ParticleSystemDef());
	// load bodies
	for (var i = 0; i < scene.bodies.length; i++){
		this.createBody(scene.bodies[i], this.world);
	}
	// load joints
	for (var i = 0; i < scene.joints.length; i++){
		this.createJoint(scene.joints[i], this.world);
	}
	// load particles
	for (var i = 0; i < scene.particles.length; i++){
		this.createParticle(scene.particles[i], this.world);
	}
	
};

b2Loader.prototype.get = function(){
	return { 
		bodies : this.loadedBodies, 
		joints : this.loadedJoints, 
		particles : this.loadedParticles, 
		sprites   : this.loadedSprites,
		world : this.world 
	}
}
b2Loader.prototype.createBody = function(b, world){
	var pB = b;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = pB.type;
	
	bodyDef.position.x = pB.position[0] / 30;
	bodyDef.position.y = pB.position[1] / 30;
	
	var body = world.CreateBody(bodyDef);
	body.SetAngle(pB.rotation * Math.PI / 180);
	body.SetBullet(pB.isBullet);
	body.SetFixedRotation(pB.isFixedRotation);
	body.SetLinearDamping(pB.linearDamping);
	body.SetAngularDamping(pB.angularDamping);
	
	body.SetAngularVelocity(pB.angularVelocity * Math.PI / 180);
	body.SetLinearVelocity(new b2Vec2( pB.linearVelocity[0] / 30, pB.linearVelocity[1] / 30 ));
	body.SetAwake(pB.isAwake);
	body.SetActive(pB.isActive);
	body.SetUserData(pB.userData);
	body.SetGravityScale(pB.gravityScale);
	
	// var f = new box2d.b2Vec2(100, 100);
    // var p = new box2d.b2Vec2(1, 1)
	// console.log(body)
    // body.ApplyForce(f, p);
	//body.SetMassData(1);
	//body.SetType(1);
	
	this.loadedBodies.push(body);
	
	for (var i = 0; i < pB.fixtures.length; i++){

	
		var f = pB.fixtures[i];
		var fixture = new b2FixtureDef;
		fixture.density = f.density;
		fixture.restitution = f.restitution;
		fixture.friction = f.friction;
		fixture.isSensor = f.isSensor;
		fixture.filter.maskBits = f.maskBits;
		fixture.filter.categoryBits = f.categoryBits;
		fixture.filter.groupIndex = f.groupIndex;
		fixture.userData = f.userData;
		
		for (var j = 0; j < f.shapes.length; j++){
			var s = f.shapes[j];
			if (s.type == SHAPE_BOX){
				var shape = new b2PolygonShape;
				shape.SetAsBox(s.width / 60, s.height / 60);
				for(var k = 0; k < shape.m_vertices.length; k++){
					shape.m_vertices[k].x += s.position[0] / 30;
					shape.m_vertices[k].y += s.position[1] / 30;
				}
				fixture.shape = shape;
				body.CreateFixture(fixture);
			}
			else if (s.type == SHAPE_CIRCLE){
				var shape = new b2CircleShape(s.radius * 2 / 30);
					shape.m_p.x = s.position[0] / 30;
					shape.m_p.y = s.position[1] / 30;
				
				fixture.shape = shape;
				body.CreateFixture(fixture);
			}
			else if (s.type == SHAPE_POLYGON){
				var shape = new b2PolygonShape;
				var verts = [];
				for (var k = 0; k < s.vertices.length; k++){
					var vert = new b2Vec2(s.position[0] / 30 + s.vertices[k][0] / 30, s.position[1] / 30 + s.vertices[k][1] / 30);
					verts.push(vert); 
				}
				shape.Set(verts, verts.length);
				fixture.shape = shape;
				body.CreateFixture(fixture);
			}
			else if (s.type == SHAPE_CHAIN){
				var verts = [];
				for (var k = 0; k < s.vertices.length; k++){
					var vert = new b2Vec2(s.position[0] / 30 + s.vertices[k][0] / 30, s.position[1] / 30 + s.vertices[k][1] / 30);
					verts.push(vert); 
				}
				var chain = new box2d.b2ChainShape();
					chain.CreateChain(verts, verts.length);
				fixture.shape = chain;
				body.CreateFixture(fixture);
				}
				
			else if (s.type == SHAPE_EDGE){
				
				for(i=0;i<s.vertices.length-1;i++){
					var v1 = s.vertices[i+0];
					var v2 = s.vertices[i+1];
					/*var v0 = new box2d.b2Vec2(-0.1 ,0.0);
					var v3 = new box2d.b2Vec2(0.0, 1.0);*/
					var Vec1 = new b2Vec2( (v1[0] /30) + s.position[0] / 30, (v1[1] /30) + s.position[1] / 30 );
					var Vec2 = new b2Vec2( (v2[0] /30) + s.position[0] / 30, (v2[1]/ 30) + s.position[1] / 30 );
					
					var shape = new box2d.b2EdgeShape();
					shape.SetAsEdge(Vec1, Vec2);
					/*shape.m_vertex0.Copy( v0 );
					shape.m_vertex3.Copy( v3 );
					shape.m_hasVertex0 = true;
					shape.m_hasVertex3 = true;*/
					fixture.shape = shape;
					body.CreateFixture(fixture);
				}	
			}
		}
	}
};

b2Loader.prototype.createJoint = function(j, world){
	if (j.jointType == JOINT_DISTANCE){
		var jointDef = new b2DistanceJointDef;
		jointDef.bodyA = this.loadedBodies[j.bodyA];
		jointDef.bodyB = this.loadedBodies[j.bodyB];
		jointDef.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		jointDef.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		jointDef.collideConnected = j.collideConnected;
		jointDef.length = j.length / 30;
		jointDef.dampingRatio = j.dampingRatio;
		jointDef.frequencyHz = j.frequencyHZ;
		var distance = world.CreateJoint(jointDef)
		distance.SetUserData(j.userData);
		this.loadedJoints.push(distance);
	}
	else if (j.jointType == JOINT_WELD){
		var jointDef = new b2WeldJointDef;
		jointDef.bodyA = this.loadedBodies[j.bodyA];
		jointDef.bodyB = this.loadedBodies[j.bodyB];
		jointDef.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		jointDef.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		jointDef.collideConnected = j.collideConnected;
		jointDef.referenceAngle = j.referenceAngle * Math.PI / 180;
		var weld = world.CreateJoint(jointDef)
		weld.SetUserData(j.userData);
		this.loadedJoints.push(weld);
	}
	else if (j.jointType == JOINT_REVOLUTE){
		var jointDef = new b2RevoluteJointDef;
		jointDef.bodyA = this.loadedBodies[j.bodyA];
		jointDef.bodyB = this.loadedBodies[j.bodyB];
		jointDef.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		jointDef.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		jointDef.collideConnected = j.collideConnected;
		jointDef.enableLimit  = j.enableLimit;
		jointDef.enableMotor  = j.enableMotor;
		jointDef.lowerAngle   = j.lowerAngle * Math.PI / 180;
		jointDef.upperAngle   = j.upperAngle * Math.PI / 180;
		jointDef.maxMotorTorque = j.maxMotorTorque;
		jointDef.motorSpeed   = j.motorSpeed;
		jointDef.referenceAngle = j.referenceAngle * Math.PI / 180;
		var revolute = world.CreateJoint(jointDef)
		revolute.SetUserData(j.userData)
		this.loadedJoints.push(revolute);
	}
	else if (j.jointType == JOINT_PULLEY){
		var jointDef = new b2PulleyJointDef;
		jointDef.bodyA = this.loadedBodies[j.bodyA];
		jointDef.bodyB = this.loadedBodies[j.bodyB];
		jointDef.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		jointDef.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		jointDef.collideConnected = j.collideConnected;
		jointDef.groundAnchorA = new b2Vec2(j.groundAnchorA[0] / 30, j.groundAnchorA[1] / 30);
		jointDef.groundAnchorB = new b2Vec2(j.groundAnchorB[0] / 30, j.groundAnchorB[1] / 30);
		jointDef.lengthA = j.lengthA / 30;
		jointDef.lengthB = j.lengthB / 30;
		jointDef.maxLengthA = j.maxLengthA / 30;
		jointDef.maxLengthB = j.maxLengthB / 30;
		jointDef.ratio = j.ratio;
		var pully = world.CreateJoint(jointDef)
		pully.SetUserData(j.userData)
		this.loadedJoints.push(pully);
		}
	else if (j.jointType == JOINT_GEAR){
		var jointDef = new b2GearJointDef;
		jointDef.bodyA = this.loadedBodies[j.bodyA];
		jointDef.bodyB = this.loadedBodies[j.bodyB];
		jointDef.joint1 = this.loadedJoints[j.joint1];
		jointDef.joint2 = this.loadedJoints[j.joint2];
		jointDef.collideConnected = j.collideConnected;
		jointDef.ratio = j.ratio;
		var gear = world.CreateJoint(jointDef)
		gear.SetUserData(j.userData)
		this.loadedJoints.push(gear);
	}
	else if (j.jointType == JOINT_PRISMATIC){
		var jointDef = new b2PrismaticJointDef;
		jointDef.bodyA = this.loadedBodies[j.bodyA];
		jointDef.bodyB = this.loadedBodies[j.bodyB];
		jointDef.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		jointDef.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		jointDef.localAxisA = new b2Vec2(j.localAxisA[0], j.localAxisA[1]);
		jointDef.collideConnected = j.collideConnected;
		jointDef.enableLimit  = j.enableLimit;
		jointDef.enableMotor  = j.enableMotor;
		jointDef.lowerTranslation   = j.lowerTranslation / 30;
		jointDef.maxMotorForce = j.maxMotorForce;
		jointDef.motorSpeed   = j.motorSpeed;
		jointDef.referenceAngle = j.referenceAngle * Math.PI / 180;
		jointDef.upperTranslation   = j.upperTranslation / 30;
		var prismatic = world.CreateJoint(jointDef)
		prismatic.SetUserData(j.userData)
		this.loadedJoints.push(prismatic);
	}
	
	// not supported box2d-web BUT supported in box2d.min :)
	else if (j.jointType == JOINT_WHEEL){
		var axis = new b2Vec2(j.localAxisA[0], j.localAxisA[1]);
		var jd = new box2d.b2WheelJointDef();
		jd.Initialize(this.loadedBodies[j.bodyA], this.loadedBodies[j.bodyB], this.loadedBodies[j.bodyB].GetPosition(), axis);
		jd.collideConnected = j.collideConnected;
		jd.motorSpeed = j.motorSpeed;
		jd.maxMotorTorque = j.maxMotorTorque;
		jd.enableMotor = j.enableMotor;
		jd.frequencyHz = j.frequencyHZ;
		jd.dampingRatio = j.dampingRatio;
		jd.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		jd.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		jd.localAxisA = new b2Vec2(j.localAxisA[0], j.localAxisA[1]);
		var wheel = world.CreateJoint(jd)
		wheel.SetUserData(j.userData)
		this.loadedJoints.push(wheel);
	}
	
	// not supported box2d-web BUT supported in box2d.min :)
	else if (j.jointType == JOINT_ROPE){
		var ropeJointDef = new box2d.b2RopeJointDef();
		ropeJointDef.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		ropeJointDef.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		ropeJointDef.bodyA = this.loadedBodies[j.bodyA];
		ropeJointDef.bodyB = this.loadedBodies[j.bodyB];
		ropeJointDef.maxLength = j.maxLength / 30;
		ropeJointDef.collideConnected = j.collideConnected;
		var rope = world.CreateJoint(ropeJointDef);
		rope.SetUserData(j.userData)
		this.loadedJoints.push(rope);
	}
	else if (j.jointType == JOINT_FRICTION){
		
		var f = new b2FrictionJointDef();
		f.Initialize(this.loadedBodies[j.bodyA],this.loadedBodies[j.bodyB], this.loadedBodies[j.bodyB].GetPosition())
		f.maxForce = j.maxForce;
		f.maxTorque = j.maxTorque;
		f.collideConnected = j.collideConnected;
		f.localAnchorA = new b2Vec2(j.localAnchorA[0] / 30, j.localAnchorA[1] / 30);
		f.localAnchorB = new b2Vec2(j.localAnchorB[0] / 30, j.localAnchorB[1] / 30);
		var friction = world.CreateJoint(f);
		friction.SetUserData(j.userData)
		this.loadedJoints.push(friction);

	}
	else if (j.jointType == JOINT_MOTOR){
		
	var m = new b2MotorJointDef();
		m.Initialize(this.loadedBodies[j.bodyA],this.loadedBodies[j.bodyB]);
		m.maxForce = j.maxForce;
		m.maxTorque = j.maxTorque;
		m.collideConnected = j.collideConnected;
		m.linearOffset = new b2Vec2(j.linearOffset[0] / 30, j.linearOffset[1] / 30);
		m.angularOffset = j.angularOffset * Math.PI / 180;
		m.correctionFactor = j.correctionFactor;
		var motor = world.CreateJoint(m);
		motor.SetUserData(j.userData)
		this.loadedJoints.push(motor);
	}
	else if (j.jointType == JOINT_MOUSE){
	var md = new b2MouseJointDef();
		md.bodyA = world.CreateBody(new box2d.b2BodyDef());
		md.bodyB = this.loadedBodies[j.bodyB];
		md.target = new b2Vec2(j.target[0] / 30, j.target[1] / 30);
		md.collideConnected = j.collideConnected;
		md.maxForce = j.maxForce;
		md.dampingRatio = j.dampingRatio;
		md.frequencyHz = j.frequencyHZ;
		var mouse = world.CreateJoint(md);
		mouse.SetTarget(new b2Vec2(j.groundBody[0] / 30, j.groundBody[1] / 30));
		mouse.m_userData = j.userData;
		this.loadedJoints.push(mouse);
	}
	else if (j.jointType == Joint.JOINT_AREA){
		var aj = new box2d.b2AreaJointDef();
		aj.world = world;
		aj.dampingRatio = j.dampingRatio;
		aj.frequencyHz = j.frequencyHZ;
		aj.collideConnected = j.collideConnected;
		for( b = 0; b < j.bodies.length; b++ ){
			aj.AddBody(this.loadedBodies[j.bodies[b]]);
		}
		var	area = world.CreateJoint(aj);
		area.m_userData = j.userData;
		this.loadedJoints.push(area);
	}
};


b2Loader.prototype.createParticle = function(p, world){

	if(p.type == 0){ 
		var shape = new box2d.b2CircleShape( (p.shape.radius) / 30) 
	}
	else if(p.type == 1){ 
		var shape = new box2d.b2PolygonShape();
		shape.SetAsBox((p.shape.width) / 60, (p.shape.height) / 60);
	}
	else if(p.type == 2){ 
	
		var shape = new box2d.b2PolygonShape();
		var verts = [];
		var s = p.shape;
		for (var k = 0; k < s.vertices.length; k++){
			var vert = new b2Vec2(s.vertices[k][0] / 30, s.vertices[k][1] / 30);
			verts.push(vert); 
		}
		shape.Set(verts, verts.length);
	}
	
	// console.log(p)
	
	var pd = new box2d.b2ParticleGroupDef();
	pd.position  = new b2Vec2(p.position[0] / 30, p.position[1] / 30)
	pd.angle = p.rotation * Math.PI / 180;
	pd.color = p.color;
	pd.flags = p.flags;
	pd.groupFlags = box2d.b2ParticleGroupFlag.b2_solidParticleGroup;
	pd.shape = shape;
	pd.strength = p.strength;
	pd.stride = p.stride
	pd.linearVelocity = new b2Vec2(p.linearVelocity[0] / 30, p.linearVelocity[1] / 30);
	pd.angularVelocity = p.angularVelocity * Math.PI / 180;
	pd.lifetime = p.lifetime;
	world.GetParticleSystemList().SetRadius(p.radius)
	this.loadedParticles.push( world.GetParticleSystemList().CreateParticleGroup(pd) );
	
}

