import { nanoid } from "nanoid";
import { create } from "zustand";

const getLocalStorage = (key) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Creates a Zustand store for managing the state of the application.
 *
 * @property {string} texture - The current selected texture.
 * @property {Array} cubes - The list of cubes in the world, each with an id, position, and texture.
 * @property {function} addCube - Function to add a new cube to the state.
 * @property {function} removeCube - Function to remove a cube from the state.
 * @property {function} setTexture - Function to set the current selected texture.
 * @property {function} saveWorld - Function to save the current state of the world to local storage.
 * @property {function} resetWorld - Function to reset the world to its initial state.
 */
export const useStore = create((set) => ({
  texture: "wood",
  cubes: getLocalStorage("cubes") || [
    {
      id: nanoid(),
      pos: [0, 0, 1],
      texture: "wood",
    },
    {
      id: nanoid(),
      pos: [0, 1, 1],
      texture: "wood",
    },
    {
      id: nanoid(),
      pos: [0, 2, 1],
      texture: "wood",
    },
    {
      id: nanoid(),
      pos: [1, 2, 1],
      texture: "wood",
    },

    {
      id: nanoid(),
      pos: [2, 0, 1],
      texture: "wood",
    },
    {
      id: nanoid(),
      pos: [2, 1, 1],
      texture: "wood",
    },
    {
      id: nanoid(),
      pos: [2, 2, 1],
      texture: "wood",
    },
  ],
  /**
   * Adds a new cube to the state at the specified position with the current texture.
   *
   * @param {number} x - The x-coordinate for the new cube.
   * @param {number} y - The y-coordinate for the new cube.
   * @param {number} z - The z-coordinate for the new cube.
   */
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        { id: nanoid(), pos: [x, y, z], texture: state.texture },
      ],
    }));
  },
  /**
   * Removes a cube at the specified position (x, y, z).
   *
   * @param {number} x - The x-coordinate of the cube to remove.
   * @param {number} y - The y-coordinate of the cube to remove.
   * @param {number} z - The z-coordinate of the cube to remove.
   */
  removeCube: (x, y, z) => {
    set((state) => ({
      cubes: state.cubes.filter(
        (cube) => cube.pos[0] !== x || cube.pos[1] !== y || cube.pos[2] !== z
      ),
    }));
  },
  /**
   * Sets the current selected texture.
   *
   * @param {string} texture - The texture to set as the current selected texture.
   */
  setTexture: (texture) => {
    set(() => ({ texture }));
  },
  /**
   * Saves the current state of the world (cubes) to local storage.
   */
  saveWorld: () => {
    set((state) => {
      setLocalStorage("cubes", state.cubes);
      return state; // Keep the current state unchanged
    });
  },
  /**
   * Resets the world by clearing all cubes.
   */
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
