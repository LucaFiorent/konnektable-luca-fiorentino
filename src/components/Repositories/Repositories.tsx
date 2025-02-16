import { Params, useParams } from "react-router-dom";
import { optionsT, useGetUserReposT } from "@/types/types";
import {
  getUserRepos,
  REPOS_PER_PAGE,
  useGetUserRepos,
} from "./hooks/useUserRepos";
import Pagination from "../common/Pagination/Pagination";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";
import { queryClient } from "@/react-query/queryClient";
import RepoElement from "./RepoElement";
import Sort from "../common/Sort/Sort";
import Title from "../common/Title/Title";
import LoadingComponent from "../common/LoadingComponent/LoadingComponent";
import ErrorComponent, {
  ErrorT,
} from "../common/ErrorComponent/ErrorComponent";

const options: optionsT[] = [
  { id: 0, text: "No Sorting", type: "none" },
  { id: 1, text: "Most Stars", type: "desc" },
  { id: 2, text: "Fewest Stars", type: "asc" },
];

const Repositories = () => {
  const { username } = useParams<Params>();
  const { user } = useUserStore();

  const [currentPage, setCurrentPage] = useState<number>(1); // manage current page
  const [sortOption, setSortOption] = useState(options[0]); // manage sorting
  const totalPages = Math.ceil((user?.public_repos ?? 0) / REPOS_PER_PAGE); // calculate total pages based on the user's repositories
  const safeUsername = username ?? ""; // ensure username is a valid string

  // fetch repositories
  const {
    data: repoData,
    isLoading: isReposLoading,
    isError: isReposError,
    error: isReposErrorObject,
  }: useGetUserReposT = useGetUserRepos(safeUsername, currentPage);

  // fetch next page of repositories
  useEffect(() => {
    if (currentPage < totalPages && !isReposLoading && username) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["repos", username, nextPage, sortOption],
        queryFn: () => getUserRepos(username, nextPage),
      });
    }
  }, [currentPage, username, totalPages, sortOption]);

  // sort repo of the page data
  // since i cannot get a sorted list of data from the api
  const sortedRepoData = [...repoData].sort((a, b) =>
    sortOption.type === "desc"
      ? b.stargazers_count - a.stargazers_count
      : a.stargazers_count - b.stargazers_count
  );

  // display error message
  if (isReposError)
    return (
      <ErrorComponent
        errorTitle="Opsss! Something went wrong!"
        error={isReposErrorObject as unknown as ErrorT}
      />
    );
  return (
    <div
      className={`flex flex-col flex-grow lg:justify-between w-auto sm:w-md md:w-lg lg:w-3xl `}
    >
      <div>
        <div className="flex items-center justify-between mb-10">
          {user && (
            <Title
              txtColor="text-gray-900 dark:text-gray-100"
              imgUrl={user.avatar_url}
              imgInfoText={`${username} | ${user.bio}`}
              spaceDown={false}
            >
              <h2 className="hidden sm:hidden md:block">{username}</h2>
              <h2>repos</h2>
            </Title>
          )}
          <Sort
            active={sortOption}
            sortOptions={options}
            onClick={setSortOption}
          />
        </div>

        {isReposLoading ? (
          <div className="mb-25">
            <LoadingComponent />
          </div>
        ) : (
          <div className="flex flex-col gap-2 ">
            {sortedRepoData.map((repo) => {
              return <RepoElement key={repo.id} repoData={repo} />;
            })}
          </div>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        onChange={setCurrentPage}
        activePage={currentPage}
        inactive={isReposLoading}
      />
    </div>
  );
};

export default Repositories;
