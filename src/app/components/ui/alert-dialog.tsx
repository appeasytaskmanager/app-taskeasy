"use client";

import * as React from "react";
import { Button } from "./button";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200"
        onClick={() => onOpenChange(false)}
      />
      {/* Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 fade-in-0 duration-200">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
}

export function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <div className="mb-4">{children}</div>;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
}

export function AlertDialogTitle({ children }: AlertDialogTitleProps) {
  return (
    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
      {children}
    </h2>
  );
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
}

export function AlertDialogDescription({ children }: AlertDialogDescriptionProps) {
  return (
    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
      {children}
    </p>
  );
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
}

export function AlertDialogFooter({ children }: AlertDialogFooterProps) {
  return <div className="flex justify-end gap-3 mt-6">{children}</div>;
}

interface AlertDialogActionProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
  children: React.ReactNode;
}

export function AlertDialogAction({
  onClick,
  disabled,
  variant = "default",
  children,
}: AlertDialogActionProps) {
  const variantStyles = {
    default: "",
    destructive:
      "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500",
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={variant === "destructive" ? variantStyles.destructive : ""}
    >
      {children}
    </Button>
  );
}

interface AlertDialogCancelProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function AlertDialogCancel({ onClick, children }: AlertDialogCancelProps) {
  return (
    <Button variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
}

