import React, { useState } from "react";
import 'tailwindcss/tailwind.css';

type ToastOptions = {
  message: string;
  type: 'success' | 'error';
  duration?: number;
};

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 max-w-xs p-4 rounded-lg shadow-md text-white flex items-center gap-4 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-white font-bold">X</button>
    </div>
  );
};

let toastTimeout: NodeJS.Timeout;

export const useToast = () => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = ({ message, type, duration = 3000 }: ToastOptions): void => {
    clearTimeout(toastTimeout);
    setToast({ message, type });

    toastTimeout = setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const hideToast = () => {
    clearTimeout(toastTimeout);
    setToast(null);
  };

  return { toast, showToast, hideToast };
};

const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useToast();

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
};

export default ToastNotification;
