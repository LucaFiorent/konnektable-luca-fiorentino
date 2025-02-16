import React, { FC, useEffect, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

interface SearchInputP {
  value: string;
  onChange: (props: string) => void;
  showSearchField: boolean;
  setSearchFieldOpen: (props: boolean) => void;
  onFocus: (props: boolean) => void;
  isOnFocus: boolean;
}

const SearchInput: FC<SearchInputP> = ({
  value,
  onChange,
  showSearchField,
  setSearchFieldOpen,
  onFocus,
  isOnFocus,
}) => {
  // set ref for input
  const inputRef = useRef<HTMLInputElement | null>(null);
  // set ref for timeout of input
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // on search icon open/focus or close/not focus the input field
  function handleOpenSearch() {
    setSearchFieldOpen(!showSearchField);
    onFocus(!isOnFocus);

    // clear existing timeouts before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // set timeout to focus the input
    timeoutRef.current = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  // cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 h-10">
      <AnimatePresence initial={false}>
        {showSearchField && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center border-b-[1px] rounded"
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
              }
              type="text"
              placeholder="Search user..."
              className="px-2 py-1 rounded
           focus:border-sky-500 focus:outline
            focus:outline-sky-500
            "
            />
          </motion.div>
        )}
        <button className="cursor-pointer" onClick={handleOpenSearch}>
          <LuSearch size={24} />
        </button>
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
