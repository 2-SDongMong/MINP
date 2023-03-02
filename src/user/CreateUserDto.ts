export class CreateUserDto{
    nickname: string;
    name: string;
    password: string;
    salt: string;
    email: string;
    address: string;
    phone_number: string;
    is_admin: number;
}