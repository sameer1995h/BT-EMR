import { useToast as useToastOriginal } from "../components/ui/use-toast"

export function useToast() {
  const { toast } = useToastOriginal()

  return {
    success: (title, description) => {
      toast({
        title,
        description,
        variant: "default",
        className: "bg-green-50 border-green-200",
      })
    },
    error: (title, description) => {
      toast({
        title,
        description,
        variant: "destructive",
      })
    },
    warning: (title, description) => {
      toast({
        title,
        description,
        variant: "default",
        className: "bg-yellow-50 border-yellow-200",
      })
    },
    info: (title, description) => {
      toast({
        title,
        description,
        variant: "default",
        className: "bg-blue-50 border-blue-200",
      })
    }
  }
}
