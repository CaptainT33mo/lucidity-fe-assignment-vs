import { Role } from "@/types";
import { create } from "zustand";

type PermissionStore = {
  role: Role;
  setRole: (role: Role) => void;
};

export const usePermissionStore = create<PermissionStore>()((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));