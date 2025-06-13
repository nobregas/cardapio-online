export interface Order {
  [key: string]: unknown;
  id: string;
  customer: string;
  items: number;
  total: string;
  status:
    | "Concluido"
    | "PagamentoPendente"
    | "Cancelado"
    | "PagamentoConcluido"
    | "EmPreparo"
    | "ProntoParaRetirada"
    | "EmTransporte"
    | "Entregue";
  date: string;
}

// discount price significa preco total com desconto
export interface Product {
  [key: string]: unknown;
  id: string;
  name: string;
  price: string;
  discountPrice: string;
  description: string;
  category: string;
  image: string;
  isActive?: boolean;
}

export interface StatData {
  id: string;
  icon: string;
  color: Color;
  value: string;
  title: string;
}

export interface NavItem {
  path: string;
  icon: string;
  label: string;
  active?: boolean;
}

export interface LineData {
  month: Month;
  access: number;
  orders: number;
}

export interface BasicData {
  accessToday: number;
  ordersToday: number;
  activeProducts: number;
  dailyBilling: number;
}

export interface Category {
  [key: string]: unknown;
  id: string;
  name: string;
  image: string;
  description: string;
  products: number;
  order: number;
  isActive: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
  restaurant: string;
  createdAt: string;
  updatedAt: string;
}

export interface Adicional {
  [key: string]: unknown;
  id: string;
  name: string;
  price: number;
  isActive: boolean;
}

type Month =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

type Color = "blue" | "green" | "red" | "yellow" | "purple" | "orange";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface ChatHistory {
  role: "user" | "model";
  parts: { text: string }[];
}
