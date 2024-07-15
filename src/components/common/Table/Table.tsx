import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface TableComponentProps {
  columns: Column[];
  data?: any[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item._id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.render
                    ? column.render(item[column.id], item)
                    : item[column.id]}
                </TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleEdit(item._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
