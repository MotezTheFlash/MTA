import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../redux/features/LoginSlice";
import { TextField, Button, Box } from "@mui/material";
import { updateUser } from "../../../redux/features/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfos } = useSelector((store: any) => store.login);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (userInfos) {
      setFormData({
        username: userInfos.username || "",
        email: userInfos.email || "",
        phone: userInfos.phone || "",
        location: userInfos.location || "",
      });
    }
  }, [userInfos]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateUser(formData));
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 900,
      }}>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <Button
        sx={{ maxWidth: 400 }}
        type="submit"
        variant="contained"
        color="primary">
        Save Changes
      </Button>
    </Box>
  );
};

export default Profile;
