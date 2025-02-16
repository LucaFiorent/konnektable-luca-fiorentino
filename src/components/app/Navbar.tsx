import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { LuCircleArrowLeft } from "react-icons/lu";
import { useSearchUsers } from "./hooks/useSearchUsers";
import SearchDropdown from "../common/SearchDropdown/SearchDropdown";
import ThemeToggle from "./ThemeToggle";
import useWindowSize from "./hooks/useWindowSize";
import { motion } from "framer-motion";
import NavElement from "../common/NavElement/NavElement";
import Button from "../common/Button/Button";

const Navbar: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const width = useWindowSize(); // get current window width

  const { user } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  // fetch search results using a custom hook
  const {
    data: searchResult,
    isSuccess: isSearchSuccess,
    isLoading: isSearchLoading,
  } = useSearchUsers(searchValue);

  // add validations to the search
  function handleSearchChange(value: string) {
    // allows only letters, numbers and spaces
    const sanitizeValue = value.replace(/[^a-zA-Z0-9-_\.]/g, "").trim();
    setSearchValue(sanitizeValue);
  }

  return (
    <nav
      className={`flex flex-col items-center w-auto sm:w-md md:w-lg lg:w-4xl uppercase mx-auto `}
    >
      <div
        className={`flex items-center w-full gap-2 p-2 mb-5 shadow-mg rounded-full
        lg:text-xl text-md sm:gap-2 md:gap-4 lg:gap-4 bg-blue-200 dark:bg-gray-800 ${
          location.pathname !== "/" ? "justify-between" : "justify-center"
        }`}
      >
        {location.pathname !== "/" && window.history.length > 1 && (
          <Button
            onClickHandler={() => navigate(-1)}
            uppercase={true}
            error={false}
            plain={true}
            extraStyles={"hover:text-blue-800 hover:dark:text-violet-400"}
          >
            <LuCircleArrowLeft size={26} />
            <p className="hidden sm:hidden md:block lg:block">Back</p>
          </Button>
        )}

        {width > 1024 && (
          <div className="flex-grow flex justify-center z-0 relative">
            <SearchDropdown
              bgColor="bg-blue-200 dark:bg-gray-800"
              txtColor="text-blue-600 dark:text-white"
              value={searchValue}
              onChange={handleSearchChange}
              searchResult={isSearchSuccess ? searchResult.items : []}
              isLoading={isSearchLoading}
            />
          </div>
        )}

        {user && (
          <NavElement to={`/user/${user.login}`}>
            <div
              className={`flex items-center ${
                location.pathname !== "/" && "justify-self-end"
              } gap-2 relative z-10`}
            >
              <motion.div
                whileHover={{
                  scale: 1.3,
                  boxShadow: "0px 1px 6px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full z-10"
              >
                <img
                  className="rounded-full"
                  src={user.avatar_url}
                  alt={`${user.login} | ${user.bio}`}
                />
              </motion.div>
            </div>
          </NavElement>
        )}
        <ThemeToggle />
      </div>
      {width < 1024 && (
        <div className="flex mb-5 w-full h-15 rounded-full z-99">
          <div className="flex items-center flex-grow h-15 p-4 rounded-full">
            <div className="flex flex-grow items-center justify-center">
              <motion.div className="absolute bg-blue-200 dark:bg-gray-800 mx-auto h-13 w-13 rounded-full" />
              <SearchDropdown
                bgColor="bg-blue-200 dark:bg-gray-800"
                txtColor="text-blue-600 dark:text-white"
                value={searchValue}
                onChange={handleSearchChange}
                searchResult={isSearchSuccess ? searchResult.items : []}
                isLoading={isSearchLoading}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
