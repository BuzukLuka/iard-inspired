import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
}) {
  const variant = (props as any).variant ?? "primary";
  return (
    <button
      {...props}
      className={cn(
        "btn",
        {
          "btn-primary": variant === "primary",
          "btn-outline": variant === "outline",
        },
        className
      )}
    />
  );
}
