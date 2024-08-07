import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../redux/features/LoginSlice";
import { TextField, Button, Box, Avatar, Input } from "@mui/material";
import { updateUser } from "../../../redux/features/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfos } = useSelector((store: any) => store.login);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    avatar: null,
  });

  const [file, setFile] = useState(null);

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
        avatar: userInfos.avatar || "",
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

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("phone", formData.phone);
    updatedFormData.append("location", formData.location);
    if (file) {
      updatedFormData.append("avatar", file);
    }

    dispatch(updateUser(updatedFormData));
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
      <Avatar
        alt={userInfos.userName}
        src={`http://localhost:5000${userInfos.avatar}`}
        className="UserAvatar"
      />
      <Input fullWidth type="file" name="avatar" onChange={handleFileChange} />
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
