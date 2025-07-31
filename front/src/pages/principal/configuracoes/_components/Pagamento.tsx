import { useEffect, useState } from "react";
import SwitchButton from "../../../../components/ui/SwitchButton";
import PaymentMethodCard from "../../../../components/ui/PaymentMethodCard";
import { useRestaurant } from "../../../../hooks/useRestaurant";

const Pagamento = () => {
  const {
    updatePaymentSettings,
    getRestaurantByOwnerId,
    restaurant,
    loading,
    error,
  } = useRestaurant();
  // Estados para controle dos toggles principais
  const [onlinePaymentActive, setOnlinePaymentActive] = useState(false);
  const [deliveryPaymentActive, setDeliveryPaymentActive] = useState(false);

  // Estados para métodos de pagamento online
  const [onlineCredit, setOnlineCredit] = useState(false);
  const [onlineDebit, setOnlineDebit] = useState(false);
  const [onlinePix, setOnlinePix] = useState(false);

  // Estados para métodos de pagamento na entrega
  const [deliveryCash, setDeliveryCash] = useState(false);
  const [deliveryCredit, setDeliveryCredit] = useState(false);
  const [deliveryDebit, setDeliveryDebit] = useState(false);
  const [deliveryPix, setDeliveryPix] = useState(false);

  const [changeOption, setChangeOption] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [pixName, setPixName] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");

  const [loadingSave, setLoadingSave] = useState(false);

  // Carrega o restaurante
  useEffect(() => {
    if (!restaurant && !loading) {
      getRestaurantByOwnerId();
    }
  }, [restaurant, getRestaurantByOwnerId, loading]);

  // Carrega as configurações de pagamento
  useEffect(() => {
    if (restaurant && restaurant.paymentSettings) {
      const { online, onDelivery, pixDetails, additionalInstructions } =
        restaurant.paymentSettings;

      setOnlinePaymentActive(online.active);
      setOnlineCredit(online.methods.creditCard);
      setOnlineDebit(online.methods.debitCard);
      setOnlinePix(online.methods.pix);

      setDeliveryPaymentActive(onDelivery.active);
      setDeliveryCash(onDelivery.methods.cash);
      setDeliveryCredit(onDelivery.methods.creditCard);
      setDeliveryDebit(onDelivery.methods.debitCard);
      setDeliveryPix(onDelivery.methods.pix);

      setChangeOption(onDelivery.needsChange);

      setPixKey(pixDetails?.key || "");
      setPixName(pixDetails?.keyHolderName || "");
      setAdditionalMessage(additionalInstructions || "");
    }
  }, [restaurant]);

  const handleSave = async () => {
    if (loadingSave) return;

    setLoadingSave(true);

    const paymentData = {
      online: {
        active: onlinePaymentActive,
        methods: {
          creditCard: onlineCredit,
          debitCard: onlineDebit,
          pix: onlinePix,
        },
      },
      onDelivery: {
        active: deliveryPaymentActive,
        methods: {
          cash: deliveryCash,
          creditCard: deliveryCredit,
          debitCard: deliveryDebit,
          pix: deliveryPix,
        },
        needsChange: changeOption,
      },
      pixDetails: {
        key: pixKey,
        keyHolderName: pixName,
      },
      additionalInstructions: additionalMessage,
    };

    const result = await updatePaymentSettings(paymentData);

    setLoadingSave(false);

    if (result) {
      alert("Configurações salvas com sucesso!");
    } else {
      alert(`Falha ao salvar: ${error}`);
    }
  };

  if (loading && !restaurant) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lg text-gray-600">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-8xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">Configurações de Pagamento</h3>
        <button
          onClick={handleSave}
          disabled={loadingSave}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-save"></i>
          {loadingSave ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>

      {/* 1. Pagamento Online */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">1. Pagamento Online</h4>
        <p className="text-gray-600 text-sm mb-5">
          Configure se deseja aceitar pagamentos processados via API (Pix e
          cartões online)
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Ativar pagamento online?</span>
            <SwitchButton
              checked={onlinePaymentActive}
              onChange={setOnlinePaymentActive}
            />
          </div>

          {onlinePaymentActive && (
            <div className="ml-5 mt-4 p-4 bg-gray-100 rounded-lg">
              <label className="block text-sm font-medium mb-4">
                Métodos de pagamento online permitidos
              </label>

              <div className="space-y-3">
                <PaymentMethodCard
                  icon="fas fa-credit-card"
                  title="Cartão de Crédito"
                  description="Visa, Mastercard, Elo, American Express"
                  checked={onlineCredit}
                  onChange={setOnlineCredit}
                />
                <PaymentMethodCard
                  icon="fas fa-credit-card"
                  title="Cartão de Débito"
                  description="Débito online"
                  checked={onlineDebit}
                  onChange={setOnlineDebit}
                />
                <PaymentMethodCard
                  icon="fas fa-qrcode"
                  title="Pix Online"
                  description="Pagamento instantâneo via API"
                  checked={onlinePix}
                  onChange={setOnlinePix}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Pagamento na Entrega */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">2. Pagamento na Entrega</h4>
        <p className="text-gray-600 text-sm mb-5">
          Configure os métodos de pagamento aceitos no momento da entrega
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold flex items-center">
              Aceita pagamento na entrega?
            </span>
            <SwitchButton
              checked={deliveryPaymentActive}
              onChange={setDeliveryPaymentActive}
            />
          </div>

          {deliveryPaymentActive && (
            <div className="ml-5 mt-4 p-4 bg-gray-100 rounded-lg">
              <label className="block text-sm font-medium mb-4">
                Métodos aceitos na entrega
              </label>

              <div className="space-y-3 mb-5">
                <PaymentMethodCard
                  icon="fas fa-money-bill-wave"
                  title="Dinheiro"
                  description="Pagamento em espécie"
                  checked={deliveryCash}
                  onChange={setDeliveryCash}
                />
                <PaymentMethodCard
                  icon="fas fa-credit-card"
                  title="Cartão de Crédito"
                  description="Maquininha na entrega"
                  checked={deliveryCredit}
                  onChange={setDeliveryCredit}
                />
                <PaymentMethodCard
                  icon="fas fa-credit-card"
                  title="Cartão de Débito"
                  description="Maquininha na entrega"
                  checked={deliveryDebit}
                  onChange={setDeliveryDebit}
                />
                <PaymentMethodCard
                  icon="fas fa-qrcode"
                  title="Pix na Entrega"
                  description="QR Code ou chave Pix"
                  checked={deliveryPix}
                  onChange={setDeliveryPix}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="change-option"
                  checked={changeOption}
                  onChange={(e) => setChangeOption(e.target.checked)}
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="change-option" className="flex items-center">
                  Solicita troco?
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Se habilitado, o cliente poderá informar o valor para troco
                quando escolher pagamento em dinheiro
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Configurações de Pix */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-orange-700 font-semibold mb-3">
            <i className="fas fa-qrcode"></i>
            3. Configurações de Pix
          </div>
          <p className="text-gray-600 text-sm mb-5">
            Configurações necessárias para receber pagamentos via Pix (tanto
            online quanto na entrega)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pix-key"
                className="block text-sm font-medium mb-2"
              >
                Chave Pix
              </label>
              <input
                type="text"
                id="pix-key"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="CPF, CNPJ, telefone, email ou chave aleatória"
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="pix-name"
                className="block text-sm font-medium mb-2"
              >
                Nome do favorecido
              </label>
              <input
                type="text"
                id="pix-name"
                value={pixName}
                onChange={(e) => setPixName(e.target.value)}
                placeholder="Nome ou razão social"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mensagem Adicional */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-2">4. Instruções Adicionais</h4>
        <div>
          <label
            htmlFor="additional-message"
            className="block text-sm font-medium mb-2"
          >
            Instrução adicional
            <span className="bg-yellow-500 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
              Opcional
            </span>
          </label>
          <textarea
            id="additional-message"
            value={additionalMessage}
            onChange={(e) => setAdditionalMessage(e.target.value)}
            rows={3}
            placeholder="Mensagem adicional sobre pagamentos que será exibida no checkout (opcional)"
            className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
