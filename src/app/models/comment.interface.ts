import { User } from './user.interface';

export interface Comment {
  author_id: number;
  comment: string;
  created_at?: string;
  customer_id: number;
  id?: number;
  updated_at?: string;
  user?: User;
}
