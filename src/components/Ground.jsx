import { usePlane } from "@react-three/cannon";
import { useStore } from "../hooks/useStore.js";
import { configuredTextures } from "../images/textures.js";
import { useMemo } from "react";
import { RepeatWrapping } from "three";

/**
 * Ground component to create a textured plane acting as the ground.
 */
export function Ground() {
  // Create a static plane to act as the ground.
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate the plane to be horizontal (x, y, z).
    position: [0, -0.5, 0],
  }));

  // Zustand store state for adding a cube.
  const [addCube] = useStore((state) => [state.addCube]);

  /**
   * Handles click events on the ground plane to add a new cube.
   * Calculates the position where the user clicked and adds a cube at that location.
   *
   * @param {Object} event - The click event object.
   */
  const handleClickGround = (event) => {
    event.stopPropagation();
    const [x, y, z] = Object.values(event.point).map((n) => Math.ceil(n));

    addCube(x, y, z);
  };

  // Use useMemo to memoize the texture configuration.
  const groundTexture = useMemo(() => {
    const texture = configuredTextures.grassTexture.clone();
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(10000, 10000); // Set texture repetition for large ground coverage.
    return texture;
  }, []);

  return (
    <mesh ref={ref} onClick={handleClickGround}>
      <planeGeometry attach="geometry" args={[10000, 10000]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}
