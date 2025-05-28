import SwitchButton from './SwitchButton'

interface PaymentMethodCardProps {
  icon: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}

const PaymentMethodCard = ({ icon, title, description, checked, onChange, required = false }: PaymentMethodCardProps) => {
  return (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-white hover:border-orange-500 hover:shadow-md transition-all">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 text-orange-500 text-lg">
        <i className={icon}></i>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-800 mb-1 flex items-center">
          {title}
          {required && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
              Obrigatório
            </span>
          )}
        </div>
        <div className="text-gray-600 text-sm">{description}</div>
      </div>
      <SwitchButton checked={checked} onChange={onChange} />
    </div>
  )
}

export default PaymentMethodCard

