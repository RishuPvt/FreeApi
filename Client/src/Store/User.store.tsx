import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TypeState = {
  name: string;
  id: string;
  isAuth: boolean;
};

type Actions = {
  setUser: (user: TypeState) => void;
};

export const useUserStore = create<TypeState & Actions>()(
  devtools((set) => ({
    name: "",
    id: "",
    isAuth: false,

    setUser: (user) => set(user),
  }))
);