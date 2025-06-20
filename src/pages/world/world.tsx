import { Suspense} from "react";
import { Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Sky, Stats } from "@react-three/drei";
import {
  Environment,
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";

import { useDialogStore } from "shared/stores/useDialogStore";
import { useCameraModeStore } from "shared/stores/useCameraModeStore";
import { CameraAdjusting } from "shared/ui/Loading/CameraAdjusting/cameraAdjusting";
import { TopNavBar } from "components/sideBar/topNavBar";
import { useKeyControls } from "components/player/model/useKeyControls";
import { BottomNavBar } from "components/sideBar/bottomNavBar";
import { LoadingPage } from "pages/loadingPage";

export const World = () => {
  const map = useKeyControls();
  const { dialog, isOpen } = useDialogStore();
  const { modeState } = useCameraModeStore();

  return (
    <Suspense fallback={<LoadingPage />}>
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
