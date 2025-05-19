export const truncate = (str: string, maxLength: number) =>
  str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

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