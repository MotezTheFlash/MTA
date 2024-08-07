import React, { useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import Form from "../../../components/common/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import TableComponent from "../../../components/common/Table/Table";
import "./Programs.scss";
import {
  addProgram,
  deleteProg,
  editProg,
  getPrograms,
} from "../../../redux/features/ProgramSlice";
import { getDevelopers } from "../../../redux/features/DevSlice";

const Programs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [status, setStatus] = useState("");
  const handleClose = () => setOpen(false);
  const { devs } = useSelector((store: any) => store.developer);
  const { programs } = useSelector((store: any) => store.program);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDevelopers());
    dispatch(getPrograms({ status }));
  }, [dispatch, status]);

  const programFields = [
    { id: "programName", label: "Name", type: "text" },
    { id: "totalAmount", label: "Total Price", type: "text" },
    { id: "type", label: "Type", type: "text" },
    { id: "details", label: "Details", type: "text" },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "blocked", label: "Blocked" },
        { value: "deleted", label: "Deleted" },
      ],
    },
    {
      id: "developer",
      label: "Developer",
      type: "select",
      options: devs.map((dev: any) => ({
        value: dev._id,
        label: dev.username,
      })),
    },
  ];
  const handleAdd = (data: any) => {
    dispatch(addProgram(data));
  };
  const handleEdit = (id: string, data: any) => {
    dispatch(editProg(id, data));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProg(id));
  };
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };
  const columns = [
    { id: "programName", label: "Name" },
    { id: "totalAmount", label: "Total Price" },
    {
      id: "developer",
      label: "Developer",
      render: (value: any) =>
        value ? value.username : "dev is no longer available",
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
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="blocked">Blocked</MenuItem>
          <MenuItem value="deleted">Deleted</MenuItem>
        </Select>
      </div>
      <Form
        isOpen={open}
        closeModal={handleClose}
        fields={programFields}
        title={"Program"}
        submit={handleAdd}
      />
      <TableComponent
        columns={columns}
        data={programs}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        fields={programFields}
        title={"Program"}
      />
    </div>
  );
};

export default Programs;
