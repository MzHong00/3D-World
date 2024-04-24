import { createBrowserRouter } from "react-router-dom";
import { Home } from "pages/Home/home";
import ReadyPlayerMe from "pages/ReadyPlayerMe/readyPlayerMe";
import { World } from "pages/VirtualWorld/virtualWorld";
import { DigitalZoneScene } from "components/virtualWorld/digital/digitalZoneScene";
import { EntranceScene } from "components/virtualWorld/entrance/entranceScene";

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
                path: 'labtop',
                element: <EntranceScene />
            },
            {
                path: 'digital',
                element: <DigitalZoneScene />
            },
            {
                path: 'room1',
                element: <EntranceScene />
            },
            {
                path: 'room2',
                element: <EntranceScene />
            },
            {
                path: 'library',
                element: <EntranceScene />
            },
        ]
    }
])

export default appRouter;