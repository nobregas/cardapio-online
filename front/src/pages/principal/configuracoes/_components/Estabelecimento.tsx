import { useState } from "react";

const Estabelecimento = () => {
  const [formData, setFormData] = useState({
    nome: "Pizza do Beto",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 9876-5432",
    email: "contato@pizzadobeto.com.br",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
    descricao: "A Pizza do Beto oferece as melhores pizzas artesanais da cidade, com ingredientes selecionados e massas preparadas no dia."
  });
  const [logo, setLogo] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace('store-', '')]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Salvando configurações:", {
      ...formData,
      logo: logo ? "Imagem carregada" : null
    });
  };

  const triggerFileInput = () => {
    document.getElementById('logo-upload').click();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6" id="store-panel">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">Informações do Estabelecimento</h3>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          id="save-store"
        >
          <i className="fas fa-save mr-2"></i>
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="store-name" className="text-sm font-medium mb-1">
            Nome do Estabelecimento*
          </label>
          <input
            type="text"
            id="store-name"
            className="border rounded p-2"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="store-document" className="text-sm font-medium mb-1">
            CNPJ*
          </label>
          <input
            type="text"
            id="store-document"
            className="border rounded p-2"
            value={formData.cnpj}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="store-phone" className="text-sm font-medium mb-1">
            Telefone*
          </label>
          <input
            type="tel"
            id="store-phone"
            className="border rounded p-2"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="store-email" className="text-sm font-medium mb-1">
            E-mail*
          </label>
          <input
            type="email"
            id="store-email"
            className="border rounded p-2"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium mb-1">
          Logo do Estabelecimento
        </label>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 hover:border-orange-500"
          onClick={triggerFileInput}
        >
          {logo ? (
            <div className="flex flex-col items-center">
              <img 
                src={logo} 
                alt="Logo do estabelecimento" 
                className="max-h-40 max-w-full mb-2" 
              />
              <p className="text-sm text-gray-500">Clique para alterar a imagem</p>
            </div>
          ) : (
            <>
              <i className="fas fa-cloud-upload-alt text-gray-400 text-xl mb-2"></i>
              <p className="text-gray-500">Clique ou arraste uma imagem</p>
              <p className="text-xs text-gray-400">PNG, JPG ou JPEG (Máx. 2MB)</p>
            </>
          )}
          <input 
            type="file" 
            id="logo-upload" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="store-address" className="text-sm font-medium mb-1">
          Endereço*
        </label>
        <input
          type="text"
          id="store-address"
          className="border rounded p-2 w-full"
          value={formData.endereco}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="store-city" className="text-sm font-medium mb-1">
            Cidade*
          </label>
          <input
            type="text"
            id="store-city"
            className="border rounded p-2"
            value={formData.cidade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="store-state" className="text-sm font-medium mb-1">
            Estado*
          </label>
          <input
            type="text"
            id="store-state"
            className="border rounded p-2"
            value={formData.estado}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="store-zip" className="text-sm font-medium mb-1">
            CEP*
          </label>
          <input
            type="text"
            id="store-zip"
            className="border rounded p-2"
            value={formData.cep}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="store-description" className="text-sm font-medium mb-1">
          Descrição do Estabelecimento
        </label>
        <textarea
          id="store-description"
          className="border rounded p-2 w-full h-32"
          value={formData.descricao}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Estabelecimento;