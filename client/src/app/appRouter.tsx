import { createBrowserRouter } from "react-router-dom";

import ReadyPlayerMe from "pages/ReadyPlayerMe/readyPlayerMe";

import { Home } from "pages/Home/home";
import { World } from "pages/VirtualWorld/virtualWorld";
import { LaptopZoneScene } from "components/virtualWorld/laptop/laptopScene";
import { Room1Scene } from "components/virtualWorld/room1/room1Scene";
import { DigitalZoneScene } from "components/virtualWorld/digital/digitalZoneScene";
import { Room2Scene } from "components/virtualWorld/room2/room2Scene";

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
                element: <LaptopZoneScene />
            },
            {
                path: 'digital',
                element: <DigitalZoneScene />
            },
            {
                path: 'room1',
                element: <Room1Scene />
            },
            {
                path: 'room2',
                element: <Room2Scene />
            },
            {
                path: 'library',
                element: <div>제작중</div>
            },
        ]
    }
])

export default appRouter;