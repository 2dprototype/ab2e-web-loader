// Updated Draw class with improved JSON scene handling
function Navigator(){
    this.panning = [0, 0];
    this.origin = [0, 0];
    this.scale = 1;
    this.scaleLimits = [0.05, 16];
}

Navigator.prototype.screenPointToWorld = function(x, y){
    return [(x / this.scale - this.panning[0] + this.origin[0]), (y / this.scale - this.panning[1] + this.origin[1])];
};

Navigator.prototype.worldPointToScreen = function(x, y){
    return [(x + this.panning[0] - this.origin[0]) * this.scale, (y + this.panning[1] - this.origin[1]) * this.scale];
};

var mousePVec;
var isMouseDown = false;
var mouseJoint = null;
var selectedBody = null;
var isPanning = false;
var lastPanX = 0;
var lastPanY = 0;
var touchForce = 10; // Force applied in touch mode

function Draw(canvas, ctx, loadedScene, initialMode = 'grab'){
    this.keyPressed = null;
    this.loadedScene = loadedScene;
    this.scale = 30;
    this.clearColor = "#1a1a1a";
    this.canvas = canvas;
    this.ctx = ctx;
    this.navigator = new Navigator();
    this.currentMode = initialMode;
    
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.autoFollow = true;
    
    var ref = this;
    
    // Mobile touch events
    ref.canvas.ontouchmove = function(e){
        e.preventDefault();
        if (ref.currentMode === 'pan') {
            isPanning = true;
        } else {
            isMouseDown = true;
        }
        ref.handleMouseMove(e.touches[0].clientX - ref.canvas.offsetLeft, e.touches[0].clientY - ref.canvas.offsetTop);
    };
    
    ref.canvas.ontouchstart = function(e){
        e.preventDefault();
        ref.handleMouseMove(e.touches[0].clientX - ref.canvas.offsetLeft, e.touches[0].clientY - ref.canvas.offsetTop);
        
        if (ref.currentMode === 'pan') {
            isPanning = true;
            lastPanX = e.touches[0].clientX;
            lastPanY = e.touches[0].clientY;
        } else {
            isMouseDown = true;
        }
    };
    
    ref.canvas.ontouchend = function(e){
        e.preventDefault();
        isMouseDown = false;
        isPanning = false;
    };
    
    // Desktop mouse events
    ref.canvas.addEventListener('mousedown', (e) => {
        if (ref.currentMode === 'pan') {
            isPanning = true;
            lastPanX = e.clientX;
            lastPanY = e.clientY;
        } else {
            isMouseDown = true;
        }
        ref.handleMouseMove(e.offsetX, e.offsetY);
    }, true);

    ref.canvas.addEventListener('mousemove', (e) => {
        // Handle panning
        if (isPanning && ref.currentMode === 'pan') {
            const deltaX = e.clientX - lastPanX;
            const deltaY = e.clientY - lastPanY;
            
            ref.navigator.panning[0] += deltaX / ref.navigator.scale;
            ref.navigator.panning[1] += deltaY / ref.navigator.scale;
            
            lastPanX = e.clientX;
            lastPanY = e.clientY;
        }
        
        ref.handleMouseMove(e.offsetX, e.offsetY);
    }, true);

    ref.canvas.addEventListener('mouseup', () => {
        isMouseDown = false;
        isPanning = false;
    }, true);
    
    // Keyboard events
    ref.onkeydown();
    
    // Initial zoom to fit
    ref.zoom(this.width / 2, this.height / 2, 1);
    
    // // Reset auto-follow when spacebar is pressed
    // window.addEventListener('keydown', (e) => {
        // if (e.code === 'Space') {
            // ref.autoFollow = !ref.autoFollow;
        // }
    // });
}

Draw.prototype.updateMouse = function(world){
    if (!world) return;
    
    // Handle different modes
    switch(this.currentMode) {
        case 'pan':
            // Pan mode - camera movement is handled in event listeners
            break;
            
        case 'touch':
            // Touch mode - apply impulse to bodies
            if (isMouseDown) {
                var body = this.getBodyAtMouse(world);
                if (body && body.GetType() !== b2Body.b2_staticBody) {
                    // Apply an impulse in the direction of mouse movement
                    var impulse = new b2Vec2(0, 0);
                    
                    // Calculate direction based on mouse position relative to body
                    var bodyPos = body.GetPosition();
                    var dirX = this.mouseX - bodyPos.x;
                    var dirY = this.mouseY - bodyPos.y;
                    
                    // Normalize and scale
                    var length = Math.sqrt(dirX * dirX + dirY * dirY);
                    if (length > 0) {
                        dirX /= length;
                        dirY /= length;
                    }
                    
                    // Apply impulse away from mouse (push effect)
                    impulse.Set(-dirX * touchForce, -dirY * touchForce);
                    body.ApplyLinearImpulse(impulse, bodyPos, true);
                    
                    // Visual feedback
                    this.drawTouchEffect(bodyPos.x, bodyPos.y);
                }
            }
            break;
            
        case 'grab':
            // Grab mode - original behavior
            if(isMouseDown && (!mouseJoint)){
                var body = this.getBodyAtMouse(world);
                if(body) {
                    var md = new b2MouseJointDef();
                    md.bodyA = world.CreateBody(new box2d.b2BodyDef());
                    md.bodyB = body;
                    md.target = new b2Vec2(this.mouseX, this.mouseY);
                    md.collideConnected = true;
                    md.maxForce = 1000.0 * body.GetMass();
                    mouseJoint = world.CreateJoint(md);
                    body.SetAwake(true);
                }
            }
            
            if(mouseJoint){
                if(isMouseDown) {
                    mouseJoint.SetTarget(new b2Vec2(this.mouseX, this.mouseY));
                } else {
                    world.DestroyJoint(mouseJoint);
                    mouseJoint = null;
                }
            }
            break;
    }
};

Draw.prototype.drawTouchEffect = function(x, y) {
    // Draw a visual effect for touch mode
    this.ctx.save();
    
    var screenPos = this.navigator.worldPointToScreen(x, y);
    
    // Draw a circle at touch point
    this.ctx.beginPath();
    this.ctx.arc(screenPos[0], screenPos[1], 15, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(156, 39, 176, 0.3)';
    this.ctx.fill();
    
    // Draw outer ring
    this.ctx.beginPath();
    this.ctx.arc(screenPos[0], screenPos[1], 20, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(156, 39, 176, 0.6)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    this.ctx.restore();
};

Draw.prototype.getBodyAtMouse = function(world) {
    mousePVec = new b2Vec2(this.mouseX, this.mouseY);
    var aabb = new b2AABB();

    aabb.lowerBound = new b2Vec2(this.mouseX - 0.001, this.mouseY - 0.001);
    aabb.upperBound = new b2Vec2(this.mouseX + 0.001, this.mouseY + 0.001);

    selectedBody = null;
    world.QueryAABB(this.getBodyCB, aabb);
    return selectedBody;
};

Draw.prototype.getBodyCB = function(fixture) {
    if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
        if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
            selectedBody = fixture.GetBody();
            return false;
        }
    }
    return true;
};

Draw.prototype.handleMouseMove = function(x, y){ 
    this.mouseX = this.navigator.screenPointToWorld(x, y)[0] / this.scale;
    this.mouseY = this.navigator.screenPointToWorld(x, y)[1] / this.scale;
};

Draw.prototype.onkeydown = function(){
    window.addEventListener('keydown', (event) => {  
        this.keyPressed = event.key;

        // Only allow camera movement in pan mode with arrow keys
        if(this.currentMode === 'pan') {
            if(event.key == 'ArrowRight'){
                this.navigator.panning[0] -= 10;
            }
            else if(event.key == 'ArrowLeft'){
                this.navigator.panning[0] += 10;
            }
            else if(event.key == 'ArrowUp'){
                this.navigator.panning[1] += 10;
            }	
            else if(event.key == 'ArrowDown'){
                this.navigator.panning[1] -= 10;
            }
        }
        
        if(event.key == 'z'){
            this.zoom(this.canvas.width / 2, this.canvas.height / 2, 1.2);
        } 
        else if(event.key == 'x'){
            this.zoom(this.canvas.width / 2, this.canvas.height / 2, 0.8);
        }
        else if(event.key == 'f'){
            this.autoFollow = !this.autoFollow;
            console.log('Auto-follow:', this.autoFollow ? 'ON' : 'OFF');
        }
        // Mode switching with keyboard
        else if(event.key == '1'){
            this.currentMode = 'pan';
            console.log('Switched to Pan Mode');
        }
        else if(event.key == '2'){
            this.currentMode = 'touch';
            console.log('Switched to Touch Mode');
        }
        else if(event.key == '3'){
            this.currentMode = 'grab';
            console.log('Switched to Grab Mode');
        }
        else if(event.key == 'h' || event.key == 'H'){
            // Help panel toggle handled in main.js
        }
    });
};

Draw.prototype.clear = function(x, y, w, h){
    this.ctx.fillStyle = this.clearColor;
    this.ctx.clearRect(x, y, w, h);
    this.ctx.fillRect(x, y, w, h);
};

Draw.prototype.lookAt = function(body, x = 0, y = 0){
    if (!body) return;
    
    var pos = body.GetPosition();
    this.navigator.panning[0] = (-pos.x * this.scale) + x;
    this.navigator.panning[1] = (-pos.y * this.scale) + y;
};

Draw.prototype.zoom = function(mouseX, mouseY, zoom){
    var navigator = this.navigator;
    
    if (zoom > 1){
        if (navigator.scale > navigator.scaleLimits[1])
            return;
    }
    else{
        if (navigator.scale < navigator.scaleLimits[0]) 
            return;
    }
    
    this.ctx.translate(
        navigator.origin[0],
        navigator.origin[1]
    );
    
    this.ctx.scale(zoom, zoom);
    
    this.ctx.translate(
        -(mouseX / navigator.scale + navigator.origin[0] - mouseX / (navigator.scale * zoom)),
        -(mouseY / navigator.scale + navigator.origin[1] - mouseY / (navigator.scale * zoom))
    );
    
    navigator.origin[0] = (mouseX / navigator.scale + navigator.origin[0] - mouseX / (navigator.scale * zoom));
    navigator.origin[1] = (mouseY / navigator.scale + navigator.origin[1] - mouseY / (navigator.scale * zoom));
    navigator.scale *= zoom;
};

Draw.prototype.update = function(world){
    if (!world || !this.loadedScene) return;
    
    this.updateMouse(world);
    
    var navigator = this.navigator;
    
    // Auto-focus on first body if available and autoFollow is enabled
    if (this.autoFollow && this.loadedScene.bodies && this.loadedScene.bodies.length > 0) {
        this.lookAt(this.loadedScene.bodies[0], this.width/2, this.height/2);
    }
    
    // Clear with proper coordinates
    this.clear(0, 0, this.width, this.height);
    
    this.ctx.save();
    this.ctx.translate(navigator.panning[0], navigator.panning[1]);
    
    // Draw debug information with current render mode
    if (typeof debugDraw !== 'undefined') {
        new debugDraw(this.ctx, world, this.scale, navigator.scale, this.renderMode);
    }
    
    this.ctx.restore();
};

// Add render mode switching method
Draw.prototype.setRenderMode = function(mode) {
    if (!['classic', 'wireframe', 'modern', 'detailed'].includes(mode)) return;
    this.renderMode = mode;
    console.log('Render mode set to:', mode);
};
