export interface UserRequest
{
    email: string;
    nickName: string;
    password: string;
    confirmPassword: string;
    role: number;
    active: boolean;
}