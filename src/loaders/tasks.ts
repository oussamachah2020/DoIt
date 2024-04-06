import { supabase } from "@lib/supabase";
import { AgendaEvent, ITask } from "src/types/Entities";

export const createTask = async (
  label: string,
  date: string,
  priority: string,
  userId: string | undefined
) => {
  if (!userId) {
    return;
  }
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        label,
        do_at: date,
        priority,
        userId,
      },
    ])
    .select();

  if (error || data == null) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

export const fetchTasksForUser = async (userId: string | undefined) => {
  if (!userId) {
    return;
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("userId", userId)
    .filter("done", "eq", false)
    .select();

  if (error || tasks == null) {
    return Promise.reject(error);
  }

  return Promise.resolve(tasks);
};

export const fetchCompletedTasksForUser = async (
  userId: string | undefined
) => {
  if (!userId) {
    return;
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("userId", userId)
    .filter("done", "eq", true)
    .select();

  if (error || tasks == null) {
    return Promise.reject(error);
  }

  return Promise.resolve(tasks);
};

export const finishTask = async (taskId: string) => {
  const { error } = await supabase
    .from("tasks")
    .update({ done: true })
    .eq("id", taskId);

  if (error) {
    return Promise.reject(error);
  }
};

export const UnFinishTask = async (taskId: string) => {
  const { error } = await supabase
    .from("tasks")
    .update({ done: false })
    .eq("id", taskId);

  if (error) {
    return Promise.reject(error);
  }
};

export const removeTask = async (taskId: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    return Promise.reject(error);
  }
};

export const createEvent = async (event: AgendaEvent) => {
  const { error } = await supabase.from("agenda").insert(event);

  if (error) {
    return Promise.reject(error);
  }
};

export const fetchEvents = async (userId: string) => {
  const { data, error } = await supabase
    .from("agenda")
    .select()
    .eq("user", userId);

  if (error || data == null) {
    return Promise.reject(error);
  }

  return data;
};