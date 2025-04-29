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

type Month =
  "jan"
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
