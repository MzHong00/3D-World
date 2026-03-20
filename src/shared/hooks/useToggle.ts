import { useState } from "react";

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
