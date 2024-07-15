import React, { useEffect, useState } from "react";
import Form from "../../../components/common/Form/Form";
import { Button, IconButton, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../../components/common/Table/Table";
import "./Customers.scss";
import { getProjects } from "../../../redux/features/ProjectSlice";
import {
  getCustomers,
  deleteCustomer,
} from "../../../redux/features/CustomerSlice";
const Customers = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { customers } = useSelector((store: any) => store.customer);
  const { projects } = useSelector((store: any) => store.project);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getCustomers({ status }));
    dispatch(getProjects());
  }, [dispatch, status]);
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };
  const customerFields = [
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
    {
      id: "project",
      label: "Project",
      type: "select",
      options: projects.map((project: any) => ({
        value: project._id,
        label: project.projectName,
      })),
    },
  ];

  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const columns = [
    { id: "username", label: "Customer" },
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
        fields={customerFields}
        title={"Customer"}
      />
      <TableComponent
        columns={columns}
        data={customers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Customers;
