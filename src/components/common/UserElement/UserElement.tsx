import { Follower, UserProfile } from "@/types/types";
import { FC } from "react";
import { LuEye } from "react-icons/lu";

interface UserElementP {
  user: Follower | UserProfile;
  onClick: () => void;
  size: "small" | "large";
}

const UserElement: FC<UserElementP> = ({ user, onClick, size = "large" }) => {
  const setGap =
    size === "small"
      ? "gap-3 sm:gap-4 md:gap-5 lg:gap-2 w-48"
      : "gap-3 sm:gap-4 md:gap-5 lg:gap-6";

  return (
    <button
      className={`cursor-pointer text-blue-600 dark:text-white bg-blue-300 hover:bg-blue-400 dark:bg-gray-800 hover:dark:bg-gray-700 pl-2 py-2 pr-8 w-full rounded-full flex items-center justify-between `}
      onClick={onClick}
    >
      <div className={`flex items-center ${setGap}`}>
        <div
          className={`flex items-start justify-start  ${
            size === "small" ? "w-10 h-10" : "w-15 h-15"
          }`}
        >
          {!user.avatar_url ? (
            <div
              className={`bg-gray-600 rounded-full ${
                size === "small" ? "w-10 h-10" : "w-20 h-20"
              }`}
            />
          ) : (
            <img
              className="rounded-full items-center "
              src={user.avatar_url}
              alt={`${user.login}`}
            />
          )}
        </div>
        <p className="text-md font-semibold overflow-hidden mr-4">
          {user.login}
        </p>
      </div>
      <LuEye size={22} />
    </button>
  );
};

export default UserElement;
