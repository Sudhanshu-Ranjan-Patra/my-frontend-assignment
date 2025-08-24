import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-400",
  outlined: "border border-gray-400 focus:ring-2 focus:ring-blue-400",
  ghost: "border-b border-gray-300 bg-transparent focus:ring-0",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label className="text-gray-700 font-medium text-sm">{label}</label>
      )}

      <div className="relative">
        <input
          type={currentType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={`w-full rounded-lg outline-none pr-10 ${
            sizeClasses[size]
          } ${variantClasses[variant]} ${invalid ? "border-red-500" : ""} ${
            disabled ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        />

        {/* Clear Button */}
        {value && value.length > 0 && !disabled && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {invalid && errorMessage ? (
        <p className="text-red-500 text-xs">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-gray-500 text-xs">{helperText}</p>
      ) : null}
    </div>
  );
};
