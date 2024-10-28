import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const Dialog = ({ children, ...props }) => (
  <DialogPrimitive.Root {...props}>
    {children}
  </DialogPrimitive.Root>
)

const DialogTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger
    ref={ref}
    className={cn("focus:outline-none", className)}
    {...props}
  />
))
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName

const DialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed z-50 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg",
      "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      className
    )}
    {...props}
  />
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
)

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-medium", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

const DialogClose = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn("absolute top-2 right-2", className)}
    {...props}
  />
))
DialogClose.displayName = DialogPrimitive.Close.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
