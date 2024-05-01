import { createBrowserRouter } from "react-router-dom";

import ReadyPlayerMe from "pages/ReadyPlayerMe/readyPlayerMe";

import { Home } from "pages/Home/home";
import { World } from "pages/VirtualWorld/virtualWorld";
import { EntranceScene } from "components/virtualWorld/entrance/entranceScene";
import { LaptopZoneScene } from "components/virtualWorld/laptop/laptopScene";

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
                element: <EntranceScene />
            },
            {
                path: 'laptop',
                element: <LaptopZoneScene />
            },
            {
                path: 'digital',
                element: <div>제작중</div>
            },
            {
                path: 'room1',
                element: <div>제작중</div>
            },
            {
                path: 'room2',
                element: <div>제작중</div>
            },
            {
                path: 'library',
                element: <div>제작중</div>
            },
        ]
    }
])

export default appRouter;