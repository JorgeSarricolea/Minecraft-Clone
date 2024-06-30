import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard.js";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {
  // Get the keyboard state using the custom hook.
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 0.5, 0],
  }));

  const positionRef = useRef([0, 0, 0]);
  const velocityRef = useRef([0, 0, 0]);

  // Subscribe to position and velocity changes and update references.
  useEffect(() => {
    const unsubscribePosition = api.position.subscribe(
      (p) => (positionRef.current = p)
    );
    const unsubscribeVelocity = api.velocity.subscribe(
      (v) => (velocityRef.current = v)
    );
    return () => {
      unsubscribePosition();
      unsubscribeVelocity();
    };
  }, [api.position, api.velocity]);

  // Update the camera position and player's velocity on each frame.
  useFrame(() => {
    camera.position.copy(new Vector3(...positionRef.current));
    const direction = calculateDirection(
      moveBackward,
      moveForward,
      moveLeft,
      moveRight,
      camera
    );
    setVelocity(api, direction, velocityRef.current, jump);
  });

  return <mesh ref={ref} />;
};

/**
 * Calculates the movement direction based on keyboard inputs and the camera orientation.
 * @param {boolean} moveBackward - If the player is moving backward.
 * @param {boolean} moveForward - If the player is moving forward.
 * @param {boolean} moveLeft - If the player is moving left.
 * @param {boolean} moveRight - If the player is moving right.
 * @param {object} camera - The Three.js camera object.
 * @returns {object} - A normalized Vector3 representing the movement direction.
 */
function calculateDirection(
  moveBackward,
  moveForward,
  moveLeft,
  moveRight,
  camera
) {
  const frontVector = new Vector3(0, 0, moveBackward - moveForward);
  const sideVector = new Vector3(moveLeft - moveRight, 0, 0);
  return new Vector3()
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(CHARACTER_SPEED)
    .applyEuler(camera.rotation);
}

/**
 * Sets the player's velocity based on the calculated direction and jump state.
 * @param {object} api - The physics API to set velocity.
 * @param {object} direction - The calculated direction vector.
 * @param {Array} currentVelocity - The current velocity of the player.
 * @param {boolean} jump - If the player is jumping.
 */
function setVelocity(api, direction, currentVelocity, jump) {
  api.velocity.set(direction.x, currentVelocity[1], direction.z);
  if (jump && Math.abs(currentVelocity[1]) < 0.05) {
    api.velocity.set(
      currentVelocity[0],
      CHARACTER_JUMP_FORCE,
      currentVelocity[2]
    );
  }
}
