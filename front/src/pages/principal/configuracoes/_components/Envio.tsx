import { useState } from "react";
import SwitchButton from "../../../../components/ui/SwitchButton";

const Envio = () => {
  // Estados para opções de retirada/entrega
  const [deliveryOption, setDeliveryOption] = useState(true);
  const [pickupOption, setPickupOption] = useState(true);
  const [tableService, setTableService] = useState(false);

  // Estados para configurações de entrega
  const [minOrderValue, setMinOrderValue] = useState(20.0);
  const [minOrderValueEnabled, setMinOrderValueEnabled] = useState(true);
  const [minOrderTotal, setMinOrderTotal] = useState(15.0);
  const [deliveryFeeEnabled, setDeliveryFeeEnabled] = useState(true);
  const [deliveryFeeAmount, setDeliveryFeeAmount] = useState(5.0);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("60");

  // Estados para zonas de entrega
  const [deliveryZones, setDeliveryZones] = useState([
    { id: 1, name: "Centro", distance: "0-5km", fee: 5.0, active: true },
    { id: 2, name: "Zona Norte", distance: "5-10km", fee: 8.0, active: false },
  ]);

  // Estados para horários de funcionamento
  const [workingHours, setWorkingHours] = useState({
    monday: { open: "08:00", close: "22:00", active: true },
    tuesday: { open: "08:00", close: "22:00", active: true },
    wednesday: { open: "08:00", close: "22:00", active: true },
    thursday: { open: "08:00", close: "22:00", active: true },
    friday: { open: "08:00", close: "22:00", active: true },
    saturday: { open: "08:00", close: "22:00", active: true },
    sunday: { open: "08:00", close: "22:00", active: false },
  });

  // Estados para configurações adicionais
  const [preparationTime, setPreparationTime] = useState(30);
  const [deliveryRadius, setDeliveryRadius] = useState(10);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleSave = () => {
    console.log("Salvando configurações de entrega:", {
      deliveryOption,
      pickupOption,
      tableService,
      minOrderValue,
      minOrderValueEnabled,
      minOrderTotal,
      deliveryFeeEnabled,
      deliveryFeeAmount,
      maxDeliveryTime,
      deliveryZones,
      workingHours,
      preparationTime,
      deliveryRadius,
      specialInstructions,
    });
    alert("Configurações de entrega salvas com sucesso!");
  };

  const addDeliveryZone = () => {
    const newId =
      deliveryZones.length > 0
        ? Math.max(...deliveryZones.map((zone) => zone.id)) + 1
        : 1;
    setDeliveryZones([
      ...deliveryZones,
      {
        id: newId,
        name: "",
        distance: "",
        fee: 0,
        active: false,
      },
    ]);
  };

  // 2. Função ajustada para aceitar boolean, string ou number
  const updateDeliveryZone = (
    id: number,
    field: string,
    value: string | boolean | number
  ) => {
    setDeliveryZones(
      deliveryZones.map((zone) =>
        zone.id === id ? { ...zone, [field]: value } : zone
      )
    );
  };

  const removeDeliveryZone = (id: number) => {
    setDeliveryZones(deliveryZones.filter((zone) => zone.id !== id));
  };

  // 2. Função ajustada para aceitar boolean ou string
  const updateWorkingHours = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [field]: value },
    }));
  };

  const dayNames = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-8xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">Configurações de Entrega</h3>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-save"></i> Salvar Alterações
        </button>
      </div>

      {/* 1. Opções de Retirada/Entrega */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">
          1. Opções de Retirada/Entrega
        </h4>
        <p className="text-gray-600 text-sm mb-5">
          Configure as modalidades de atendimento disponíveis
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-orange-500">🏍️</span>
                <div>
                  <span className="font-medium">Delivery (Entrega)</span>
                  <p className="text-sm text-gray-600">
                    Entrega no endereço do cliente
                  </p>
                </div>
              </div>
              <SwitchButton
                checked={deliveryOption}
                onChange={setDeliveryOption}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-green-500">🛍️</span>
                <div>
                  <span className="font-medium">Retirada no Local</span>
                  <p className="text-sm text-gray-600">
                    Cliente retira no estabelecimento
                  </p>
                </div>
              </div>
              <SwitchButton checked={pickupOption} onChange={setPickupOption} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-blue-500">🍽️</span>
                <div>
                  <span className="font-medium">Atendimento na Mesa</span>
                  <p className="text-sm text-gray-600">
                    Atendimento presencial no restaurante
                  </p>
                </div>
              </div>
              <SwitchButton checked={tableService} onChange={setTableService} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Configurações Gerais de Pedidos */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">
          2. Configurações Gerais de Pedidos
        </h4>
        <p className="text-gray-600 text-sm mb-5">
          Configure os valores mínimos e regras para todos os tipos de pedidos
        </p>

        {/* Valor Mínimo do Pedido */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-medium text-blue-800">
                Valor Mínimo do Pedido
              </span>
              <p className="text-sm text-blue-600">
                Valor mínimo que o cliente deve pedir (para todos os tipos de
                atendimento)
              </p>
            </div>
            <SwitchButton
              checked={minOrderValueEnabled}
              onChange={setMinOrderValueEnabled}
            />
          </div>

          {minOrderValueEnabled && (
            <div className="ml-4">
              <label className="block text-sm font-medium mb-2 text-blue-800">
                Valor mínimo do pedido
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                  Obrigatório
                </span>
              </label>
              <div className="relative max-w-xs">
                <span className="absolute left-3 top-2 text-gray-500">R$</span>
                <input
                  type="number"
                  value={minOrderTotal}
                  onChange={(e) =>
                    setMinOrderTotal(parseFloat(e.target.value) || 0)
                  }
                  step="0.01"
                  min="0"
                  className="w-full pl-8 p-2 border border-blue-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="15.00"
                />
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Pedidos abaixo deste valor não serão aceitos
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tempo de Preparo (minutos)
            </label>
            <input
              type="number"
              value={preparationTime}
              onChange={(e) =>
                setPreparationTime(parseInt(e.target.value) || 0)
              }
              min="5"
              max="120"
              className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Configurações de Entrega */}
      {deliveryOption && (
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold mb-2">
            3. Configurações de Entrega
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Valor Mínimo para Entrega Gratuita
                <span className="bg-yellow-500 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
                  Opcional
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">R$</span>
                <input
                  type="number"
                  value={minOrderValue}
                  onChange={(e) =>
                    setMinOrderValue(parseFloat(e.target.value) || 0)
                  }
                  step="0.01"
                  min="0"
                  className="w-full pl-8 p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Acima deste valor, a entrega é gratuita
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tempo Máximo de Entrega (minutos)
              </label>
              <input
                type="number"
                value={maxDeliveryTime}
                onChange={(e) => setMaxDeliveryTime(e.target.value)}
                min="15"
                max="180"
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Raio de Entrega (km)
              </label>
              <input
                type="number"
                value={deliveryRadius}
                onChange={(e) =>
                  setDeliveryRadius(parseInt(e.target.value) || 0)
                }
                min="1"
                max="50"
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Taxa de Entrega */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Habilitar taxas de entrega</span>
              <SwitchButton
                checked={deliveryFeeEnabled}
                onChange={setDeliveryFeeEnabled}
              />
            </div>

            {deliveryFeeEnabled && (
              <div className="ml-4">
                <label className="block text-sm font-medium mb-2">
                  Taxa padrão de entrega
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3 top-2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    value={deliveryFeeAmount}
                    onChange={(e) =>
                      setDeliveryFeeAmount(parseFloat(e.target.value) || 0)
                    }
                    step="0.01"
                    min="0"
                    className="w-full pl-8 p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Zonas de Entrega */}
      {deliveryOption && deliveryFeeEnabled && (
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">4. Zonas de Entrega</h4>
            <button
              onClick={addDeliveryZone}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
            >
              ➕ Adicionar Zona
            </button>
          </div>

          <div className="space-y-3">
            {deliveryZones.map((zone) => (
              <div key={zone.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome da Zona
                    </label>
                    <input
                      type="text"
                      value={zone.name}
                      onChange={(e) =>
                        updateDeliveryZone(zone.id, "name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Ex: Centro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Distância
                    </label>
                    <input
                      type="text"
                      value={zone.distance}
                      onChange={(e) =>
                        updateDeliveryZone(zone.id, "distance", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Ex: 0-5km"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Taxa (R$)
                    </label>
                    <input
                      type="number"
                      value={zone.fee}
                      onChange={(e) =>
                        updateDeliveryZone(
                          zone.id,
                          "fee",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      step="0.01"
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {/* 3. Passando o valor booleano diretamente */}
                    <SwitchButton
                      checked={zone.active}
                      onChange={(value) =>
                        updateDeliveryZone(zone.id, "active", value)
                      }
                    />
                    <button
                      onClick={() => removeDeliveryZone(zone.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Horários de Funcionamento */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-4">
          5. Horários de Funcionamento
        </h4>

        <div className="space-y-3">
          {Object.entries(workingHours).map(([day, hours]) => (
            <div key={day} className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="flex items-center gap-3">
                  {/* 3. Passando o valor booleano diretamente */}
                  <SwitchButton
                    checked={hours.active}
                    onChange={(value) =>
                      updateWorkingHours(day, "active", value)
                    }
                  />
                  <span className="font-medium">
                    {dayNames[day as keyof typeof dayNames]}
                  </span>
                </div>

                {hours.active && (
                  <>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Abertura
                      </label>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) =>
                          updateWorkingHours(day, "open", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Fechamento
                      </label>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) =>
                          updateWorkingHours(day, "close", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </>
                )}

                {!hours.active && (
                  <div className="md:col-span-2">
                    <span className="text-gray-500 text-sm">Fechado</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Instruções Especiais */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-2">6. Instruções Especiais</h4>
        <div>
          <label className="block text-sm font-medium mb-2">
            Instruções adicionais para entrega
            <span className="bg-yellow-500 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
              Opcional
            </span>
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            rows={3}
            placeholder="Instruções especiais sobre entrega, endereços difíceis de encontrar, etc."
            className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Envio;
