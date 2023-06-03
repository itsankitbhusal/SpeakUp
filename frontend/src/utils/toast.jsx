import { ToastContainer, toast as baseToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type = 'info') => {
  const toast = {
    info: baseToast.info,
    success: baseToast.success,
    warning: baseToast.warning,
    error: baseToast.error
  };

  toast[type](message, {
    position: 'bottom-right'
  });
};

export { ToastContainer, showToast };
