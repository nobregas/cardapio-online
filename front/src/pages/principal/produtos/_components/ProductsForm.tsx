import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adicionais, categories } from "../../../../data/mockData";
import { Adicional } from "../../../../types";
import SwitchButton from "../../../../components/ui/SwitchButton";

const ProductsForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscountPrice, setProductDiscountPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productIsActive, setProductIsActive] = useState(true);

  const [selectedAddicionals, setSelectedAddtionals] = useState<
    Adicional[] | null
  >(null);
  const [newAdditionalName, setNewAdditionalName] = useState("");
  const [newAdditionalPrice, setNewAdditionalPrice] = useState("");

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirmation(false);
    navigate("/produtos");
  };

  const abortCancel = () => {
    setShowCancelConfirmation(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAdditional = (id: string) => {
    setSelectedAddtionals(null);
    console.log(id);
  };

  const removeAdditional = (id: string) => {
    setSelectedAddtionals(null);
    console.log(id);
  };

  const addCustomAdditional = () => {
    console.log("addCustomAdditional");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    alert("Produto criado com sucesso");
    navigate("/produtos");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {showCancelConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={abortCancel}
          ></div>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full z-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Deseja realmente cancelar?
            </h3>
            <p className="text-gray-600 mb-6">
              Todas as informações preenchidas serão perdidas.
            </p>
            <div className="flex justify-center gap-13">
              <button
                onClick={abortCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Voltar
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Nome do produto*
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="Ex: Pizza Margherita"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Categoria*
            </label>
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <a
                href="#"
                className="flex items-center mt-1 text-orange-500 hover:text-orange-800 font-medium"
              >
                <i className="fas fa-plus-circle mr-1"></i> Criar nova categoria
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Preço (R$)*
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="0,00"
              min="0"
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Preço promocional (R$)
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="0,00"
              min="0"
              step="0.01"
              value={productDiscountPrice}
              onChange={(e) => setProductDiscountPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 min-h-24 resize-y"
            placeholder="Ex: Molho de tomate, mussarela, manjericão fresco e azeite"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Imagem do produto
            </label>
            <div className="relative flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded hover:border-orange-500 cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageChange}
              />
              <i className="fas fa-cloud-upload-alt text-2xl text-gray-500 mb-2"></i>
              <span className="font-medium text-gray-700">
                Clique ou arraste uma imagem
              </span>
              <span className="text-sm text-gray-500">
                PNG, JPG ou JPEG (Máx. 2MB)
              </span>
            </div>

            {productImage && (
              <div className="mt-4 w-full max-w-xs h-48 rounded overflow-hidden">
                <img
                  src={productImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Status do Produto
            </label>
            <div className="flex items-center gap-3 mt-2">
              <SwitchButton
                checked={productIsActive}
                onChange={(value) => setProductIsActive(value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Adicionais Disponíveis
            </label>
            <div className="border border-gray-300 rounded max-h-60 overflow-y-auto">
              {adicionais.map((additional) => (
                <div
                  key={additional.id}
                  className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-sm">{additional.name}</p>
                    <p className="text-xs text-gray-500">
                      R$ {additional.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-orange-500 hover:text-orange-700 font-medium"
                    onClick={() => addAdditional(additional.id)}
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex gap-3 mb-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  placeholder="Nome do adicional"
                  value={newAdditionalName}
                  onChange={(e) => setNewAdditionalName(e.target.value)}
                />
                <input
                  type="number"
                  className="w-32 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  placeholder="Preço"
                  min="0"
                  step="0.01"
                  value={newAdditionalPrice}
                  onChange={(e) => setNewAdditionalPrice(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="text-orange-500 hover:text-orange-700 font-medium flex items-center"
                onClick={addCustomAdditional}
              >
                <i className="fas fa-plus mr-1"></i> Adicionar novo
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Adicionais Selecionados
            </label>
            <div className="border border-gray-300 rounded max-h-60 overflow-y-auto">
              {selectedAddicionals?.length === 0 ? (
                <div className="p-3 text-gray-500 italic">
                  Nenhum adicional selecionado
                </div>
              ) : (
                selectedAddicionals?.map((additional) => (
                  <div
                    key={additional.id}
                    className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{additional.name}</p>
                      <p className="text-xs text-gray-500">
                        R$ {additional.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-medium"
                      onClick={() => removeAdditional(additional.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center"
          >
            <i className="fas fa-save mr-2"></i> Salvar Produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
