import axios from "axios";
import { showErrorAlert, showSuccessAlert } from "../Util/Alert";
const API = import.meta.env.VITE_API_BASE_URL;
export const deletevehiclebyid = (id) => {
  return axios
    .delete(`${API}/seller/request/reject/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(() => {
      showSuccessAlert("Car Deleted Succesfully");
    })
    .catch((e) => {
      console.log(e);
      showErrorAlert("Something Went Wrong Please Try Agani Latter");
    });
};
