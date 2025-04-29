import React, { useState } from 'react'

interface SwitchButtonProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

const SwitchButton = ({ checked, onChange }: SwitchButtonProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    onChange(isChecked)
  }

  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? 'bg-gray-400' : 'bg-green-500'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  )
}

export default SwitchButton
