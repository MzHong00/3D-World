import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Sky, Stats } from "@react-three/drei";
import {
  Environment,
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";

import { useKeyControls } from "components/models/character/useKeyControls";
import { BottomNavBar } from "components/virtualWorld/sideBar/bottomNavBar";
import { useDialogStore } from "stores/useOpenDialogStore";
import { useCameraModeStore } from "stores/useCameraModeStore";
import { CameraAdjusting } from "shared/ui/Loading/CameraAdjusting/cameraAdjusting";
import { TopNavBar } from "components/virtualWorld/sideBar/topNavBar";

export const World = () => {
  const map = useKeyControls();
  const { dialog, isOpen } = useDialogStore();
  const { modeState } = useCameraModeStore((state) => state);

  return (
    <Suspense fallback={<div>월드 불러오는 중...</div>}>
      {isOpen && dialog}
      <TopNavBar />
      <BottomNavBar />
      <KeyboardControls map={map}>
        <Canvas shadows camera={{ position: [0, 20, 20], fov: 40 }}>
          <Outlet />
          <Environment preset="apartment" />
          <Sky />
          {!modeState && <PointerLockControls />}
        </Canvas>
      </KeyboardControls>
      <CameraAdjusting />
      <Stats />
    </Suspense>
  );
};
