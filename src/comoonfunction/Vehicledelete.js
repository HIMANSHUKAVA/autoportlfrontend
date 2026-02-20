import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;
export const deletevehiclebyid = (id) => {
  axios.delete(`${API}/seller/request/reject/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
