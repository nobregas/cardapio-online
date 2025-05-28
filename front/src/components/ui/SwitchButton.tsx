
interface SwitchButtonProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const SwitchButton = ({ checked, onChange }: SwitchButtonProps) => {
  const handleCheckboxChange = () => {
    onChange(!checked) 
  }

  return (
    <label className='flex cursor-pointer select-none items-center'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={checked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <div
          className={`box block h-8 w-14 rounded-full transition-colors ${
            checked ? 'bg-green-500' : 'bg-gray-400'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform ${
            checked ? 'translate-x-full' : ''
          }`}
        ></div>
      </div>
    </label>
  )
}

export default SwitchButton