import { useBox } from "@react-three/cannon";
import { configuredTextures } from "../images/textures.js";

/**
 * Represents an individual Cube component.
 * Creates a static physics-enabled box and applies a texture to it.
 *
 * @param {Array} position - The [x, y, z] coordinates for the cube's position.
 * @param {string} texture - The name of the texture to be applied to the cube.
 */
export const Cube = ({ position, texture }) => {
  // Create a static box at the specified position.
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  // Get the active texture from the configured textures.
  const activeTexture = configuredTextures[texture + "Texture"];

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={activeTexture} />
    </mesh>
  );
};
