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

export interface TaskBody {
  "title": string,
  "description": string,
  "expirationDate": Date,
  "state": TaskState,
  "priority": TaskPriority
}

export interface TaskBodyRequest {
  "list_task_id": number,
  "tasks": TaskBody[]
}

export interface OneTaskBodyRequest {
  "list_task_id": number,
  "task": TaskBody
}

export interface TaskBodyResponse {
  "userId": number,
  "listTaskId": number,
  "tasks": Task[]
}
