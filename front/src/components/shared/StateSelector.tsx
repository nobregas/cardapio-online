// StateSelector.tsx
import { estados } from "../../data/mockData";
import { motion } from "framer-motion";

interface StateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const StateSelector = ({
  value,
  onChange,
  className,
  ...props
}: StateSelectorProps) => {
  return (
    <motion.select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      {...props}
    >
      <option value="">Selecione o Estado...</option>
      {estados.map((estado) => (
        <option key={estado.sigla} value={estado.sigla}>
          {estado.nome}
        </option>
      ))}
    </motion.select>
  );
};

export default StateSelector;
