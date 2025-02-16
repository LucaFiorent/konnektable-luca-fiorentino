import { axiosInstance } from "@/axiosInstance";
import { Follower } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const FOLLOWERS_PER_PAGE = 10;

// fetch user followers data from Github API
export async function getFollowers(username: string, page: number) {
  const prepareUrl = `users/${username}/followers?per_page=${FOLLOWERS_PER_PAGE}&page=${page}`;
  const { data } = await axiosInstance.get(prepareUrl);
  return data;
}

// custom hook to fetch user followers with tanstack query
export function useGetUserFollowers(username: string, page: number) {
  const fallback: Follower[] = []; // default empty array in case of error or no data

  const {
    data = fallback,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<Follower[], AxiosError>({
    queryKey: ["followers", username, page],
    queryFn: () => getFollowers(username, page),
    enabled: !!username,
  });

  return { data, isLoading, isSuccess, isError, error };
}
