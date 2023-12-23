import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const customToast = (errorMessage: string | undefined) => {
  return toast.error(errorMessage, {
    position: toast.POSITION.TOP_CENTER
  })
};

export default customToast