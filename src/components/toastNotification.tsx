import toast from 'react-hot-toast';
import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface ToastWithCtaProps {
  variant: 'success' | 'error';
  onClickFunction?: () => void;
  message: string;
  ctaMessage?: string;
  toastId?: string;
}

// Mapping variant to icons
const variantIconMapping: { [key: string]: React.ReactNode } = {
  success: <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />,
  error: <ExclamationCircleIcon className="h-8 w-8 text-red-500 mr-2" />
};

export function feedbackToast({ variant, onClickFunction, message, ctaMessage, toastId }: ToastWithCtaProps) {
  const feedbackToastIcon = variantIconMapping[variant];
  
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-lg w-full bg-white rounded-lg pointer-events-auto flex items-center shadow-md ring-1 ring-gray-300 p-4`}
    >
      <button
        onClick={onClickFunction}
        className="flex items-center justify-center text-center w-full text-gray-700"
      >
        {feedbackToastIcon}
        <span className="font-medium">{message}</span>
        {ctaMessage && <span className="ml-2 text-blue-600 font-bold">{ctaMessage}</span>}
      </button>
    </div>
  ), { id: toastId });
}
