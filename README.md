# AB2E Scene Loader Web

A web-based viewer for AB2E exported physics scenes. Loads `.json`, `.scn`, or `.bin` scene files and provides interactive visualization with Box2D physics simulation.

## Features

- **Multi-format Support**: Loads AB2E exported scenes in JSON, SCN, and BIN formats
- **Interactive Physics**: Real-time Box2D physics simulation
- **Three Interaction Modes**:
  - **Pan Mode**: Camera navigation
  - **Touch Mode**: Apply forces to bodies
  - **Grab Mode**: Manipulate objects directly
- **Four Render Modes**:
  - **Classic**: Traditional physics debug view
  - **Wireframe**: Outline-only with normals
  - **Modern**: Clean view with bounding boxes
  - **Detailed**: Full debug visualization
- **Touch-Friendly**: Full mobile support with pinch-to-zoom and touch panning
- **Auto-Follow**: Automatic camera tracking

## Quick Start

1. **Load a Scene**: Click "Load" button and select an AB2E exported file (.json/.scn/.bin)
2. **Navigate**: 
   - **Desktop**: Drag to pan, scroll to zoom
   - **Mobile**: One finger to pan, two fingers to pinch-zoom
3. **Switch Modes**: Use buttons or keyboard shortcuts (1=Pan, 2=Touch, 3=Grab)
4. **Change Render**: Choose from Classic, Wireframe, Modern, or Detailed views

## Keyboard Shortcuts

| Key | Function |
|-----|----------|
| 1 | Switch to Pan Mode |
| 2 | Switch to Touch Mode |
| 3 | Switch to Grab Mode |
| F | Toggle Auto-follow |
| Z | Zoom In |
| X | Zoom Out |
| R | Reset View |
| H | Toggle Help Panel |
| C | Classic Render Mode |
| W | Wireframe Render Mode |
| M | Modern Render Mode |
| D | Detailed Render Mode |

## File Support

- **JSON**: Text-based scene format (recommended)
- **SCN**: Binary scene format
- **BIN**: Binary scene format
