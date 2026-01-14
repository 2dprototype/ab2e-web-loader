// Global variables
var canvas, ctx, world, loader, draw, currentScene = null;
var sceneInterval, fpsInterval;
var availableScenes = [];
var currentMode = 'grab'; // 'pan', 'touch', 'grab'

// Initialize the application
function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas to fill container
    resizeCanvas();
    
    // Create Box2D world
    world = createWorld();
    
    // Initialize loader
    loader = new b2Loader();
    
    // Setup UI event listeners
    setupUI();
    
    // Start render loop
    requestAnimationFrame(update);
}

// Resize canvas to fit container
function resizeCanvas() {
    const container = document.getElementById('canvasContainer');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    if (draw) {
        draw.width = canvas.width;
        draw.height = canvas.height;
    }
}

// Set interaction mode
function setMode(mode) {
    if (!['pan', 'touch', 'grab'].includes(mode)) return;
    
    currentMode = mode;
    
    // Update UI
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`mode${mode.charAt(0).toUpperCase() + mode.slice(1)}Btn`).classList.add('active');
    
    // Update draw instance if exists
    if (draw) {
        draw.currentMode = mode;
    }
    
    console.log(`Switched to ${mode} mode`);
}

// Setup UI event listeners
function setupUI() {
    // Load scene button
    document.getElementById('loadSceneBtn').addEventListener('click', openFilePicker);
    
    // Reload scene button
    document.getElementById('reloadSceneBtn').addEventListener('click', reloadScene);
    
    // Reset view button
    document.getElementById('resetViewBtn').addEventListener('click', resetView);
    
    // Mode buttons
    document.getElementById('modePanBtn').addEventListener('click', () => setMode('pan'));
    document.getElementById('modeTouchBtn').addEventListener('click', () => setMode('touch'));
    document.getElementById('modeGrabBtn').addEventListener('click', () => setMode('grab'));
	
    // Render mode buttons
    document.getElementById('renderClassicBtn').addEventListener('click', () => setRenderMode('classic'));
    document.getElementById('renderWireframeBtn').addEventListener('click', () => setRenderMode('wireframe'));
    document.getElementById('renderModernBtn').addEventListener('click', () => setRenderMode('modern'));
    document.getElementById('renderDetailedBtn').addEventListener('click', () => setRenderMode('detailed'));
    
    // Help panel toggle
    document.addEventListener('keydown', (e) => {
        if (e.key === 'h' || e.key === 'H') {
            const helpPanel = document.getElementById('helpPanel');
            helpPanel.classList.toggle('active');
        }
        // Mode shortcuts
        if (e.key === '1') setMode('pan');
        if (e.key === '2') setMode('touch');
        if (e.key === '3') setMode('grab');
        if (e.key === 'r' || e.key === 'R') resetView();
        // Render mode shortcuts
        if (e.key === 'c' || e.key === 'C') setRenderMode('classic');
        if (e.key === 'w' || e.key === 'W') setRenderMode('wireframe');
        if (e.key === 'm' || e.key === 'M') setRenderMode('modern');
        if (e.key === 'd' || e.key === 'D') setRenderMode('detailed');
    });
    
    // Window resize
    window.addEventListener('resize', resizeCanvas);
}


function setRenderMode(mode) {
    if (!['classic', 'wireframe', 'modern', 'detailed'].includes(mode)) return;
    
    // Update UI
    document.querySelectorAll('.render-mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById('render' + mode.charAt(0).toUpperCase() + mode.slice(1) + 'Btn').classList.add('active');
    
    // Update draw instance if exists
    if (draw) {
        draw.setRenderMode(mode);
    }
    
    console.log(`Render mode set to: ${mode}`);
}

// Open file picker for custom JSON
function openFilePicker() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,.scn,.bin';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const ext = file.name.split('.').pop().toLowerCase();

        // JSON → old behavior
        if (ext === 'json') {
            loadSceneFromFileObject(file);
            return;
        }

        // SCN / BIN → binary decode
        if (ext === 'scn' || ext === 'bin') {
            const reader = new FileReader();
            reader.onload = () => {
                const buffer = reader.result; // ArrayBuffer
                var sceneData = decodeScene(buffer);
				loadScene(sceneData, "", null);
            };
            reader.readAsArrayBuffer(file);
        }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}


// Load scene from File object
function loadSceneFromFileObject(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const sceneData = JSON.parse(e.target.result);
            const sceneName = file.name.replace('.json', '');
            loadScene(sceneData, sceneName, file.name);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            alert(`Failed to parse JSON file: ${error.message}`);
        }
    };
    
    reader.onerror = function() {
        alert('Failed to read file');
    };
    
    reader.readAsText(file);
}

// Load scene from a file path
function loadSceneFromFile(filePath, sceneName) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.json();
        })
        .then(sceneData => {
            loadScene(sceneData, sceneName, filePath);
        })
        .catch(error => {
            console.error('Error loading scene:', error);
            alert(`Failed to load scene: ${filePath}\n${error.message}`);
        });
}

// Main scene loading function
function loadScene(sceneData, sceneName, filePath = null) {
    // Clear existing interval
    if (sceneInterval) {
        clearInterval(sceneInterval);
    }
    
    // Clear world
    if (world) {
        // Destroy all bodies
        let body = world.GetBodyList();
        while (body) {
            world.DestroyBody(body);
            body = body.GetNext();
        }
    }
    
    // Update UI
    document.getElementById('reloadSceneBtn').disabled = false;
    
    try {
        // Parse and load scene
        currentScene = {
            data: sceneData,
            name: sceneName,
            filePath: filePath
        };
        
        loader.loadScene(sceneData, world);
        
        // Initialize draw if not already
        if (!draw) {
            draw = new Draw(canvas, ctx, loader.get(), currentMode);
        } else {
            draw.loadedScene = loader.get();
            draw.currentMode = currentMode;
        }
        
        // Start physics loop
        sceneInterval = setInterval(() => {
            if (world && draw) {
                world.Step(1.0 / 60, 10, 10);
            }
        }, 1000 / 60);
        
        console.log(`Scene "${sceneName}" loaded successfully`);
    } catch (error) {
        console.error('Error loading scene data:', error);
        alert(`Failed to load scene data: ${error.message}`);
    }
}

// Reload current scene
function reloadScene() {
    if (currentScene && currentScene.filePath) {
        loadSceneFromFile(currentScene.filePath, currentScene.name);
    } else if (currentScene && currentScene.data) {
        // If we have the data but no file path (e.g., custom loaded file)
        loadScene(currentScene.data, currentScene.name);
    }
}

// Reset camera view
function resetView() {
    if (draw && draw.loadedScene && draw.loadedScene.bodies.length > 0) {
        draw.lookAt(draw.loadedScene.bodies[0], canvas.width/2, canvas.height/2);
    }
}

// Main update loop
var lastTime = 0;
var frameCount = 0;
var fps = 60;

function update(currentTime) {
    if (!lastTime) lastTime = currentTime;
    
    // Calculate FPS
    frameCount++;
    if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        // document.getElementById('status').textContent = `FPS: ${fps}`;
    }
    
    // Update draw if exists
    if (draw && world) {
        draw.update(world);
    }
    
    requestAnimationFrame(update);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);