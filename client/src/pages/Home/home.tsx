import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";

import { useDialogStore } from "shared/stores/useDialogStore";
import { SpinCardList } from "components/spinCardList/ui/spinCardList";
import { Text } from "components/text";
import { PreviewAvatar } from "components/previewAvatar/ui/previewAvatar";

export const Home = () => {
  const { dialog, isOpen } = useDialogStore();

  return (
    <Suspense fallback="메인 페이지 불러오는 중...">
      {isOpen && dialog}
      <Canvas
        shadows
        camera={{ position: [0, 3, 10], fov: 50 }}
        style={{ zIndex: isOpen ? -10 : 0 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={2} />
        <directionalLight intensity={2} />
        <Sky sunPosition={[0, 1, 2]} />
        <Text text={`Enter\nOur World!`} color={`#87ecfb`} />
        <SpinCardList />
        <OrbitControls
          enableZoom={false}
          rotateSpeed={0.3}
          minPolarAngle={1.3}
          maxPolarAngle={1.4}
        />
      </Canvas>
      <PreviewAvatar />
    </Suspense>
  );
};
