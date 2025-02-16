import { ToastT, UserProfile } from "./types";

export interface ToastStoreT {
  toasts: ToastT[];
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
}

export interface UserStoreT {
  user: UserProfile | null;
  setUser: (profile: UserProfile) => void;
  clearUser: () => void;
}
