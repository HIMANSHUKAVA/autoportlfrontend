// src/utils/Alert.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// ✅ Success Alert
export const showSuccessAlert = (title, text) => {
  MySwal.fire({
    title: title || "Success 🎉",
    text: text || "Operation completed successfully!",
    icon: "success",
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    iconColor: "#00BFFF",
    confirmButtonText: "Continue",
    customClass: {
      popup: "otp-alert-popup",
      title: "otp-alert-title",
      confirmButton: "otp-alert-btn",
    },
    buttonsStyling: false,
  });
};

// ❌ Error Alert
export const showErrorAlert = (title, text) => {
  MySwal.fire({
    title: title || "Error ❌",
    text: text || "Something went wrong. Please try again!",
    icon: "error",
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    iconColor: "#FF4D4D",
    confirmButtonText: "Retry",
    customClass: {
      popup: "otp-alert-popup",
      title: "otp-alert-title",
      confirmButton: "otp-alert-btn",
    },
    buttonsStyling: false,
  });
};

export const showConfirmAlert = (
  title,
  text,
  confirmText = "Yes",
  cancelText = "No"
) => {
  return MySwal.fire({
    title: title || "Are you sure?",
    text: text || "Do you want to continue?",
    icon: "warning",
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    iconColor: "#FACC15",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      popup: "otp-alert-popup",
      title: "otp-alert-title",
      confirmButton: "otp-alert-btn",
      cancelButton: "otp-alert-cancel-btn",
    },
    buttonsStyling: false,
  });
};
