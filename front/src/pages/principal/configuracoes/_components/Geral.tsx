import { useState } from "react";
import SwitchButton from "../../../../components/ui/SwitchButton";

const Geral = () => {
  const [menuStatus, setMenuStatus] = useState(true);
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("23:00");
  const [selectedDays, setSelectedDays] = useState(Array(7).fill(true));
  const [language, setLanguage] = useState("pt-BR");
  const [currency, setCurrency] = useState("BRL");
  const [selectedColor, setSelectedColor] = useState("orange");

  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const colors = [
    { name: "red", class: "bg-red-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "green", class: "bg-green-500" },
    { name: "blue", class: "bg-blue-500" },
    { name: "purple", class: "bg-purple-500" },
  ];

  const handleDayChange = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };

  const handleSave = () => {
    console.log("Salvando configurações:", {
      menuStatus,
      startTime,
      endTime,
      selectedDays,
      language,
      currency,
      selectedColor,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">Configurações Gerais</h3>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          <i className="fas fa-save mr-2"></i>
          Salvar Alterações
        </button>
      </div>

      {/* Status do Cardápio */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Status do Cardápio
        </label>
        <div className="flex items-center">
          <SwitchButton checked={menuStatus} onChange={setMenuStatus} />
          <span className="ml-3">Cardápio online ativo</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Quando desativado, os clientes não poderão fazer pedidos online.
        </p>
      </div>

      {/* Horários */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label
            htmlFor="operation-start"
            className="block text-sm font-medium mb-2"
          >
            Horário de Início
          </label>
          <input
            type="text"
            id="operation-start"
            value={startTime}
            onChange={(e) => {
              const value = e.target.value;
              // Valida formato HH:MM
              if (
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                value === ""
              ) {
                setStartTime(value);
              }
            }}
            placeholder="HH:MM"
            pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
            className="w-full p-2 border rounded"
            title="Formato 24 horas (ex: 18:00)"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="operation-end"
            className="block text-sm font-medium mb-2"
          >
            Horário de Encerramento
          </label>
          <input
            type="text"
            id="operation-end"
            value={endTime}
            onChange={(e) => {
              const value = e.target.value;
              if (
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                value === ""
              ) {
                setEndTime(value);
              }
            }}
            placeholder="HH:MM"
            pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
            className="w-full p-2 border rounded"
            title="Formato 24 horas (ex: 23:00)"
          />
        </div>
      </div>

      {/* Dias de Funcionamento */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Dias de Funcionamento
        </label>
        <div className="flex flex-wrap gap-4">
          {daysOfWeek.map((day, index) => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={`day-${index + 1}`}
                checked={selectedDays[index]}
                onChange={() => handleDayChange(index)}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`day-${index + 1}`} className="ml-2">
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Idioma e Moeda */}
      <div className="mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Idioma do Sistema
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border rounded max-w-[300px] w-full"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (United States)</option>
              <option value="es-ES">Español (España)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Moeda</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 border rounded max-w-[300px] w-full"
            >
              <option value="BRL">Real Brasileiro (R$)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cores */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Tema e Cor Principal
        </label>
        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-8 h-8 rounded-full ${color.class} ${
                selectedColor === color.name
                  ? "ring-2 ring-offset-2 ring-blue-500"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Geral;
