export interface Link{
  id: string | number;
  customer: string | undefined;
  user_id: string | null;
  urldropbox: string;
  message: string;
  aprobed: string | number;
  approver: string;
  created_at: string;
  updated_at: string;
  customer_id: number
}
