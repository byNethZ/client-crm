export interface User{
    id: number | null;
    name:string;
    lastname: string;
    role_id:number;
    email: string;
    password: string;
    departament_alt_id: string;
    avatar: string;
    token: string;
    departament_id: number;
    personal_phone: string;
    public_phone: string;
}
