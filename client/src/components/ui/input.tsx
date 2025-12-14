import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-white placeholder:text-gray-400 selection:bg-blue-600 selection:text-white bg-gray-800 border-gray-600 text-white h-14 w-full min-w-0 rounded-md border-2 border-b-4 border-gray-700 px-5 py-3 text-base shadow-sm transition-all outline-none file:inline-flex file:h-9 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus-visible:border-b-4",
        "aria-invalid:ring-red-500/40 aria-invalid:border-red-600",
        className
      )}
      {...props}
    />
  )
}

export { Input }
