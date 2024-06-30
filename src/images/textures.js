import { grassImg, dirtImg, logImg, glassImg, woodImg } from "./images.js";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

/**
 * Load and configure a texture.
 * @param image The image source to load the texture from.
 * @returns Configured texture object.
 */
function loadAndConfigureTexture(image) {
  const loader = new TextureLoader();
  const texture = loader.load(image);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  return texture;
}

// Define textures with their corresponding image sources.
const textures = {
  ground: grassImg,
  dirt: dirtImg,
  log: logImg,
  glass: glassImg,
  wood: woodImg,
};

/**
 * Configure and store textures with descriptive keys.
 */
const configuredTextures = Object.keys(textures).reduce((acc, key) => {
  acc[key + "Texture"] = loadAndConfigureTexture(textures[key]);
  return acc;
}, {});

export { configuredTextures };
