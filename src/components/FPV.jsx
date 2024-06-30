import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

/**
 * FPV component to enable first-person view controls.
 */
export function FPV() {
  const { gl, camera } = useThree();

  return (
    <PointerLockControls args={[camera, gl.domElement]} movementSpeed={10} />
  );
}
