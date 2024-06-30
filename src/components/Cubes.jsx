import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube.jsx";

/**
 * Represents a collection of Cube components.
 * Retrieves the list of cubes from the global state and renders them.
 */
export const Cubes = () => {
  // Destructure the cubes array from the global state using the custom hook.
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map(({ id, pos, texture }) => {
    return <Cube key={id} id={id} position={pos} texture={texture} />;
  });
};
