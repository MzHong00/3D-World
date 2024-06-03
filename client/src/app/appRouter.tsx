import { createBrowserRouter } from "react-router-dom";

import ReadyPlayerMe from "pages/ReadyPlayerMe/readyPlayerMe";

import { Home } from "pages/Home/home";
import { World } from "pages/VirtualWorld/virtualWorld";
import { ThirdFloor } from "components/virtualWorld/world/ThirdFloor";
import { FourFloor } from "components/virtualWorld/world/FourFloor";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-avatar",
    element: <ReadyPlayerMe />,
  },
  {
    path: "/world",
    element: <World />,
    children: [
      {
        path: "3F",
        element: <ThirdFloor />,
      },
      {
        path: "4F",
        element: <FourFloor />,
      },
    ],
  },
]);

export default appRouter;
