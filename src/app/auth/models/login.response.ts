import { UserResponse } from "src/app/models/responses/user.response";

export interface LoginResponse {
  token: string;
  user: UserResponse;
}