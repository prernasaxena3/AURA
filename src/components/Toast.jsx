import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return a mock implementation if not wrapped in ToastProvider
    return {
      showToast: (message, type = 'info') => {
        console.log(`Toast: ${type.toUpperCase()} - ${message}`);
      },
      ToastContainer: () => null
    };
  }
  
  const { showToast, removeToast, toasts } = context;
  
  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
  
  return { showToast, ToastContainer };
};

const Toast = ({ toast, onRemove }) => {
  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: <AlertTriangle className="w-5 h-5 text-red-600" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <Info className="w-5 h-5 text-blue-600" />
        };
    }
  };

  const styles = getToastStyles(toast.type);

  return (
    <div className={`flex items-center p-4 rounded-lg border shadow-lg min-w-80 ${styles.bg} ${styles.border}`}>
      <div className="flex-shrink-0">
        {styles.icon}
      </div>
      <div className={`ml-3 flex-1 ${styles.text}`}>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className={`ml-4 flex-shrink-0 rounded-md p-1.5 hover:bg-opacity-20 hover:bg-gray-600 ${styles.text}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};