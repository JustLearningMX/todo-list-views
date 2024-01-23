export interface UserLoginBody {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  token: string
}

export interface UserLoginResponseError {
  isError: boolean,
  timestamp: Date,
  statusCode: number,
  path: string,
  messages?: string[],
  message?: string
}

export interface UserRegisterBody {
  firstName: string,
  lastName: string,
  email: string,
  password: string;
  password2: string;
}
