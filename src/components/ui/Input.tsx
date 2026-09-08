import React, { useState } from 'react';
import type { InputProps } from '../interfaces/IInputsProps';
import { Eye, EyeOff } from 'lucide-react';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorMessage, isPassword = false, type = 'text', disabled, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#344054] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all outline-none text-[#101828] placeholder:text-[#98A2B3]
              ${error ? 'border-error bg-[#FFF5F5]' : 'border-[#D0D5DD] bg-white'}
              focus:border-error focus:ring-2 focus:ring-error/10
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isPassword ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-secondary hover:text-[#101828] transition-colors"
            >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="mt-1 text-xs text-error">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';