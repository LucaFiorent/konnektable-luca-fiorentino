import { axiosInstance } from "@/axiosInstance";
import { GitHubRepository } from "@/types/githubTypes";
import { optionsT } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const REPOS_PER_PAGE = 12;

// fetch user repos data from Github API
export async function getUserRepos(
  username: string,
  page: number,
  sort: optionsT // sort prop for sort repos
) {
  const startUrl = `users/${username}/repos`;

  // !!IMPORTANT
  // the github api "user/${username}/repo" does not support the sorting by stars
  // const sorting = `sort=stars&direction=${sort.type}`;

  // no sorting
  const pagination = `per_page=${REPOS_PER_PAGE}&page=${page}`;
  const prepareUrl = `${startUrl}?${pagination}`;

  const { data } = await axiosInstance.get(prepareUrl);

  return data;
}

// custom hook to fetch user followers with tanstack query
export function useGetUserRepos(
  username: string,
  page: number,
  sort: optionsT
) {
  const fallback: GitHubRepository[] = []; // default empty array in case of error or no data

  const {
    data = fallback,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<GitHubRepository[], AxiosError>({
    queryKey: ["repos", username, page, sort],
    queryFn: () => getUserRepos(username, page, sort),
    enabled: !!username,
  });

  return { data, isLoading, isSuccess, isError, error };
}
