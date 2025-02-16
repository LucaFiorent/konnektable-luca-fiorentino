import { AxiosError } from "axios";
import { GitHubRepository } from "./githubTypes";

export interface Id {
  id: number;
}
export interface IdWithString {
  id: string | number;
}

export interface isActions extends error {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
export interface error {
  error?: AxiosError | null;
}

export interface useUserProfileT extends isActions {
  data: UserProfile;
}
export interface useGetUserFollowersT extends isActions {
  data: Follower[];
}
export interface useGetUserReposT extends isActions {
  data: GitHubRepository[];
}

export interface UserProfile extends IdWithString {
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string; // "User"
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface Follower extends Id {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface ToastT extends Id {
  message: string;
  type?: "success" | "error" | "info";
}

export interface optionsT {
  id: 0 | 1 | 2;
  text: "No Sorting" | "Most Stars" | "Fewest Stars";
  type: "none" | "asc" | "desc";
}
