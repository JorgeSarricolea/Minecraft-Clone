import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore.js";
import { configuredTextures } from "../images/textures.js";
import { useState } from "react";

/**
 * Represents an individual Cube component.
 * Creates a static physics-enabled box and applies a texture to it.
 *
 * @param {string} id - The unique identifier for the cube.
 * @param {Array} position - The [x, y, z] coordinates for the cube's position.
 * @param {string} texture - The name of the texture to be applied to the cube.
 */
export const Cube = ({ id, position, texture }) => {
  // State to track if the cube is hovered over.
  const [isHovered, setIsHovered] = useState(false);

  // Get the removeCube function from the store.
  const [removeCube] = useStore((state) => [state.removeCube]);

  // Create a static box at the specified position.
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  // Get the active texture from the configured textures.
  const activeTexture = configuredTextures[texture + "Texture"];

  return (
    <mesh
      ref={ref}
      // Set hover state to true when the pointer is over the element.
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      // Set hover state to false when the pointer leaves the element.
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();

        // Check if the alt key is pressed and remove the cube if true.
        if (e.altKey) {
          console.log(e.altKey);
          removeCube(id);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
      />
    </mesh>
  );
};
