import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  KeyboardControls,
  OrbitControls,
} from "@react-three/drei";

import { useKeyControls } from "components/models/character/useKeyControls";
import { MenuList } from "components/virtualWorld/menuList/menuList";
import { useDialogStore } from "stores/useOpenDialogStore";
import { Stats } from "@react-three/drei";

export const World = () => {
  const map = useKeyControls();
  const { dialog, isOpen }= useDialogStore();
  
  return (
    <Suspense fallback={<div>월드 불러오는 중...</div>}>
      {isOpen && dialog}
      <MenuList />
      <KeyboardControls map={map}>
        <Canvas shadows camera={{ position: [0, 20, 20], fov: 40}}>
          <Outlet />
          <Environment preset="apartment" />
          <OrbitControls />
        </Canvas>
      </KeyboardControls>
      <Stats />
    </Suspense>
  );
};
