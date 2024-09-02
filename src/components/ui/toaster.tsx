"use client";

import { Spinner } from "./spinner";
import { useToast } from "../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { CircleCheckIcon, CircleSlashIcon } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              <div className="flex gap-1 items-center">
                {props.variant === "loading" && <Spinner className="size-4" />}
                {props.variant === "success" && (
                  <CircleCheckIcon className="size-4" />
                )}
                {props.variant === "destructive" && (
                  <CircleSlashIcon className="size-4" />
                )}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
