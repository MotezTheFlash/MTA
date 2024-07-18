import React, { useEffect, useState } from "react";
import Form from "../../../components/common/Form/Form";
import { Button, IconButton, Select, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { deleteDev, getDevelopers } from "../../../redux/features/DevSlice";
import TableComponent from "../../../components/common/Table/Table";
import "./Developers.scss";

const Developers = () => {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { devs } = useSelector((store: any) => store.developer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevelopers({ status }));
  }, [dispatch, status]);

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const developerFields = [
    { id: "username", label: "Username", type: "text" },
    { id: "location", label: "Location", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone Number", type: "tel" },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {
    dispatch(deleteDev(id));
  };

  const columns = [
    { id: "username", label: "Developer" },
    { id: "location", label: "Location" },
    { id: "status", label: "Status" },
    { id: "phone", label: "Phone Number" },
  ];

  return (
    <div>
      <div className="tableHeader">
        <Button onClick={handleOpen}>
          <AddIcon />
        </Button>
        <Select value={status} onChange={handleStatusChange} displayEmpty>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </div>
      <Form
        isOpen={open}
        closeModal={handleClose}
        fields={developerFields}
        title={"Developer"}
      />
      <TableComponent
        columns={columns}
        data={devs}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Developers;