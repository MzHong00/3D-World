import { createBrowserRouter } from "react-router-dom";

import ReadyPlayerMe from "pages/createPlayerAvatar/createPlayerAvatar";

import { Home } from "pages/Home/home";
import { World } from "pages/world/world";
import { FourFloor } from "pages/FourFloor/FourFloor";
import { ThirdFloor } from "pages/ThirdFloor/ThirdFloor";

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
