import { Eye, EyeOff } from "lucide-react";
import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, type = "text", className = "", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        <div
          className={`flex items-center rounded-md border bg-background pl-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
            error ? "border-error" : "border-border"
          }`}>
          {icon && (
            <div className="shrink-0 select-none text-muted-foreground">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${props.name}-error` : undefined}
            className={`block min-w-0 grow bg-transparent py-1.5 pl-2 pr-3 text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm/6 ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="mr-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p id={`${props.name}-error`} className="mt-1 text-sm text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);


export default Input;
