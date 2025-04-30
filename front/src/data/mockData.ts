import { Order, Product, StatData, NavItem, BasicData } from '../types';

export const navItems: NavItem[] = [
  { path: '/', icon: 'fa-chart-pie', label: 'Dashboard', active: true },
  { path: '/products', icon: 'fa-pizza-slice', label: 'Produtos' },
  { path: '/categories', icon: 'fa-list', label: 'Categorias', active: true },
  { path: '/add', icon: 'fa-plus-circle', label: 'Adicionais' },
  { path: '/promotions', icon: 'fa-tag', label: 'Promoções' },
  { path: '/orders', icon: 'fa-shopping-cart', label: 'Pedidos' },
  { path: '/personalization', icon: 'fa-paint-brush', label: 'Personalização' },
  { path: '/settings', icon: 'fa-cog', label: 'Configurações' },
];

export const statCards: StatData[] = [
  {
    id: '1',
    icon: 'fa-eye',
    color: 'blue',
    value: '1,523',
    title: 'Acessos hoje',
  },
  {
    id: '2',
    icon: 'fa-shopping-cart',
    color: 'green',
    value: '87',
    title: 'Pedidos hoje',
  },
  {
    id: '3',
    icon: 'fa-box',
    color: 'orange',
    value: '42',
    title: 'Produtos ativos',
  },
  {
    id: '4',
    icon: 'fa-money-bill-wave',
    color: 'purple',
    value: 'R$ 2.547',
    title: 'Faturamento do dia',
  },
];

export const recentOrders: Order[] = [
  {
    id: '#001234',
    customer: 'João Silva',
    items: 3,
    total: 'R$ 82,90',
    status: 'EmTransporte',
    date: '20/04/2025 - 19:42',
  },
  {
    id: '#001233',
    customer: 'Maria Oliveira',
    items: 2,
    total: 'R$ 65,50',
    status: 'PagamentoPendente',
    date: '20/04/2025 - 19:30',
  },
  {
    id: '#001232',
    customer: 'Pedro Santos',
    items: 5,
    total: 'R$ 124,70',
    status: 'Concluido',
    date: '20/04/2025 - 19:15',
  },
  {
    id: '#001231',
    customer: 'Ana Costa',
    items: 1,
    total: 'R$ 35,90',
    status: 'Cancelado',
    date: '20/04/2025 - 18:55',
  },
];

export const popularProducts: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    price: 'R$ 42,90',
    discountPrice: 'R$ 39,90',
    description: 'Pizza com molho de tomate, mussarela e manjericão.',
    category: 'Pizzas Tradicionais',
    image: '/api/placeholder/200/140',
  },
  {
    id: '2',
    name: 'Pizza Pepperoni',
    price: 'R$ 46,90',
    discountPrice: 'R$ 43,90',
    description: 'Pizza com molho de tomate, mussarela e pepperoni.',
    category: 'Pizzas Especiais',
    image: '/api/placeholder/200/140',
  },
  {
    id: '3',
    name: 'Refrigerante 2L',
    price: 'R$ 12,00',
    discountPrice: "",
    description: 'Refrigerante de 2 litros.',
    category: 'Bebidas',
    image: '/api/placeholder/200/140',
  },
  {
    id: '4',
    name: 'Pizza 4 Queijos',
    price: 'R$ 48,90',
    discountPrice: 'R$ 45,90',
    description: 'Pizza com quatro tipos de queijo.',
    category: 'Pizzas Tradicionais',
    image: '/api/placeholder/200/140',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    price: 'R$ 42,90',
    discountPrice: 'R$ 39,90',
    description: 'Pizza com molho de tomate, mussarela e manjericão.',
    category: 'Pizzas Tradicionais',
    image: '/api/placeholder/200/140',
    isActive: true,
  },
  {
    id: '2',
    name: 'Pizza Pepperoni',
    price: 'R$ 46,90',
    discountPrice: 'R$ 43,90',
    description: 'Pizza com molho de tomate, mussarela e pepperoni.',
    category: 'Pizzas Especiais',
    image: '/api/placeholder/200/140',
    isActive: true,
  },
  {
    id: '3',
    name: 'Refrigerante 2L',
    price: 'R$ 12,00',
    discountPrice: "",
    description: 'Refrigerante de 2 litros.',
    category: 'Bebidas',
    image: '/api/placeholder/200/140',
    isActive: true,
  },
  {
    id: '4',
    name: 'Pizza 4 Queijos',
    price: 'R$ 48,90',
    discountPrice: 'R$ 45,90',
    description: 'Pizza com quatro tipos de queijo.',
    category: 'Pizzas Tradicionais',
    image: '/api/placeholder/200/140',
    isActive: true,
  },
];

import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Pizzas Tradicionais',
    image: '/api/placeholder/200/120',
    description: 'As pizzas mais clássicas e adoradas.',
    products: 2, 
    order: 1,
    isActive: true,
  },
  {
    id: '2',
    name: 'Pizzas Especiais',
    image: '/api/placeholder/200/120',
    description: 'Sabores exclusivos para quem quer algo diferente.',
    products: 1,
    order: 2,
    isActive: true,
  },
  {
    id: '3',
    name: 'Bebidas',
    image: '/api/placeholder/200/120',
    description: 'Refrigerantes e outras bebidas para acompanhar.',
    products: 1, 
    order: 3,
    isActive: false,
  },
];


export const basicData: BasicData = {
  accessToday: 1524,
  ordersToday: 83,
  activeProducts: 23,
  dailyBilling: 2547,
};