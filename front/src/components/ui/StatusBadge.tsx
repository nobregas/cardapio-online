
interface StatusBadgeProps {
  status:
    | "Concluido"
    | "PagamentoPendente"
    | "Cancelado"
    | "PagamentoConcluido"
    | "EmPreparo"
    | "ProntoParaRetirada"
    | "EmTransporte"
    | "Entregue";
}
// todo config color css
const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    Concluido: {
      color: "bg-heavy-green-10",
      textColor: "text-heavy-green-500",
      label: "Concluido",
    },
    PagamentoPendente: {
      color: "bg-light-yellow-10",
      textColor: "text-yellow-500",
      label: "Pagamento Pendente",
    },
    Cancelado: {
      color: "bg-red-10",
      textColor: "text-red-500",
      label: "Cancelado",
    },
    PagamentoConcluido: {
      color: "bg-light-green-10",
      textColor: "text-green-500",
      label: "Pagamento Concluido",
    },
    EmPreparo: {
      color: "bg-light-blue-10",
      textColor: "text-light-blue-500",
      label: "Em Preparo",
    },
    ProntoParaRetirada: {
      color: "bg-blue-10",
      textColor: "text-blue-500",
      label: "Pronto Para Retirada",
    },
    EmTransporte: {
      color: "bg-orange-10",
      textColor: "text-orange-500",
      label: "Em Transporte",
    },
    Entregue: {
      color: "bg-light-green-10",
      textColor: "text-green-500",
      label: "Entregue",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`${config.color} ${config.textColor} px-3 py-1 rounded-full text-xs font-medium`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
