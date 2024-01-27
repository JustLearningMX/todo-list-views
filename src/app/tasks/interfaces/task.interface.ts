import { TaskState } from "./task-state.enum";
import { TaskPriority } from "./task-priority.enum";

export interface Task {
  "id": number,
  "title": string,
  "description": string,
  "expirationDate": Date,
  "state": TaskState,
  "priority": TaskPriority
}
