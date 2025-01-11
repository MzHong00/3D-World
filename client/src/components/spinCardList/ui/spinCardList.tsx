import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";

import { Card } from "./card";
import { area } from "../consts/consts";

/*
   radius: 값을 크게 하면 Card의 간격이 커짐
    count: Card의 개수
*/

export const SpinCardList = ({ radius = 3, count = 6 }) => {
  const ref = useRef<any>();

  useFrame((_, delta) => {
    ref.current.rotation.y += delta / 10;
  });

  return (
    <Center bottom>
      <group ref={ref}>
        {area.map((area, i) => (
          <Card
            key={i}
            area={area}
            position={[
              Math.sin((i / count) * Math.PI * 2) * radius,
              0,
              Math.cos((i / count) * Math.PI * 2) * radius,
            ]}
            rotation={[0, (i / count) * Math.PI * 2, 0]}
          />
        ))}
      </group>
    </Center>
  );
};
