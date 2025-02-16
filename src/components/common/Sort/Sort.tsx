import { FC, useState } from "react";
import { motion } from "framer-motion";
import { LuChevronsUpDown, LuStar } from "react-icons/lu";
import { optionsT } from "@/types/types";
import useThemeStore from "@/store/themeStore";

interface SortP {
  active: optionsT;
  sortOptions: optionsT[];
  onClick: (option: optionsT) => void;
}

const Sort: FC<SortP> = ({ active, sortOptions, onClick }) => {
  const { theme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(!isOpen)}
      onMouseLeave={() => setIsOpen(!isOpen)}
    >
      <button
        className="z-20 relative rounded-full bg-blue-300 dark:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className="flex pr-3 pl-6 py-3 gap-2 "
          whileHover={{ scale: 1.1 }}
        >
          <span>Sort</span>
          <LuChevronsUpDown size={26} />
        </motion.div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`absolute flex flex-col items-end gap-4 px-6 pt-15 pb-6 shadow-lg border -top-1 -right-1 min-w-[200px] rounded-4xl bg-blue-300 dark:bg-gray-800`}
        >
          {sortOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => onClick(option)}
              disabled={active.id !== 0 && option.id === 0 && true}
              whileHover={{ scale: 1.1 }}
              className={`${
                active.id !== 0 && option.id === 0
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } flex items-center hover:text-blue-600 hover:dark:text-yellow-400 gap-2 p-2 ${
                active.id === option.id &&
                "text-blue-800 dark:text-yellow-400 font-bold"
              }`}
            >
              {<>{console.log(active.id)}</>}
              <span>{option.text}</span>
              {option.id !== 0 && (
                <LuStar
                  size={20}
                  color={theme === "light" ? "#ffffff" : "#ffb86a"}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Sort;
