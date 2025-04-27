import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  category,
  image,
}) => {
  return (
    <div key={id} className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div
        className="h-36 w-full bg-gray-200 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-4">
        <div className="font-semibold text-gray-800 mb-1">{name}</div>
        <div className="text-orange-500 font-medium mb-2">{price}</div>
        <div className="text-xs text-gray-500">{category}</div>

        <div className="flex justify-between mt-3">
          <Link
            to={`/produtos/editar/${id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-pen"></i>
          </Link>
          <button className="text-red-500 hover:text-red-700">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
