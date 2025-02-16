import { ToastStoreT } from "@/types/storeTypes";
import { create } from "zustand";

// create store to manage toasts
const useToastStore = create<ToastStoreT>((set) => ({
  toasts: [],
  // add new toast
  addToast: (message, type = "success") => {
    const id = Date.now(); // generate an unique ID
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }], // add the new toast to the list
    }));

    // automatically remove toast after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 5000);
  },
  // function to manually remove a toast
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

// external trigger function to add a toast
export const triggerToast = (
  message: string,
  type: "success" | "error" | "info"
) => {
  useToastStore.getState().addToast(message, type); // add toast to the store
};

export default useToastStore;
