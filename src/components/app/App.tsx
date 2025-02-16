import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../../react-query/queryClient";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Navbar";
import Followers from "../Followers/Followers";
import Repositories from "../Repositories/Repositories";
import UserProfile from "../UserProfile/UserProfile";
import ToastContainer from "../common/Toast/ToastContainer";
import HomeContainer from "./HomeContainer";
import { useEffect, useState } from "react";
import ErrorComponent, {
  ErrorT,
} from "../common/ErrorComponent/ErrorComponent";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Initial online state based on navigator
  const [error, setError] = useState<ErrorT | null>(null);

  // Check internet connection on mount and whenever the status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError(null); // Clear the error if the internet connection is back
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError({
        message: "No internet connection. Please check your network.",
        status: 0,
        originalError: null,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup the event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="sideContent h-[80vh]">
          <Navbar />
          {isOnline ? (
            <main className="flex h-[85vh] justify-center w-auto sm:w-md md:w-xl lg:w-4xl mx-auto ">
              <Routes>
                <Route element={<HomeContainer />}>
                  <Route path="/followers/:username" element={<Followers />} />
                  <Route
                    path="/repositories/:username"
                    element={<Repositories />}
                  />
                  <Route path="/user/:username" element={<UserProfile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </main>
          ) : (
            <ErrorComponent
              errorTitle="No internet connection."
              error={error}
            />
          )}
        </div>
        <ToastContainer />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
