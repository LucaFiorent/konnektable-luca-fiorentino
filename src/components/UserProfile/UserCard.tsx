import { triggerToast } from "@/store/toastStore";
import { UserProfile } from "@/types/types";
import { FC } from "react";
import { LuBookMarked, LuMapPin, LuUsersRound } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../common/Button/Button";

type UserCard = {
  userData: UserProfile;
};

const UserCard: FC<UserCard> = ({ userData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-blue-300 dark:bg-gray-800 text-blue-600 dark:text-white py-4 px-8 rounded-3xl">
      <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold uppercase mb-4">
        {userData.login}
      </h2>
      <div className="flex gap-2 mb-4 justify-center">
        <p className="text-md md:text-lg lg:text-xl ">AKA: </p>
        <p className="text-md md:text-lg lg:text-xl">{userData.name}</p>
      </div>
      <motion.div
        whileHover={{
          scale: 1.5,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex w-45 mx-auto mb-4 rounded-full cursor-zoom-in"
      >
        <img
          className="rounded-full"
          src={userData.avatar_url}
          alt={`${userData.name} | ${userData.bio}`}
        />
      </motion.div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center justify-center gap-2 ">
          <div className="text-red-400">
            <LuMapPin size={24} />
          </div>
          <p className="text-sm md:text-md lg:text-xl">Location:</p>
        </div>
        <p className="text-sm md:text-md lg:text-xl">{userData.location}</p>
      </div>
      <div className="mb-4 max-w-85 text-center">{userData.bio}</div>
      <div className="flex gap-5 justify-center mb-4">
        <Button
          onClickHandler={() =>
            userData.followers === 0
              ? triggerToast(
                  "This user does not have any public Repositories",
                  "error"
                )
              : navigate(`/repositories/${userData.login}`)
          }
          error={false}
          plain={true}
          extraStyles={"hover:text-white hover:dark:text-violet-400"}
        >
          <div className="flex gap-2 items-center">
            <LuBookMarked size={26} />
            <p className="text-sm md:text-md lg:text-lg">Public Repos:</p>
          </div>
          <p className="text-sm md:text-md lg:text-lg">
            {userData.public_repos}
          </p>
        </Button>
        <Button
          onClickHandler={() =>
            userData.followers === 0
              ? triggerToast("This user does not have any followers", "error")
              : navigate(`/followers/${userData.login}`)
          }
          error={false}
          plain={true}
          extraStyles={"hover:text-white hover:dark:text-violet-400"}
        >
          <div className="flex gap-2 items-center">
            <LuUsersRound size={26} />
            <p className="text-sm md:text-md lg:text-lg">Followers:</p>
          </div>
          <p className="text-sm md:text-md lg:text-lg">{userData.followers}</p>
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
