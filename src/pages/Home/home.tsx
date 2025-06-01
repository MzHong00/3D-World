import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";

import { useDialogStore } from "shared/stores/useDialogStore";
import { CardList } from "components/cardList/ui/cardList";
import { Text } from "components/text";
import { PreviewAvatar } from "components/previewAvatar/ui/previewAvatar";
import { LoadingPage } from "pages/loadingPage";

export const Home = () => {
  const { dialog, isOpen } = useDialogStore();

  return (
    <Suspense fallback={<LoadingPage />}>
      {isOpen && dialog}
      <Canvas
        shadows
        camera={{ position: [0, 3, 11], fov: 50 }}
        style={{ zIndex: isOpen ? -10 : 0 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={2} />
        <directionalLight intensity={2} />
        <Sky sunPosition={[0, 1, 2]} />
        <Text text={`Enter\nOur World!`} color={`#87ecfb`} />
        <CardList />
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
