export const truncate = (str: string, maxLength: number) =>
  str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

export const orderStatusConfigs = {
  Concluido: {
    value: "Concluido",
    displayText: "Concluído",
    className: "bg-green-100 text-green-600",
  },
  PagamentoPendente: {
    value: "PagamentoPendente",
    displayText: "Pendente",
    className: "bg-yellow-100 text-yellow-600",
  },
  Cancelado: {
    value: "Cancelado",
    displayText: "Cancelado",
    className: "bg-red-100 text-red-600",
  },
  PagamentoConcluido: {
    value: "PagamentoConcluido",
    displayText: "Pagamento Concluído",
    className: "bg-green-100 text-green-700",
  },
  EmPreparo: {
    value: "EmPreparo",
    displayText: "Em Preparo",
    className: "bg-blue-100 text-blue-600",
  },
  ProntoParaRetirada: {
    value: "ProntoParaRetirada",
    displayText: "Pronto Para Retirada",
    className: "bg-orange-100 text-orange-600",
  },
  EmTransporte: {
    value: "EmTransporte",
    displayText: "Em Transporte",
    className: "bg-purple-100 text-purple-600",
  },
  Entregue: {
    value: "Entregue",
    displayText: "Entregue",
    className: "bg-teal-100 text-teal-600",
  },
};

export const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .slice(0, 14)
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length > 10) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};
