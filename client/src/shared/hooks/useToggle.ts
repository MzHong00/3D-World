import { useState } from "react";

/*
    arg:
    {
        trueState: ture일 때, 보여질 값 또는 컴포넌트 등
        falseState: false일 때, 보여질 값 또는 컴포넌트 등
    }
    return:
    [
        {
            state: toggle의 상태 <boolean>
            value: 인자로 받았던 것을 state에 따라 반환
            changeState: toggle의 상태 변경 handler 함수
        },
    ]
*/

interface Props {
  initState?: boolean;
  trueState?: any;
  falseState?: any;
}

export const useToggle = ({
  initState = false,
  trueState,
  falseState,
}: Props = {}) => {
  const [toggle, setToggle] = useState(initState);

  const changeState = () => {
    setToggle(!toggle);
  };

  return {
    state: toggle,
    value: toggle ? trueState : falseState,
    handler: changeState,
  };
};
