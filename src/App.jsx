import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./components/Ground.jsx";
import { Player } from "./components/Player.jsx";
import { FPV as Fpv } from "./components/FPV.jsx";
import { Cubes } from "./components/Cubes.jsx";
import { TextureSelector } from "./components/TextureSelector.jsx";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.9} />
        <Fpv />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
      </Canvas>

      <div className="pointer">+</div>
      <TextureSelector />
    </>
  );
}

export default App;
