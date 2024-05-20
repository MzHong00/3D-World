import { createBrowserRouter } from "react-router-dom";

import ReadyPlayerMe from "pages/ReadyPlayerMe/readyPlayerMe";

import { Home } from "pages/Home/home";
import { World } from "pages/VirtualWorld/virtualWorld";
import { DigitalZoneScene } from "components/virtualWorld/digital/digitalZoneScene";
import { Room2Scene } from "components/virtualWorld/room2/room2Scene";
import { ThirdFloor } from "components/virtualWorld/IntegrationZone/ThirdFloor";
import { FourFloor } from "components/virtualWorld/IntegrationZone/FourFloor";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/create-avatar",
        element: <ReadyPlayerMe />
    },
    {
        path: "/world",
        element: <World />,
        children: [
            {
                path: 'entrance',
                element: <div>제작중</div>
            },
            {
                path: 'laptop',
                element: <ThirdFloor />
            },
            {
                path: 'digital',
                element: <ThirdFloor />
            },
            {
                path: 'room1',
                element: <FourFloor />
            },
            {
                path: 'room2',
                element: <FourFloor />
            },
            {
                path: 'library',
                element: <div>제작중</div>
            },
        ]
    }
])

export default appRouter;