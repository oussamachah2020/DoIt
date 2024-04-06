export interface ITask {
  id: string;
  label: string;
  created_at: string;
  updated_at: string;
  do_at: string;
  done: boolean;
}

export interface AgendaEvent {
  todo: string;
  description: string;
  user: string | undefined;
}