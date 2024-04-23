import { createBrowserRouter } from "react-router-dom";
import { Home } from "pages/Home/home";
import ReadyPlayerMe from "pages/ReadyPlayerMe/readyPlayerMe";
import { World } from "pages/VirtualWorld/virtualWorld";
import { EntranceScene } from "components/entrance/entranceScene";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/create-character",
        element: <ReadyPlayerMe />
    },
    {
        path: "/join-world",
        element: <World />,
        children: [
            {
                path: 'entrance',
                element: <EntranceScene />
            },
        ]
    }
])

export default appRouter;