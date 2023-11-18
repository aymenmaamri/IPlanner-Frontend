import { atom } from "recoil";

export enum TodoPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export enum TodoStatus {
  DONE = "done",
  INPROGRESS = "inprogress",
  TODO = "todo",
}

export type Todo = {
  id: string;
  name: string;
  description: string;
  status: TodoStatus;
  resolved: boolean;
  priority: TodoPriority;
};

export const todosState = atom<Todo[]>({
  key: "todosState",
  default: [],
});
