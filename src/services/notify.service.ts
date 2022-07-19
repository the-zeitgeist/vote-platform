import { toast, ToastOptions } from 'react-toastify';

const notificationConfig = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
} as ToastOptions;

export const notifySuccess = (message: string) => {
  toast.success(message, notificationConfig);
};

export const notifyError = (message: string = 'Error') => {
  toast.error(message, notificationConfig);
};
