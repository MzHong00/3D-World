import { RouterProvider } from "react-router-dom";

import appRouter from './appRouter';
import "./app.css"

const AppEntry = () => {

    return (
        <RouterProvider router={appRouter} />
    )
}

export default AppEntry;