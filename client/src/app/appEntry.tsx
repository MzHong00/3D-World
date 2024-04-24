import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import appRouter from './appRouter';
import "./app.css"

const queryClient = new QueryClient();

const AppEntry = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={appRouter} />
        </QueryClientProvider>
    )
}

export default AppEntry;