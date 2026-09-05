import clsx from "clsx";

type SpinnerProps = {
  size?: number;
  color?: string;
  speed?: number;
  trackOpacity?: number;
  className?: string;
};

export function Spinner({
  size = 20,
  color,
  speed = 2,
  trackOpacity = 0,
  className,
}: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      height={size}
      width={size}
      className={clsx("container" , className)}
      style={{
        ...(speed && { "--uib-speed": `${speed}s` }),
        ...(color && { "--uib-color": color }),
        ...(trackOpacity !== undefined && { "--uib-bg-opacity": trackOpacity }),
      } as React.CSSProperties}
    >
      <circle
        cx="20" cy="20" r="17.5"
        pathLength={100}
        strokeWidth={5}
        className={clsx("track", className)}
      />
      <circle
        cx="20" cy="20" r="17.5"
        pathLength={100}
        strokeWidth={5}
        strokeLinecap="round"
        className={clsx("car", className)}
        
      />
    </svg>
  );
}