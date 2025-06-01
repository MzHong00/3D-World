import { Center, Float } from "@react-three/drei";

import { Card } from "./card";
import { IArea } from "shared/types/type";

const AREA: IArea[] = [
  {
    name: "3F",
    bgUrl: "/img/digital.jpg",
    floor: "3층 열람실",
  },
  {
    name: "4F",
    bgUrl: "/img/room1.jpg",
    floor: "4층 열람실",
  },
];

export const CardList = ({ gap = 5 }) => {
  return (
    <Center bottom>
      <group>
        {AREA.map((area, i) => (
          <Float>
            <Card
              key={i}
              area={area}
              position={[i * gap, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </Float>
        ))}
      </group>
    </Center>
  );
};
