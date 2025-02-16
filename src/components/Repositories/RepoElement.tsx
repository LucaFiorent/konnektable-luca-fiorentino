import useThemeStore from "@/store/themeStore";
import { GitHubRepository } from "@/types/githubTypes";
import { FC } from "react";
import { LuBookMarked, LuStar } from "react-icons/lu";
import { motion } from "framer-motion";

interface RepoElementP {
  repoData: GitHubRepository;
}

const RepoElement: FC<RepoElementP> = ({ repoData }) => {
  const { theme } = useThemeStore();

  // format date to display on repoElement
  const date = new Date(repoData.updated_at);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <motion.div
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-auto sm:w-md md:w-lg lg:w-3xl flex justify-between text-left gap-4 text-blue-600 dark:text-white bg-blue-300 hover:bg-blue-400 dark:bg-gray-800 hover:dark:bg-gray-700 p-4 rounded-xl"
    >
      <div className="flex gap-4 items-center w-full">
        <div className="flex ml-3 items-center">
          <LuBookMarked size={26} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-5">
            <div className="font-semibold">{repoData.name}</div>
            <div className="flex text-gray-500 dark:text-gray-500 gap-1">
              <span className="text-xs">updated</span>
              <span className="text-xs">{formattedDate}</span>
            </div>
          </div>
          <div className="flex text-sm text-blue-600 dark:text-gray-300 w-full">
            {repoData.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mr-2">
        <LuStar size={26} color={theme === "light" ? "#ffffff" : "#ffb86a"} />
        <span className="text-sm">{repoData.stargazers_count}</span>
      </div>
    </motion.div>
  );
};

export default RepoElement;
