import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axiosInstance";
import { UserProfile } from "@/types/types";

// fetch user data from Github API
async function getUserData(username: string) {
  const prepareUrl = `users/${username}`;

  const { data } = await axiosInstance.get(prepareUrl);
  return data;
}

// custom hook to fetch user followers with tanstack query
export function useUserProfile(username: string) {
  const fallback: UserProfile[] = []; // default empty array in case of error or no data

  const {
    data = fallback,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["username", username],
    queryFn: () => getUserData(username),
    enabled: !!username,
  });

  return { data, isLoading, isSuccess, isError, error };
}
