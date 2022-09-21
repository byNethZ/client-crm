import { User } from "./user.interface";
import { Vendor } from "./vendor.interface";

/*
0-prospect
1-negociation
2-following
3-cierre
4-reject
5-cliente
6- inactive
*/
export interface Customer {
  id: number;
  status: number;
  business: string;
  name: string;
  surname: string;
  address: string;
  zipcode: string;
  country_id: number;
  state_id: number;
  city: string;
  town: string;
  phone: string;
  email: string;
  website: string;
  vendor_id: number;
  level: number;
  type_id: number;
  token: string;
  color: string;
  place: string;
  hobby: string;
  movie: string;
  music: string;
  bio: string;
  birthplace: string;
  sport: string;
  business_number: string;
  field_1: string;
  field_2: string;
  field_3: string;
  birthday: string;
  gender: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Interest {
  created_at: string;
  customer_id: number;
  id: number;
  interests: [] | string;
  updated_at: string;
}

export interface Customer_Type {
  id: number,
  type: string,
  isLeader: number
}

export interface Prospect extends Customer {
  interests: Interest | null;
  industry: Customer_Type | null;
  vendor?: User
}
