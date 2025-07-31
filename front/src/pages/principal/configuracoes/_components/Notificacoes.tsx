import { useState } from "react";
import SwitchButton from "../../../../components/ui/SwitchButton";

const Notificacoes = () => {
  // Estados para notificações de pedidos
  const [notificacoesPedido, setNotificacoesPedido] = useState({
    novoPedido: true,
    pedidoCancelado: true,
    falhaPagamento: true,
  });

  // Estados para os canais de notificação (onde receber)
  const [canaisNotificacao, setCanaisNotificacao] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    pushNavegador: true,
  });

  // Estados para os contatos que receberão as notificações
  const [contatos, setContatos] = useState({
    emails: "admin@restaurante.com",
    telefones: "+5583999999999",
  });

  // Estado para resumos diários
  const [resumoDiario, setResumoDiario] = useState({
    ativado: true,
    horario: "23:00",
  });

  // (CORRIGIDO) Função genérica para atualizar chaves em um objeto de estado.
  const handleStateChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T,
    value: boolean
  ) => {
    setter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Salvando configurações de notificação:", {
      notificacoesPedido,
      canaisNotificacao,
      contatos,
      resumoDiario,
    });
    alert("Configurações de notificação salvas com sucesso!");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-8xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">Configurações de Notificação</h3>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-save"></i> Salvar Alterações
        </button>
      </div>

      {/* 1. Notificações de Pedidos */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">
          1. Notificações de Pedidos
        </h4>
        <p className="text-gray-600 text-sm mb-5">
          Selecione quais eventos de pedido devem gerar uma notificação.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-green-500">🎉</span>
                <div>
                  <span className="font-medium">Novo Pedido</span>
                  <p className="text-sm text-gray-600">
                    Notificar quando um novo pedido for recebido.
                  </p>
                </div>
              </div>
              <SwitchButton
                checked={notificacoesPedido.novoPedido}
                onChange={(checked) =>
                  handleStateChange(
                    setNotificacoesPedido,
                    "novoPedido",
                    checked
                  )
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-red-500">❌</span>
                <div>
                  <span className="font-medium">Pedido Cancelado</span>
                  <p className="text-sm text-gray-600">
                    Notificar quando um pedido for cancelado pelo cliente.
                  </p>
                </div>
              </div>
              <SwitchButton
                checked={notificacoesPedido.pedidoCancelado}
                onChange={(checked) =>
                  handleStateChange(
                    setNotificacoesPedido,
                    "pedidoCancelado",
                    checked
                  )
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-yellow-500">💳</span>
                <div>
                  <span className="font-medium">Falha de Pagamento</span>
                  <p className="text-sm text-gray-600">
                    Notificar sobre falhas no pagamento de um pedido.
                  </p>
                </div>
              </div>
              <SwitchButton
                checked={notificacoesPedido.falhaPagamento}
                onChange={(checked) =>
                  handleStateChange(
                    setNotificacoesPedido,
                    "falhaPagamento",
                    checked
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Canais de Notificação */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">2. Canais de Notificação</h4>
        <p className="text-gray-600 text-sm mb-5">
          Escolha como você e sua equipe desejam receber as notificações.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="space-y-4 mb-6">
            {/* Opções de canais */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <span className="font-medium">E-mail</span>
              </div>
              <SwitchButton
                checked={canaisNotificacao.email}
                onChange={(checked) =>
                  handleStateChange(setCanaisNotificacao, "email", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>📱</span>
                <span className="font-medium">SMS</span>
              </div>
              <SwitchButton
                checked={canaisNotificacao.sms}
                onChange={(checked) =>
                  handleStateChange(setCanaisNotificacao, "sms", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>💬</span>
                <span className="font-medium">WhatsApp</span>
              </div>
              <SwitchButton
                checked={canaisNotificacao.whatsapp}
                onChange={(checked) =>
                  handleStateChange(setCanaisNotificacao, "whatsapp", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>🌐</span>
                <span className="font-medium">Push (Navegador)</span>
              </div>
              <SwitchButton
                checked={canaisNotificacao.pushNavegador}
                onChange={(checked) =>
                  handleStateChange(
                    setCanaisNotificacao,
                    "pushNavegador",
                    checked
                  )
                }
              />
            </div>
          </div>

          {/* Campos de Contato */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {canaisNotificacao.email && (
              <div>
                <label className="block text-sm font-medium mb-2 ">
                  E-mails para Notificação
                </label>
                <input
                  type="text"
                  value={contatos.emails}
                  onChange={(e) =>
                    setContatos((prev) => ({ ...prev, emails: e.target.value }))
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  placeholder="admin@email.com, gerente@email.com"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Separe múltiplos e-mails por vírgula.
                </p>
              </div>
            )}
            {(canaisNotificacao.sms || canaisNotificacao.whatsapp) && (
              <div>
                <label className="block text-sm font-medium mb-2 ">
                  Telefones para Notificação
                </label>
                <input
                  type="text"
                  value={contatos.telefones}
                  onChange={(e) =>
                    setContatos((prev) => ({
                      ...prev,
                      telefones: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  placeholder="+5583999998888"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Para SMS ou WhatsApp. Separe múltiplos números por vírgula.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Resumos e Relatórios */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-2">3. Resumos e Relatórios</h4>
        <p className="text-gray-600 text-sm mb-5">
          Receba relatórios periódicos para acompanhar o desempenho.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium ">Resumo Diário de Vendas</span>
              <p className="text-sm text-gray-600">
                Receber um e-mail com o resumo do dia.
              </p>
            </div>
            <SwitchButton
              checked={resumoDiario.ativado}
              onChange={(checked) =>
                setResumoDiario((prev) => ({ ...prev, ativado: checked }))
              }
            />
          </div>

          {resumoDiario.ativado && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <label className="block text-sm font-medium mb-2 ">
                Horário de Envio
              </label>
              <input
                type="time"
                value={resumoDiario.horario}
                onChange={(e) =>
                  setResumoDiario((prev) => ({
                    ...prev,
                    horario: e.target.value,
                  }))
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notificacoes;
