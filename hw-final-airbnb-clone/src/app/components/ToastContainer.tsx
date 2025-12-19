"use client";

import { useApp } from "../context/AppContext";
import { CheckCircle, Info, AlertTriangle, XCircle, X } from "lucide-react";

export default function ToastContainer() {
  const { currentToast, clearToast } = useApp();

  if (!currentToast) return null;

  const icons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
  };

  const colors = {
    info: "bg-blue-500 dark:bg-blue-600",
    success: "bg-green-500 dark:bg-green-600",
    warning: "bg-yellow-500 dark:bg-yellow-600",
    error: "bg-red-500 dark:bg-red-600",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${colors[currentToast.type]} text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-64 max-w-md`}>
        {icons[currentToast.type]}
        <div className="flex-1 text-sm">{currentToast.message}</div>
        <button 
          onClick={clearToast}
          className="hover:opacity-80 transition-opacity"
          aria-label="Закрыть уведомление"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}