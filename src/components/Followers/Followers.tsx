import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Follower } from "@/types/types";
import Pagination from "../common/Pagination/Pagination";
import {
  FOLLOWERS_PER_PAGE,
  getFollowers,
  useGetUserFollowers,
} from "./hooks/useGetUserFollowers";
import useUserStore from "@/store/userStore";
import ErrorComponent, {
  ErrorT,
} from "../common/ErrorComponent/ErrorComponent";
import UserElement from "../common/UserElement/UserElement";
import { queryClient } from "@/react-query/queryClient";
import Title from "../common/Title/Title";
import LoadingComponent from "../common/LoadingComponent/LoadingComponent";
import InfoComponent from "../common/InfoComponent/InfoComponent";

type Params = {
  username: string;
};

const Followers: FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<Params>();
  const { user } = useUserStore();

  const [currentPage, setCurrentPage] = useState<number>(1); // manage current page
  const safeUsername = username ?? ""; // ensure username is a valid string

  // fetch followers for current user and page
  const { data, isLoading, isError, error } = useGetUserFollowers(
    safeUsername,
    currentPage
  );

  // calculate total pages based on the user's followers count
  const totalPages = Math.ceil((user?.followers ?? 0) / FOLLOWERS_PER_PAGE);

  // prefetch next page of followers when the current page is not the last page
  useEffect(() => {
    if (currentPage < totalPages && username) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["followers", username, nextPage],
        queryFn: () => getFollowers(username, nextPage),
      });
    }
  }, [currentPage, queryClient]);

  // handle errors and data missing
  if (isError)
    return (
      <ErrorComponent
        errorTitle="Opss! Something went wrong!"
        error={error as unknown as ErrorT}
      />
    );
  if (!user) {
    return (
      <InfoComponent
        title="User data not found."
        message="Click here to go to Home."
        onClickHandler={() => navigate("/")}
      />
    );
  }
  if (user.followers === 0)
    return (
      <InfoComponent
        title="The user does not have any followers."
        message="Click here to go to Home."
        onClickHandler={() => navigate("/")}
      />
    );
  return (
    <div className={`flex flex-col flex-grown`}>
      <div className="flex items-center justify-start w-auto">
        <Title
          txtColor="text-gray-900 dark:text-gray-100"
          imgUrl={user.avatar_url}
          imgInfoText={`${username} | ${user.bio}`}
        >
          <div>{username} followers</div>
          <div>({user.followers})</div>
        </Title>
      </div>

      <div className="flex flex-col grow lg:justify-between">
        <div>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <div className="flex flex-col flex-grow w-auto sm:w-md md:w-lg lg:w-3xl gap-4">
              {data.map((follower: Follower) => {
                return (
                  <UserElement
                    key={follower.id}
                    user={follower}
                    onClick={() => navigate(`/user/${follower.login}`)}
                    size="large"
                  />
                );
              })}
            </div>
          )}
        </div>
        {totalPages !== 1 && (
          <Pagination
            totalPages={totalPages}
            onChange={setCurrentPage}
            activePage={currentPage}
            inactive={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Followers;
