var debugDraw = function(context, world, scale, SCALE, mode='classic') {

	this.Alpha = 0.5;
	this.lineWidth = 1.5/SCALE;
	
	// Mode-specific configurations
	this.mode = mode;
	this.modeConfigs = {
		'classic': {
			fillAlpha: 0.5,
			strokeAlpha: 0.8,
			showBodyCenters: false,
			showFixtures: true,
			showJoints: true,
			showParticles: true,
			showShapeOutlines: true,
			showNormals: false,
			showAABBs: false,
			showContactPoints: false
		},
		'wireframe': {
			fillAlpha: 0.0,
			strokeAlpha: 0.8,
			showBodyCenters: true,
			showFixtures: true,
			showJoints: true,
			showParticles: true,
			showShapeOutlines: true,
			showNormals: true,
			showAABBs: false,
			showContactPoints: false
		},
		'modern': {
			fillAlpha: 0.3,
			strokeAlpha: 1.0,
			showBodyCenters: true,
			showFixtures: true,
			showJoints: true,
			showParticles: true,
			showShapeOutlines: true,
			showNormals: false,
			showAABBs: true,
			showContactPoints: false
		},
		'detailed': {
			fillAlpha: 0.4,
			strokeAlpha: 1.0,
			showBodyCenters: true,
			showFixtures: true,
			showJoints: true,
			showParticles: true,
			showShapeOutlines: true,
			showNormals: true,
			showAABBs: true,
			showContactPoints: true
		}
	};
	
	this.config = this.modeConfigs[this.mode] || this.modeConfigs['classic'];
	
	this.colors = {
		bodyStatic      : 'rgba(127, 229, 127, '+this.config.fillAlpha+')',
		bodyDynamic     : 'rgba(229, 178, 178, '+this.config.fillAlpha+')',
		bodyKinematic   : 'rgba(127, 127, 229, '+this.config.fillAlpha+')',
		notActive       : 'rgba(166, 160, 61,  '+this.config.fillAlpha+')',
		notAwake        : 'rgba(153, 153, 153, '+this.config.fillAlpha+')',
		jointColor      : 'rgba(135, 206, 235, '+this.config.strokeAlpha+')',
		mouseJointColor : 'rgba(255, 255, 255, '+this.config.strokeAlpha+')',
		centerColor     : 'rgba(255, 255, 0, 0.8)',
		normalColor     : 'rgba(255, 0, 0, 0.6)',
		aabbColor       : 'rgba(0, 255, 255, 0.3)',
		contactColor    : 'rgba(255, 0, 255, 0.8)',
		velocityColor   : 'rgba(0, 255, 0, 0.7)'
	}

	// Draw AABBs if enabled
	if (this.config.showAABBs) {
		this.drawAABBs(context, world, scale);
	}

	// Draw body shapes
	for(var b = world.m_bodyList; b; b=b.m_next) {
		for(var f = b.GetFixtureList(); f!==null; f=f.GetNext()) {
			context.lineWidth = this.lineWidth;
			if(b.m_userData != "hide") { 
				drawShape(context, scale, world, b, f, this.colors, this.config);
				
				// Draw body center if enabled
				if (this.config.showBodyCenters) {
					this.drawBodyCenter(context, scale, b, this.colors);
				}
				
				// Draw normals for edge shapes if enabled
				if (this.config.showNormals && f.m_shape.m_type === box2d.b2ShapeType.e_edgeShape) {
					this.drawEdgeNormal(context, scale, b, f);
				}
				
				// Draw velocity vector if in detailed mode
				if (this.mode === 'detailed' && b.GetType() === 2) { // Dynamic body
					this.drawVelocity(context, scale, b, this.colors);
				}
			}
		}
	}
	
	// Draw contact points if enabled
	if (this.config.showContactPoints) {
		this.drawContactPoints(context, world, scale);
	}
	
	// Draw joints
	for(var j = world.m_jointList; j; j=j.m_next) {
		context.lineWidth = this.lineWidth;
		if(j.m_userData != "hide") { drawJoint(context, scale, world, j, this.colors, this.config) }
	}
	
	// Draw Particles
	if(world.GetParticleSystemList() !== null && this.config.showParticles) { 
		drawParticle(world, context, scale, this.colors, this.config) 
	}
};

debugDraw.prototype.drawAABBs = function(context, world, scale) {
	context.save();
	context.scale(scale, scale);
	context.lineWidth = 0.5/scale;
	context.strokeStyle = this.colors.aabbColor;
	context.fillStyle = this.colors.aabbColor;
	
	for(var b = world.m_bodyList; b; b=b.m_next) {
		if(b.m_userData != "hide") {
			for(var f = b.GetFixtureList(); f!==null; f=f.GetNext()) {
				var aabb = f.GetAABB(0);
				context.beginPath();
				context.rect(aabb.lowerBound.x, aabb.lowerBound.y, 
						   aabb.upperBound.x - aabb.lowerBound.x, 
						   aabb.upperBound.y - aabb.lowerBound.y);
				context.stroke();
			}
		}
	}
	
	context.restore();
};

debugDraw.prototype.drawBodyCenter = function(context, scale, body, colors) {
	context.save();
	context.scale(scale, scale);
	context.lineWidth = 1/scale;
	context.strokeStyle = colors.centerColor;
	context.fillStyle = colors.centerColor;
	
	var pos = body.GetPosition();
	var radius = 2/scale;
	
	context.beginPath();
	context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
	context.fill();
	
	// Draw cross for better visibility
	context.beginPath();
	context.moveTo(pos.x - radius*2, pos.y);
	context.lineTo(pos.x + radius*2, pos.y);
	context.moveTo(pos.x, pos.y - radius*2);
	context.lineTo(pos.x, pos.y + radius*2);
	context.stroke();
	
	context.restore();
};

debugDraw.prototype.drawEdgeNormal = function(context, scale, body, fixture) {
	context.save();
	context.scale(scale, scale);
	context.lineWidth = 1/scale;
	context.strokeStyle = this.colors.normalColor;
	
	var shape = fixture.m_shape;
	var transform = body.GetTransform();
	
	if (shape.m_vertex1 && shape.m_vertex2) {
		var v1 = box2d.b2Mul(transform, shape.m_vertex1);
		var v2 = box2d.b2Mul(transform, shape.m_vertex2);
		
		// Calculate edge center
		var centerX = (v1.x + v2.x) / 2;
		var centerY = (v1.y + v2.y) / 2;
		
		// Calculate edge vector and normal
		var edgeX = v2.x - v1.x;
		var edgeY = v2.y - v1.y;
		var length = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
		
		if (length > 0) {
			// Normal (perpendicular) vector
			var normalX = -edgeY / length;
			var normalY = edgeX / length;
			
			// Draw normal
			var normalLength = 10/scale;
			context.beginPath();
			context.moveTo(centerX, centerY);
			context.lineTo(centerX + normalX * normalLength, centerY + normalY * normalLength);
			context.stroke();
		}
	}
	
	context.restore();
};

debugDraw.prototype.drawVelocity = function(context, scale, body, colors) {
	context.save();
	context.scale(scale, scale);
	context.lineWidth = 1.5/scale;
	context.strokeStyle = colors.velocityColor;
	
	var pos = body.GetPosition();
	var vel = body.GetLinearVelocity();
	var speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
	
	if (speed > 0.1) { // Only draw if moving significantly
		var velLength = Math.min(speed * 0.5, 50/scale); // Scale velocity for visualization
		var normalizedX = vel.x / speed;
		var normalizedY = vel.y / speed;
		
		context.beginPath();
		context.moveTo(pos.x, pos.y);
		context.lineTo(pos.x + normalizedX * velLength, pos.y + normalizedY * velLength);
		
		// Draw arrow head
		var arrowSize = 3/scale;
		var angle = Math.atan2(normalizedY, normalizedX);
		context.moveTo(pos.x + normalizedX * velLength, pos.y + normalizedY * velLength);
		context.lineTo(
			pos.x + normalizedX * velLength - arrowSize * Math.cos(angle - Math.PI/6),
			pos.y + normalizedY * velLength - arrowSize * Math.sin(angle - Math.PI/6)
		);
		context.moveTo(pos.x + normalizedX * velLength, pos.y + normalizedY * velLength);
		context.lineTo(
			pos.x + normalizedX * velLength - arrowSize * Math.cos(angle + Math.PI/6),
			pos.y + normalizedY * velLength - arrowSize * Math.sin(angle + Math.PI/6)
		);
		
		context.stroke();
	}
	
	context.restore();
};

debugDraw.prototype.drawContactPoints = function(context, world, scale) {
	context.save();
	context.scale(scale, scale);
	context.lineWidth = 1/scale;
	context.strokeStyle = this.colors.contactColor;
	context.fillStyle = this.colors.contactColor;
	
	// Note: This is a simplified implementation.
	// In a real Box2D integration, you would iterate through contact manifolds
	// For demonstration, we'll draw where bodies are very close
	
	for(var b1 = world.m_bodyList; b1; b1=b1.m_next) {
		for(var b2 = b1.m_next; b2; b2=b2.m_next) {
			if(b1.m_userData != "hide" && b2.m_userData != "hide") {
				var pos1 = b1.GetPosition();
				var pos2 = b2.GetPosition();
				var dx = pos1.x - pos2.x;
				var dy = pos1.y - pos2.y;
				var distance = Math.sqrt(dx*dx + dy*dy);
				
				// Simplified: draw if bodies are very close
				if (distance < 0.5) {
					var contactX = (pos1.x + pos2.x) / 2;
					var contactY = (pos1.y + pos2.y) / 2;
					
					context.beginPath();
					context.arc(contactX, contactY, 2/scale, 0, 2 * Math.PI);
					context.fill();
				}
			}
		}
	}
	
	context.restore();
};

var drawJoint = function(context, scale, world, joint, colors, config) {
	if (!config.showJoints) return;
	
	context.save();
	context.scale(scale, scale);
	context.lineWidth /= scale;
	context.strokeStyle = colors.jointColor;
	
	var b1 = joint.m_bodyA;
	var b2 = joint.m_bodyB;
	var x1 = b1.GetPosition();
	var x2 = b2.GetPosition();
	
	context.beginPath();
	
	if(joint.m_type == 4){ // pulley
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		var s1 = joint.GetGroundAnchorA(x1);
		var s2 = joint.GetGroundAnchorB(x2);

		context.moveTo(p1.x, p1.y);
		context.lineTo(s1.x, s1.y);
		context.lineTo(s2.x, s2.y);
		context.lineTo(p2.x, p2.y);
	}
	else if(joint.m_type == 1){ // revolute
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(x2.x, x2.y);
		context.lineTo(p2.x, p2.y);
	}
	else if(joint.m_type == 3){ // distance
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
	}
	else if(joint.m_type == 2){ // prismatic
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(x2.x, x2.y);
	}
	else if(joint.m_type == 8){ // weld
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(x2.x, x2.y);
	}
	else if(joint.m_type == 6){ // gear
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(x2.x, x2.y);
	}
	else if(joint.m_type == 7){ // wheel
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(x2.x, x2.y);
	}
	else if(joint.m_type == 10){ // rope
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(x2.x, x2.y);
		
		if (config.mode === 'detailed') {
			// Draw max length circle in detailed mode
			context.save();
			context.beginPath();
			context.arc(p1.x, p1.y, joint.GetMaxLength(), 0, 2 * Math.PI, false);
			context.closePath();
			context.fillStyle = "rgba(0, 255, 0, 0.1)";
			context.strokeStyle = "rgba(0, 255, 0, 0.3)";
			context.fill();
			context.stroke();
			context.restore();
		}
	}
	else if(joint.m_type == 9){ // friction
		var p1 = joint.GetAnchorA(b1);
		var p2 = joint.GetAnchorB(b2);
		context.moveTo(x1.x, x1.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(x2.x, x2.y);
	}
	else if(joint.m_type == 11){ // motor
		context.moveTo(x1.x, x1.y);
		context.lineTo(x2.x, x2.y);
	}
	else if(joint.m_type == 5){ // mouse
		let aA = joint.GetAnchorA(x1);
		let aB = joint.GetAnchorB(x2);
		
		context.globalAlpha = 0.8;
		context.strokeStyle = colors.mouseJointColor;
		context.moveTo(aA.x, aA.y);
		context.lineTo(aB.x, aB.y);
	}
	
	context.stroke();
	context.restore();
};

var drawShape = function(context, scale, world, body, fixture, colors, config) {
	if (!config.showFixtures) return;
	
	context.save();
	context.scale(scale,scale);
	
	context.globalAlpha = config.mode === 'wireframe' ? 1.0 : this.Alpha;

	if(body.IsActive() == true && body.IsAwake() == true){
		if(body.GetType() == 0){
			context.fillStyle = colors.bodyStatic;
			context.strokeStyle = colors.bodyStatic;
		}
		else if(body.GetType() == 1){
			context.fillStyle = colors.bodyKinematic;
			context.strokeStyle = colors.bodyKinematic;
		}
		else if(body.GetType() == 2){
			context.fillStyle = colors.bodyDynamic;
			context.strokeStyle = colors.bodyDynamic;
		}
	}else if(body.IsActive() == false){
		context.fillStyle = colors.notActive;
		context.strokeStyle = colors.notActive;
	}else if(body.IsAwake() == false && body.GetType() != 1 && body.GetType() != 0){
		context.fillStyle = colors.notAwake;
		context.strokeStyle = colors.notAwake;
	}else{
		if(body.GetType() == 0){
			context.fillStyle = colors.bodyStatic;
			context.strokeStyle = colors.bodyStatic;
		}else if(body.GetType() == 1){
			context.fillStyle = colors.bodyKinematic;
			context.strokeStyle = colors.bodyKinematic;
		}
	}
	
	var bPos = body.GetPosition();
	context.translate(bPos.x, bPos.y);
	context.rotate(body.GetAngle());
	
	context.beginPath();
	context.lineWidth /= scale;
	
	var shape = fixture.m_shape;
	switch(shape.m_type) {
		case box2d.b2ShapeType.e_circleShape: {
			var r = shape.m_radius;
			context.translate(shape.m_p.x, shape.m_p.y);
			context.arc(0, 0, r, 0, 2 * Math.PI, false);
			
			if (config.mode !== 'wireframe') {
				context.fill();
			}
			
			// Draw center marker for wireframe and detailed modes
			if (config.mode === 'wireframe' || config.mode === 'detailed') {
				context.moveTo(0, 0);
				context.lineTo(r, 0);
			}
		} break;
		
		case box2d.b2ShapeType.e_polygonShape:{
			var vertices = shape.m_vertices;
			var vertexCount = shape.m_count;
			if (!vertexCount) return;
			
			context.moveTo(vertices[0].x, vertices[0].y);
			for (var i = 0; i < vertexCount; i++)
				context.lineTo(vertices[i].x, vertices[i].y);
			
			if (config.mode !== 'wireframe') {
				context.fill();
			}
		} break;
		
		case box2d.b2ShapeType.e_chainShape: {
			var vertices = shape.m_vertices;
			var vertexCount = shape.m_count;
			if (!vertexCount) return;
			
			context.moveTo(vertices[0].x, vertices[0].y);
			for (var i = 0; i < vertexCount; i++)
				context.lineTo(vertices[i].x, vertices[i].y);
		} break;
		
		case box2d.b2ShapeType.e_edgeShape: {
			if(shape.m_hasVertex0){ 
				context.lineTo(shape.m_vertex0.x, shape.m_vertex0.y);
				context.moveTo(shape.m_vertex1.x, shape.m_vertex1.y);
			}
			
			context.lineTo(shape.m_vertex1.x, shape.m_vertex1.y);
			context.lineTo(shape.m_vertex2.x, shape.m_vertex2.y);
			
			if(shape.m_hasVertex3){ 
				context.lineTo(shape.m_vertex3.x, shape.m_vertex3.y);
			}
		} break;
	}
	
	if (config.showShapeOutlines || config.mode === 'wireframe') {
		context.closePath();
		context.stroke();
	}
	
	context.restore();
};

var drawParticle = function(world, context, scale, colors, config) {
	if (!config.showParticles) return;
	
	var system = world.GetParticleSystemList();
	var particles = system.GetPositionBuffer();
	
	for (var i=0;i<system.GetParticleCount(); i++){
		var b2color = system.GetColorBuffer()[i];
		
		const newRadius = (system.m_particleDiameter/2) * scale;
		const x = particles[i].x*scale;
		const y = particles[i].y*scale;
		
		context.save();
		context.beginPath();
		context.lineWidth /= scale;
		context.arc(x, y, newRadius, 0, 2*Math.PI);
		
		if(b2color !== undefined){
			var color = 'rgba(' + b2color.r + ',' + b2color.g + ',' + b2color.b + ',' + 
					   (config.mode === 'wireframe' ? 0.3 : (b2color.a / 255.0)) + ')';
			context.fillStyle = color;
			context.strokeStyle= color;
		}
		else{
			console.error("DebugDraw() : null color at draw particles");
		}
		
		if (config.mode !== 'wireframe') {
			context.fill();
		}
		context.stroke();
		context.closePath();
		context.restore();
	}
};