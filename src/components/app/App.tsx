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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="sideContent h-[80vh]">
          <Navbar />
          <main className="flex h-[80vh] justify-center w-auto sm:w-md md:w-xl lg:w-4xl mx-auto ">
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
        </div>
        <ToastContainer />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
