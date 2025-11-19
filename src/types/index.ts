export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'destaque' | 'porcao' | 'drink';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UmbrellaPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}