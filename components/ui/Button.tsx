'use client'

import { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-full px-4 py-2.5 text-body-sm font-medium transition duration-300 disabled:opacity-50'
    const variants = {
      primary: 'btn-primary',
      ghost: 'btn-ghost',
      outline: 'rounded-full border-[3px] border-neutral-900 text-neutral-900 hover:bg-pop-muted transition duration-200',
    }
    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
