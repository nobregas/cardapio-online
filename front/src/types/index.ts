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

export interface Product {
  [key: string]: unknown;
  id: string;
  name: string;
  price: string;
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

type Color = "blue" | "green" | "red" | "yellow" | "purple" | "orange";
