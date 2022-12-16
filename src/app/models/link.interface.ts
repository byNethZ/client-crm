import { User } from "./user.interface";

export interface Link{
  id: number;
  customer: string | undefined;
  user_id: string | null;
  urldropbox: string;
  message: string;
  aprobed: number;
  approver: string;
  created_at: string;
  updated_at: string;
  customer_id: number;
  user?: User;
}
