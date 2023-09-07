import { Role } from "../enums/role.enum";

export interface UserResponse {
  id: number;
  email: string;
  nickName: string;
  active: boolean;
  role: Role;
}