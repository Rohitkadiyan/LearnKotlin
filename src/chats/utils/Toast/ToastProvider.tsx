import React, {createContext, ReactNode, useContext, useState} from 'react';
import Toast from './Toast';

export interface ToastContextType {
  show: (msg: string, type: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({children}: {children: ReactNode}) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');

  const show = (msg: string, toastType: string) => {
    setMessage(msg);
    setVisible(true);
    setType(toastType);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{show}}>
      {children}
      <Toast visible={visible} message={message} type={type} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
