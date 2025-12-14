import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer bg-gray-700 border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:text-black data-[state=checked]:border-green-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 aria-invalid:ring-red-500/40 aria-invalid:border-red-600 size-8 shrink-0 rounded-md border-2 border-b-4 shadow-sm transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 touch-manipulation select-none",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-6" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
