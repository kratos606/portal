# Portal

**Portal** is a web-based 3D portal application built using Three.js and Cannon.js, allowing users to experience physics-driven teleportation mechanics and 3D navigation through various environments. This project integrates physics simulations with real-time 3D rendering and user-controlled teleportation across different spaces.

## Features

- **First-Person Controls:** Explore the 3D environment with intuitive first-person controls.
- **Teleportation Mechanics:** Navigate through the portal system and teleport seamlessly to different locations.
- **Physics Integration:** Realistic physics interactions using Cannon.js to simulate object movement, velocity, and teleportation effects.
- **3D Model Loading:** Load and display 3D models using Three.js's GLTFLoader.
  
## Technologies Used

- **Three.js:** A JavaScript library that makes WebGL easier to use for rendering 3D graphics.
- **Cannon.js:** A lightweight 3D physics engine to simulate physics in the 3D environment.
- **GLTFLoader:** For loading 3D models in GLTF format.
  
## Getting Started

### Prerequisites

To run this project locally, ensure you have the following:

- Node.js (latest version recommended)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kratos606/portal.git
    cd portal
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and go to `http://localhost:5173/` to view the portal application.

### Usage

- Use the keyboard and mouse to control your character’s movement through the 3D space.
- Teleport by interacting with portals scattered throughout the environment.
- Observe realistic physics behavior as objects move and interact within the scene.

### Controls

- **W/A/S/D or Arrow Keys:** Move around in the environment.
- **Mouse:** Look around.
- **Space:** Jump.
- **Enter portal:** Teleport to another location.
- **E:** To Pick up cube and drop it

### Customization

You can easily customize the project by adding your own 3D models, textures, and environments. Simply place the models in the `src/assets` folder and reference them in the scene files.

### Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue if you find any bugs or have feature requests.

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Let me know if you need further customization for the project!
