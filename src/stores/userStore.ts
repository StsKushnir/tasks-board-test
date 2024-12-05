
import { create } from "zustand";
import { defaultUsers } from "@/data/defaultUsers"; 
import { User } from "@/types/interfaces";

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserStore>((set) => {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "null");

  return {
    users: storedUsers || defaultUsers,
    addUser: (user) =>
      set((state) => {
        const newUsers = [...state.users, { ...user, id: Date.now() }];
        localStorage.setItem("users", JSON.stringify(newUsers));
        return { users: newUsers };
      }),
    deleteUser: (id) =>
      set((state) => {
        const filteredUsers = state.users.filter((user) => user.id !== id);
        localStorage.setItem("users", JSON.stringify(filteredUsers));
        return { users: filteredUsers };
      }),
    updateUser: (updatedUser) =>
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      }),
  };
});
