'use client'

import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-body-sm font-medium text-neutral-800">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl bg-white px-4 py-2.5 text-coolGray-900 placeholder:text-coolGray-400 border-[3px] border-neutral-900 focus:border-pop focus:outline-none focus:ring-2 focus:ring-pop focus:ring-offset-2 focus:ring-offset-[var(--calm-bg)] ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'
