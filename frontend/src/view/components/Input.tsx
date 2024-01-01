import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  id?: string;
}

export const Input = ({ placeholder, name, id, ...props }: InputProps) => {
  const inputId = id ?? name
  return (
    <div className='relative'>
      <input
        {...props}
        name={name}
        id={inputId}
        className='w-full bg-white rounded-lg border border-gray-500 text-gray-800 px-3 h-[52px] pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all'
        placeholder=' '
      />
      <label
        id={inputId}
        htmlFor={name}
        className='absolute left-[13px] text-xs top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all'
      >
        {placeholder}
      </label>
    </div>
  );
};
