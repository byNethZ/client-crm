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
  color: string;
  place: string;
  hobby: string;
  movie: string;
  music: string;
  bio: string;
  birthplace: string;
  sport: string;
  business_number: string;
  field_1: string; //facebook id
  field_2: string; //asigned by (Digital)
  field_3: string; //origin
  birthday: string;
  gender: string;
  occupation: string;
  marital_status: number;
  nationality: number;
  language: number;
  fears: string;
  emotions: [] | string;
  needs: string;
  identity: string;
  dreams: string;
  goals: string;
  tasks: string;
  relations: string;
  values: [] | string;
  motivators: string;
  beliefs: [] | string;
  mind: [] | string;
  food: string;
  personality: [] | string;
  mindset: string;
  pleasures: string;
  finances: string;
  wishes: string;
  important_dates: string;
  challenges: string;
  responsability: string;
  demotivators: string;
  works: string;
  notes: string;
  image: string;
  token: string;
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
