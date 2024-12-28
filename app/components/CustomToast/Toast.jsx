"use client"
import React, { useEffect, createContext, useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";

// Create the context
export const ToastContext = createContext(undefined);

// Toast types and their corresponding styles
const toastTypes = {
  success: {
    icon: FaCheckCircle,
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  },
  error: {
    icon: FaTimesCircle,
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    iconColor: 'text-red-500'
  },
  info: {
    icon: FaInfoCircle,
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-500'
  },
  warning: {
    icon: FaExclamationCircle,
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-700',
    iconColor: 'text-yellow-500'
  }
};

const Toast = ({ message, type = 'info', onClose, autoClose = true, duration = 5000 }) => {
  const toastStyle = toastTypes[type];
  const ToastIcon = toastStyle.icon;

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 animate-slide-in`}>
      <div className={`${toastStyle.bgColor} ${toastStyle.borderColor} ${toastStyle.textColor} border-l-4 rounded-lg shadow-lg p-4 w-80 flex items-start`}>
        <ToastIcon className={`${toastStyle.iconColor} w-5 h-5 mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-grow mr-2">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${toastStyle.textColor} hover:opacity-75 transition-opacity`}
        >
          <IoMdClose className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};