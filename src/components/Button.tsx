import React from 'react'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  disabled = false,
  className,
  children,
  ...props
}: React.PropsWithChildren<IButton>) => (
  <button
    {...props}
    className={`p-2 text-lg font-bold uppercase bg-blue-light drop-shadow-md ${
      disabled ? 'opacity-50' : ''
    } ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
