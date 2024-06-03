import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { PreviewAvatar } from "components/home/previewAvatar/previewAvatar";
import { SpinCardList } from "components/home/card/spinCardList";
import { FloatingText } from "components/home/text/floatingText";
import { useDialogStore } from "stores/useOpenDialogStore";

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
        <FloatingText text={`Enter\nOur World!`} color={`#87ecfb`} />
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
