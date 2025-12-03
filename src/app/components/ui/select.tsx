"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}

interface SelectOptionProps {
  value: string;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  setOpen: (open: boolean) => void;
} | null>(null);

export function Select({
  value,
  onValueChange,
  children,
  className = "",
  placeholder = "Selecione...",
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);

  const selectedLabel = React.useMemo(() => {
    let label = placeholder;
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<SelectOptionProps>(child) &&
        child.props.value === value
      ) {
        label = child.props.children as string;
      }
    });
    return label;
  }, [children, value, placeholder]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, setOpen }}>
      <div ref={selectRef} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg animate-in fade-in-0 zoom-in-95 duration-100">
            <div className="p-1">{children}</div>
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectOption({ value, children }: SelectOptionProps) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectOption must be used within Select");

  const isSelected = context.value === value;

  return (
    <button
      type="button"
      onClick={() => {
        context.onValueChange(value);
        context.setOpen(false);
      }}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium"
          : "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

// Select compacto para uso em tabelas (badges de status)
interface StatusSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; className?: string }[];
  className?: string;
}

export function StatusSelect({
  value,
  onValueChange,
  options,
  className = "",
}: StatusSelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open]);

  return (
    <div ref={selectRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:opacity-80 ${className}`}
      >
        <span>{selectedOption?.label || value}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 min-w-[160px] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  value === option.value
                    ? "bg-slate-100 dark:bg-slate-800"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    option.value === "completed"
                      ? "bg-green-500"
                      : option.value === "in_progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                />
                <span className="text-slate-900 dark:text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
