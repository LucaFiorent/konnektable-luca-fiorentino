import { useUserProfile } from "./hooks/useUserProfile";
import UserCard from "./UserCard";
import useUserStore from "@/store/userStore";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../common/LoadingComponent/LoadingComponent";
import ErrorComponent, {
  ErrorT,
} from "../common/ErrorComponent/ErrorComponent";

const UserProfile: FC = () => {
  const { user, setUser } = useUserStore();
  const { username } = useParams();
  const safeUsername = username ?? "";

  // fetching user profile data
  const { data, isLoading, isError, isSuccess, error } =
    useUserProfile(safeUsername);

  // effect to update the global store with the fetched user data if the request is successful
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data); // set the global user state
    }
  }, [isSuccess, data, setUser]); // rerun if dependencies changes

  // if error show an error message
  if (isError) {
    return (
      <ErrorComponent
        errorTitle="Opsss! Something went wrong!"
        error={error as unknown as ErrorT}
      />
    );
  }
  return (
    <div className="flex items-start justify-center">
      {isLoading ? <LoadingComponent /> : <UserCard userData={user || data} />}
    </div>
  );
};

export default UserProfile;
