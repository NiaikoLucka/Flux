import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
};

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:opacity-90",

  secondary: "bg-secondary text-secondary-foreground hover:bg-accent border border-border",

  outline: "border border-border bg-background hover:bg-accent ",

  ghost: "hover:bg-accent",

  destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs",
  default: "h-9 px-4 text-sm",
  lg: "h-10 px-6 text-sm",
};

const Button = ({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        [
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer ",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" "),
      )}
      {...props}
    />
  );
};

export default Button;
