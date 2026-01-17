
export enum Category {
  NETWORK = 'NETWORK',
  SMART_LOCK = 'SMART_LOCK'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
}
