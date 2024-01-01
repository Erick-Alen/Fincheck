import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  // placeholder: string;
}

export const Button = ({...props}: ButtonProps) => {
  return (
    <button
      {...props}
      className='bg-teal-900 hover:bg-teal-800 text-white disabled:bg-gray-100 disabled:text-gray-400 font-medium rounded-2xl px-6 h-12 active:bg-teal-950 transition-all'
    />
  );
}
