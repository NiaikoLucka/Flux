import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({
  className = "",
  ...props
}: InputProps ) => {
  return (
    <input
      className={clsx(
        [
          "flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ].join(" "),
      )}
      {...props}
    />
  );
};

export default Input;
