import { usePlane } from "@react-three/cannon";
import { configuredTextures } from "../images/textures.js";

/**
 * Ground component to create a textured plane acting as the ground.
 */
export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate the plane to be horizontal (x, y, z).
    position: [0, -0.5, 0],
  }));

  // Get the ground texture from the configured textures.
  const groundTexture = configuredTextures.groundTexture;
  groundTexture.repeat.set(10000, 10000);

  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[10000, 10000]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}
