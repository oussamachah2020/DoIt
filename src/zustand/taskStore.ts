import { create } from "zustand";

interface ITaskStoreType {
  openTaskForm: boolean;
  setOpenTaskForm: (value: boolean) => void;
}

export const useTaskStore = create<ITaskStoreType>((set) => ({
  openTaskForm: false,
  setOpenTaskForm: (value: boolean) => set(() => ({ openTaskForm: value })),
}));
