import { axiosInstance } from "@/axiosInstance";
import { UserProfile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

// fetches user data based on search value
async function getSearchedUserData(searchValue: string) {
  // prepare the search URL with query parameters - 10 elements per request
  const prepareUrl = `search/users?per_page=10&q=${searchValue}`;

  const { data } = await axiosInstance.get(prepareUrl);

  return data;
}

// custom hook to fetch and manage results using tanstack query
export function useSearchUsers(searchValue: string) {
  const fallback: UserProfile[] = []; // default empty array in case of no data

  const {
    data = fallback, // use fallback if no data available
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => getSearchedUserData(searchValue),
    enabled: searchValue.length >= 3, // only fetch when the search value had at least 3 characters
  });

  return { data, isLoading, isSuccess, isError, error }; // return query state and data
}
