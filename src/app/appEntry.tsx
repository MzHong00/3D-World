import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import appRouter from "./appRouter";
import { staleTime } from "shared/constant";

import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: staleTime,
      retry: false,
    },
  },
});

const AppEntry = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
};

export default AppEntry;
