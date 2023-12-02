import { create } from "zustand";

interface ITaskStoreType {
  openTaskForm: boolean;
  setOpenTaskForm: (value: boolean) => void;

  openCalendarModal: boolean;
  setOpenCalendarModal: (value: boolean) => void;

  uploadedImagePath: string;
  setUploadedImagePath: (path: string) => void;
}

export const useTaskStore = create<ITaskStoreType>((set) => ({
  openTaskForm: false,
  setOpenTaskForm: (value: boolean) => set(() => ({ openTaskForm: value })),
  openCalendarModal: false,
  setOpenCalendarModal: (value: boolean) =>
    set(() => ({ openCalendarModal: value })),

  uploadedImagePath: "",
  setUploadedImagePath: (value: string) =>
    set(() => ({ uploadedImagePath: value })),
}));
