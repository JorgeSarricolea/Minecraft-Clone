import * as images from "../images/images.js";
import { useStore } from "../hooks/useStore.js";
import { useKeyboard } from "../hooks/useKeyboard.js";
import { useEffect, useState } from "react";

/**
 * TextureSelector component allows users to select a texture using keyboard shortcuts.
 */
export const TextureSelector = () => {
  // Local state to manage the visibility of the texture selector UI.
  const [visible, setVisible] = useState(true);
  // Zustand store state for the currently selected texture and the function to set the texture.
  const [texture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);

  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };

    // Find the first texture that is enabled (key pressed).
    const selectedTexture = Object.entries(options).find(
      ([texture, isEnabled]) => isEnabled
    );

    // If a texture is selected, set it as the current texture in the store.
    if (selectedTexture) {
      const [textureName] = selectedTexture;
      setTexture(textureName);
    }
  }, [dirt, glass, grass, log, wood]);

  // If the texture selector is not visible, return null to render nothing.
  if (!visible) return null;

  return (
    <div className="texture-selector">
      {Object.entries(images).map(([imgKey, img]) => {
        return (
          <img
            className={texture === imgKey.replace("Img", "") ? "selected" : ""}
            key={imgKey}
            src={img}
            alt={imgKey}
          />
        );
      })}
    </div>
  );
};
