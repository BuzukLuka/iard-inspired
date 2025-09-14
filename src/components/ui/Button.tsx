import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
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
