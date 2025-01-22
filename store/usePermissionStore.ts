import { Role } from "@/types";
import { create } from "zustand";

type PermissionStore = {
  role: Role;
  setRole: (role: Role) => void;
};

export const usePermissionStore = create<PermissionStore>()((set) => ({
  role: "user",
  setRole: (role) => set({ role }),
}));