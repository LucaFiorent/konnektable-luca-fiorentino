import { FC, useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import { UserProfile } from "@/types/types";
import UserElement from "../UserElement/UserElement";
import { useNavigate } from "react-router-dom";
import { LuTextCursorInput, LuTriangleAlert } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

interface SearchInputP {
  bgColor: string;
  txtColor: string;
  value: string;
  onChange: (value: string) => void;
  searchResult: UserProfile[];
  isLoading: boolean;
}

const SearchDropdown: FC<SearchInputP> = ({
  bgColor,
  txtColor,
  value,
  onChange,
  searchResult,
  isLoading,
}) => {
  const [showSearchInput, setIsOpenDropdown] = useState(false);
  const [isOpenDropdown, setSearchFieldOpen] = useState(false);
  // set a ref to track clicks outside of the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // handle clicks outside the search dropdown
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // close dropdown when clicking outside and reduce the search input
        setSearchFieldOpen(false);
        setIsOpenDropdown(false);
      }
    }
    // attach event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // cleanup on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className={`flex relative z-10 px-7 relative ${txtColor}`}>
        <SearchInput
          value={value}
          onChange={onChange}
          onFocus={setIsOpenDropdown}
          isOnFocus={isOpenDropdown}
          showSearchField={showSearchInput}
          setSearchFieldOpen={setSearchFieldOpen}
        />

        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-3 -top-1"
          >
            <LuTextCursorInput size={18} />
          </motion.div>
        )}
      </div>
      <AnimatePresence initial={false}>
        {isOpenDropdown && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute ${bgColor} px-4 pt-20 pb-5 -left-0 -top-3 rounded-3xl w-full border border-white flex flex-col items-center justify-center`}
          >
            {!isLoading &&
              searchResult.length === 0 &&
              value !== "" &&
              value.length >= 3 && (
                <div className="flex gap-4 bg-red-400 text-white px-4 py-2 rounded-2xl">
                  <LuTriangleAlert size={26} />
                  <p>No User Found</p>
                </div>
              )}
            <div className="flex flex-col gap-2 ">
              {searchResult.map((user) => (
                <UserElement
                  key={user.id}
                  user={user}
                  onClick={() => {
                    navigate(`/user/${user.login}`);
                    setSearchFieldOpen(false);
                    setIsOpenDropdown(false);
                    onChange("");
                  }}
                  size="small"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropdown;
