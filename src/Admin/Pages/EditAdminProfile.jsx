import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from "../../Util/Alert";
import { inputStyle } from "../commonfiles/common";

export default function EditAdminProfile() {
  const { id } = useParams();
  const [photo, setphoto] = useState(null);

  const handlphotochange = (e) => {
    const file = e.target.files[0];
    if (file) setphoto(file);
  };


  const api = import.meta.env.VITE_API_BASE_URL;


  const navigate  = useNavigate();
  const [update, setupdate] = useState({
    username: "",
    email: "",
    role: "",
    photo: "",
    newPassword: "",
    oldPassword : ""
  });

  useEffect(() => {
    axios
      .get(`${api}/admin/fetch/single/admins/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setupdate({
          username: res.data.username || "",
          email: res.data.email || "",
          role: res.data.role || "",
          photo: res.data.photo
  ? `${api}/images/${res.data.photo}`
  : "",

          password: "",
        });
      })
      .catch((error) => {
        console.log(error.response);
        showErrorAlert(error.response?.data?.message);

      });
  }, [id]);

  const handlupdatechange = (e) => {
    setupdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };
  const formFields = [
    { label: "Name", name: "username", placeholder: "Username" },
    { label: "Email", name: "email", placeholder: "Email", type: "email" },

    {
      label: "Old Password",
      name: "oldPassword",
      placeholder: "Enter Old Password",
      type: "password",
    },
    {
      label: "New Password",
      name: "newPassword",
      placeholder: "Enter New Password",
      type: "password",
    },

    { label: "Role", name: "role", placeholder: "Role" },
  ];


  const handlupdateprofile = (e)=>{

    e.preventDefault();

    const oldpassword = update.oldPassword;


    if(update.newPassword && !oldpassword)
    {
       showErrorAlert("Old password required to change password");
            return;
    }


    const payload = {
      username : update.username,
      email : update.email,
      password : update.newPassword,
      role : update.role
    }

    const formdeta = new FormData();

    formdeta.append(
        "profile",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    )

     formdeta.append("old_password", oldpassword);

         if (photo) {
      formdeta.append("photo", photo);
    }


    axios.put(`${api}/admin/update/admin/prfofile/${id}` , formdeta , {
      headers:{
        Authorization : "Bearer " + localStorage.getItem("token")
      }
    }).then((res)=>{
      console.log(res)
      showSuccessAlert("Profile changed Successfullly");
      setupdate({...update , newPassword : "" , oldPassword : ""})
    }).catch((error)=>{
      showErrorAlert(error)
    })
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Edit Profile</Typography>
        <Typography variant="body2">Update Your Personal Detail</Typography>
      </Box>

      <Box
        sx={{
          width: "90%",
          border: "1px solid rgba(148,163,184,0.4)",
          // height: "100vh",
          p: 2,
          gap: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* image box */}
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // order: { xs: 1, md: 1 },
            // backgroundColor: "red",
          }}
        >
          <Button component="label" sx={{ textTransform: "none" }}>
            <input
              type="file"
              accept="image/**"
              hidden
              onChange={handlphotochange}
            />

            {photo || update.photo ?
              <>
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid white",
                  }}
                >
                  <img
                    src={photo ? URL.createObjectURL(photo) : update.photo}
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </>
            : <Typography
                sx={{
                  color: "whitesmoke",
                  p: 3,
                  textAlign: "center",
                }}
              >
                ⬆ <br /> Upload Profile Photo
              </Typography>
            }
          </Button>
        </Box>

        {/* field box */}
        <Box
          sx={{
            color: "white",
            width: { xs: "100%", md: "65%" },
          }}
        >
          {formFields.map((field) => (
            <Box key={field.name} sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "white" }}>{field.label}</InputLabel>

              <TextField
                sx={inputStyle}
                placeholder={field.placeholder}
                fullWidth
                name={field.name}
                type={field.type || "text"}
                value={update[field.name]}
                onChange={handlupdatechange}
              />
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              order: { xs: 3, md: 3 },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
            type="submit"
              sx={{
                border: "1px solid #38BDF8",
                color: "#38BDF8",
                m: 2,
              }}
              onClick={handlupdateprofile}
            >
              Save Changes
            </Button>
            <Button
              sx={{
                color: "red",
                border: "1px solid #EF4444",
                m: 2,
              }}
              onClick={() => {
                                showConfirmAlert(
                                  "Edit Profile?",
                                  "Are you sure you do not want to update your password?",
                                  "Update",
                                  "Cancel"
                                ).then(() => {
                                  navigate("/admin/dash");
                                });
                              }}
            >
              Cancel Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
