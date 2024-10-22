import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

type ToastOptions = {
  message: string;
  duration?: number;
};

export const showSuccessToast = ({ message, duration = 3000 }: ToastOptions): void => {
  toast.success(message, {
    position: 'top-right',
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'bg-success text-white',
    bodyClassName: 'font-semibold',
  });
};

export const showErrorToast = ({ message, duration = 3000 }: ToastOptions): void => {
  toast.error(message, {
    position: 'top-right',
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'bg-error text-white',
    bodyClassName: 'font-semibold',
  });
};

const ToastNotification: React.FC = () => {
  return <ToastContainer />;
};

export default ToastNotification;
