import { useState } from 'react';

interface UseToastReturn {
    showToast: boolean;
    toastMessage: string;
    showToastNotification: (message: string) => void;
    hideToast: () => void;
}

export const useToast = (): UseToastReturn => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToastNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const hideToast = () => setShowToast(false);

    return {
        showToast,
        toastMessage,
        showToastNotification,
        hideToast
    };
};