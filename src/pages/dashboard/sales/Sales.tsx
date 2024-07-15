import React, { useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import Form from "../../../components/common/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import TableComponent from "../../../components/common/Table/Table";
import "./Sales.scss";
import { getProjects } from "../../../redux/features/ProjectSlice";
import { getCustomers } from "../../../redux/features/CustomerSlice";
import { deleteSale, getSales } from "../../../redux/features/SaleSlice";
const Sales = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { customers } = useSelector((store: any) => store.customer);
  const { projects } = useSelector((store: any) => store.project);
  const { sales } = useSelector((store: any) => store.sale);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getSales({ status }));
    dispatch(getProjects());
  }, [dispatch, status]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date);
  };
  const saleFields = [
    { id: "date", label: "", type: "date" },
    { id: "commission", label: "Commission", type: "text" },
    { id: "VAT", label: "VAT", type: "text" },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "in progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "canceled", label: "Canceled" },
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
    {
      id: "customer",
      label: "Customer",
      type: "select",
      options: customers.map((customer: any) => ({
        value: customer._id,
        label: customer.username,
      })),
    },
  ];
  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {
    dispatch(deleteSale(id));
  };
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };
  const columns = [
    { id: "date", label: "Date", render: (value: any) => formatDate(value) },
    { id: "reference", label: "Reference" },

    {
      id: "customer",
      label: "Client",
      render: (value: any) => value.username,
    },
    {
      id: "project",
      label: "Project",
      render: (value: any) => value.projectName,
    },
    { id: "status", label: "Status" },
  ];
  return (
    <div>
      <div className="tableHeader">
        <Button onClick={handleOpen}>
          <AddIcon />
        </Button>
        <Select value={status} onChange={handleStatusChange} displayEmpty>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </div>
      <Form
        isOpen={open}
        closeModal={handleClose}
        fields={saleFields}
        title={"Sale"}
      />
      <TableComponent
        columns={columns}
        data={sales}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Sales;
