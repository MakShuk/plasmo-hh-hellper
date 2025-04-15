import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { componentStyles } from '../styles/components';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div style={componentStyles.toast}>
      <Check size={12} color="#4ADE80" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;