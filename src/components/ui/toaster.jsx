import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { X } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <button
              className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
              onClick={() => dismiss(id)} // open:false => animate out, queue handles removal
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
} 