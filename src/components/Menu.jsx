import { useStore } from "../hooks/useStore.js";

/**
 * Menu component providing buttons to save and reset the world state.
 */
export const Menu = () => {
  const saveWorld = useStore((state) => state.saveWorld);
  const resetWorld = useStore((state) => state.resetWorld);

  return (
    <div className="menu">
      <button onClick={() => saveWorld()}>Save</button>
      <button onClick={() => resetWorld()}>Reset</button>
    </div>
  );
};
