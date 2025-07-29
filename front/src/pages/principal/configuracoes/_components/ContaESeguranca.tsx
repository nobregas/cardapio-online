import { useState } from "react";
import SwitchButton from "../../../../components/ui/SwitchButton";

const ContaSeguranca = () => {
  const [infoConta, setInfoConta] = useState({
    nomeCompleto: "João Silva",
    email: "admin@restaurante.com",
    telefone: "+5583999999999",
    cargo: "Administrador",
  });

  const [configSeguranca, setConfigSeguranca] = useState({
    autenticacaoDoisFatores: false,
    metodo2FA: "email",
    notificarLoginSuspeito: true,
  });

  const handleStateChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T,
    value: boolean | string
  ) => {
    setter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Salvando configurações de conta e segurança:", {
      infoConta,
      configSeguranca,
    });
    alert("Configurações de conta e segurança salvas com sucesso!");
  };

  const handleChangePassword = () => {
    // Lógica para abrir modal de alteração de senha
    alert("Abrindo modal para alteração de senha...");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-8xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">
          Configurações de Conta e Segurança
        </h3>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-save"></i> Salvar Alterações
        </button>
      </div>

      {/* 1. Informações da Conta */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">1. Informações da Conta</h4>
        <p className="text-gray-600 text-sm mb-5">
          Gerencie as informações básicas do seu perfil.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={infoConta.nomeCompleto}
                onChange={(e) =>
                  handleStateChange(
                    setInfoConta,
                    "nomeCompleto",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                value={infoConta.email}
                onChange={(e) =>
                  handleStateChange(setInfoConta, "email", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={infoConta.telefone}
                onChange={(e) =>
                  handleStateChange(setInfoConta, "telefone", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-500">
                Cargo
              </label>
              <input
                type="text"
                value={infoConta.cargo}
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                O cargo não pode ser alterado pelo usuário.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleChangePassword}
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              🔒 Alterar Senha
            </button>
          </div>
        </div>
      </div>

      {/* 2. Configurações de Segurança */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-semibold mb-2">
          2. Configurações de Segurança
        </h4>
        <p className="text-gray-600 text-sm mb-5">
          Configure as opções de segurança para proteger sua conta.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-red-500">🔐</span>
                <div>
                  <span className="font-medium">
                    Autenticação de Dois Fatores (2FA)
                  </span>
                  <p className="text-sm text-red-600">
                    Adicione uma camada extra de segurança ao seu login.
                  </p>
                </div>
              </div>
              <SwitchButton
                checked={configSeguranca.autenticacaoDoisFatores}
                onChange={(checked) =>
                  handleStateChange(
                    setConfigSeguranca,
                    "autenticacaoDoisFatores",
                    checked
                  )
                }
              />
            </div>

            {/* Método 2FA - só aparece quando 2FA está ativado */}
            {configSeguranca.autenticacaoDoisFatores && (
              <div className="pl-10 pt-2 pb-4 border-t border-red-200">
                <label className="block text-sm font-medium mb-3 text-red-800">
                  Como você deseja receber o código de verificação?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="2fa-email"
                      name="metodo2FA"
                      value="email"
                      checked={configSeguranca.metodo2FA === "email"}
                      onChange={(e) =>
                        handleStateChange(
                          setConfigSeguranca,
                          "metodo2FA",
                          e.target.value
                        )
                      }
                      className="text-red-500 focus:ring-red-500 cursor-pointer"
                    />
                    <label
                      htmlFor="2fa-email"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>📧</span>
                      <span className="text-sm">Via E-mail</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="2fa-telefone"
                      name="metodo2FA"
                      value="telefone"
                      checked={configSeguranca.metodo2FA === "telefone"}
                      onChange={(e) =>
                        handleStateChange(
                          setConfigSeguranca,
                          "metodo2FA",
                          e.target.value
                        )
                      }
                      className="text-red-500 focus:ring-red-500 cursor-pointer"
                    />
                    <label
                      htmlFor="2fa-telefone"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>📱</span>
                      <span className="text-sm">Via SMS (Telefone)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContaSeguranca;
