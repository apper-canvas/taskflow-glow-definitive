import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary hover:bg-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-primary/20",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm focus:ring-gray-300",
    danger: "bg-error hover:bg-red-600 text-white hover:shadow-lg focus:ring-error/20",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-primary focus:ring-gray-300",
    accent: "bg-accent hover:bg-yellow-500 text-white hover:shadow-lg hover:scale-105 focus:ring-accent/20"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    default: "px-4 py-3",
    lg: "px-6 py-4 text-lg"
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button