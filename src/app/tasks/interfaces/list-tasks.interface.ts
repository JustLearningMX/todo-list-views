import {TaskState} from "./task-state.enum";
import {TaskPriority} from "./task-priority.enum";

export interface ListOfTasks {
  "id": number,
  "name": string,
  "description": string,
  "active": boolean,
  "tasks": Task[]
}

export interface Task {
  "id": number,
  "title": string,
  "description": string,
  "expirationDate": Date,
  "state": TaskState,
  "priority": TaskPriority
}
