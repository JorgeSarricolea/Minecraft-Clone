import { usePlane } from "@react-three/cannon";
import { useStore } from "../hooks/useStore.js";
import { configuredTextures } from "../images/textures.js";

/**
 * Ground component to create a textured plane acting as the ground.
 */
export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate the plane to be horizontal (x, y, z).
    position: [0, -0.5, 0],
  }));

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

  // Get the ground texture from the configured textures.
  const groundTexture = configuredTextures.groundTexture;
  groundTexture.repeat.set(10000, 10000);

  return (
    <mesh ref={ref} onClick={handleClickGround}>
      <planeGeometry attach="geometry" args={[10000, 10000]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}
