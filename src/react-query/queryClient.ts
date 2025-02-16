import { triggerToast } from "@/store/toastStore";
import { QueryCache, QueryClient } from "@tanstack/react-query";

// create a custom error title based on the error
function createTitle(errorMessage: string, actionType: "query") {
  const action = actionType === "query" && "fetch";

  // return a formatted error title
  return `Error - Could not ${action} data: ${
    errorMessage ?? "error connecting to server"
  }`;
}

// error handler that triggers a toast notification
function errorHandler(title: string) {
  triggerToast(title, "error");
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10m
      gcTime: 900000, // 15m
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // error handler for queries that fail
    onError: (error) => {
      const title = createTitle(error.message, "query");
      errorHandler(title);
    },
  }),
});
