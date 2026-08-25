import type { HTMLAttributes } from "react";
import clsx from "clsx";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = ({ className = "", ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        [
          "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
          className,
        ].join(" "),
      )}
      {...props}
    />
  );
};

export default Card;
