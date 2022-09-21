export interface Website {
  id: number;
  name: string;
  url: string;
  customer_id: number;
  initial_date: string;
  end_date: string;
  service: string;
  payment: string;
  invoice: string;
  invoice_id: number;
  payment_received: number;
  payment_method: number;
  vendor_id: number;
  maintenance: number;
}
