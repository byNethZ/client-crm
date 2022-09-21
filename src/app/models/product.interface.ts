export interface Product{
  id:number;
  sku:string;
  name:string;
  supplier:string;
  category_id:number;
  description_english:string;
  description_spanish:string;
  price_one:number|null;
  price_two:number|null;
  price_three:number|null;
  price_four:number|null;
  price_five:number|null;
  price_six:number|null;
  price_seven:number|null;
  tax:number|null;
}
