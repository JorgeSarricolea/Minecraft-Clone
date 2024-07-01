import { useState, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore"; // Asegúrate de que la ruta sea correcta
import { configuredTextures } from "../images/textures"; // Asegúrate de que la ruta sea correcta

/**
 * Represents an individual Cube component.
 * Creates a static physics-enabled box and applies a texture to it.
 *
 * @param {Array} position - The [x, y, z] coordinates for the cube's position.
 * @param {string} texture - The name of the texture to be applied to the cube.
 */
export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);
  const textureImage = configuredTextures[texture + "Texture"];
  const [ref, api] = useBox(
    () => ({
      mass: 1,
      type: "Static",
      position,
      onCollide: (e) => console.log("Collision detected", e),
    }),
    [position]
  );

  /**
   * Handles click events on the cube to either remove it or add an adjacent cube.
   * If the alt key is held, the cube is removed.
   * Otherwise, a new cube is added adjacent to the clicked face.
   *
   * @param {Object} event - The click event object.
   */
  const handleClick = (event) => {
    event.stopPropagation();
    const { altKey } = event;
    const { x, y, z } = ref.current.position;

    if (altKey) {
      removeCube(x, y, z);
    } else {
      // Assuming want to add adjacent cubes based on the clicked face:
      const faceIndex = Math.floor(event.faceIndex / 2);
      switch (faceIndex) {
        case 0:
          addCube(x + 1, y, z);
          break; // Front
        case 1:
          addCube(x - 1, y, z);
          break; // Back
        case 2:
          addCube(x, y + 1, z);
          break; // Top
        case 3:
          addCube(x, y - 1, z);
          break; // Bottom
        case 4:
          addCube(x, y, z + 1);
          break; // Right
        case 5:
          addCube(x, y, z - 1);
          break; // Left
      }
    }
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      castShadow // Allows the object to cast shadows
      receiveShadow // Allows the object to receive shadows
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        color={isHovered ? "lightgrey" : "white"}
        map={textureImage}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        metalness={0.5} // Metal effect if needed
        roughness={0.5} // Controls the roughness of the material
      />
    </mesh>
  );
};
