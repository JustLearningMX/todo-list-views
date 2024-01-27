export interface ResponseError {
  isError: boolean,
  statusCode: number,
  path: string,
  timestamp: Date,
  messages: string[],
}
