import React, { useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import Form from "../../../components/common/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import TableComponent from "../../../components/common/Table/Table";
import "./Projects.scss";
import { getPrograms } from "../../../redux/features/ProgramSlice";
import {
  deleteProject,
  getProjects,
} from "../../../redux/features/ProjectSlice";

const Projects = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { programs } = useSelector((store: any) => store.program);
  const { projects } = useSelector((store: any) => store.project);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getProjects({ status }));
  }, [dispatch, status]);
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };
  const projectFields = [
    { id: "projectName", label: "Name", type: "text" },
    { id: "price", label: "Total Price", type: "text" },
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
      id: "program",
      label: "Program",
      type: "select",
      options: programs.map((prog: any) => ({
        value: prog._id,
        label: prog.programName,
      })),
    },
  ];
  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
  };

  const columns = [
    { id: "projectName", label: "Name" },
    { id: "price", label: "Total Price" },
    {
      id: "program",
      label: "Program",
      render: (value: any) =>
        value ? value.programName : "program is no longer available",
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
        fields={projectFields}
        title={"Project"}
      />
      <TableComponent
        columns={columns}
        data={projects}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Projects;
