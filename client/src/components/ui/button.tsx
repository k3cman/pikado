import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "double" | "triple" | "danger" | "muted" | "primary"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const baseStyles = "rounded-lg font-bold transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-gray-700 text-white border-b-4 border-gray-900 hover:bg-gray-600",
      double: "bg-gray-800 text-green-500 border-b-4 border-gray-900 hover:bg-gray-700",
      triple: "bg-gray-800 text-orange-500 border-b-4 border-gray-900 hover:bg-gray-700",
      danger: "bg-red-900/50 text-red-300 border-b-4 border-red-950 hover:bg-red-900/70",
      muted: "bg-gray-600 text-gray-300 border-b-4 border-gray-800 hover:bg-gray-500",
      primary: "bg-blue-600 text-white border-b-4 border-blue-800 hover:bg-blue-500",
    }

    const sizes = {
      default: "h-12 px-6 text-lg",
      sm: "h-10 px-4 text-base",
      lg: "h-16 px-8 text-xl",
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
