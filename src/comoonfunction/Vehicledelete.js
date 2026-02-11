import axios from "axios";

export const deletevehiclebyid = (id) => {
  axios.delete(`http://localhost:3000/sellar/request/reject/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
