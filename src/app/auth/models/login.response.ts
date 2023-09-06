import { UserResponse } from "src/app/models/user.response";

export interface LoginResponse {
  token: string;
  user: UserResponse;
}