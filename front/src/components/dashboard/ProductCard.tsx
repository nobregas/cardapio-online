import React from "react";
import { Link } from "react-router-dom";
import TrashIcon from "../shared/TrashIcon";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  discountPrice: string;
  category: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPrice,
  category,
  image,
}) => {
  const hasDiscount = discountPrice && discountPrice !== price;

  const handleDelete = () => {
    // Implementar a lógica de exclusão do produto aqui
    console.log(`Produto ${id} excluído`);
  }

  return (
    <div key={id} className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div
        className="h-36 w-full bg-gray-200 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-4">
        <div className="font-semibold text-gray-800 mb-1">{name}</div>
        <div className="flex items-center mb-2">
          {hasDiscount ? (
            <>
              <div className="text-orange-500 font-medium">{discountPrice}</div>
              <div className="text-gray-400 line-through text-sm ml-2">{price}</div>
            </>
          ) : (
            <div className="text-orange-500 font-medium">{price}</div>
          )}
        </div>
        <div className="text-xs text-gray-500">{category}</div>
        
        <div className="flex justify-between mt-3">
          <Link
            to={`/produtos/editar/${id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-pen"></i>
          </Link>
          <TrashIcon onConfirm={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;