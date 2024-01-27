import { Task } from "./task.interface";

export interface ListOfTasks {
  "id": number,
  "name": string,
  "description": string,
  "active": boolean,
  "tasks": Task[]
}

export interface ListOfTasksRequest {
  "name": string,
  "description": string,
  "active": boolean,
  "tasks": Task[] | null;
}
