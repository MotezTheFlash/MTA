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
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateForm from "../UpdateForm/UpdateForm"; // Adjust the path as needed
import { TableComponentProps } from "../../../types/types";

const theme = createTheme();

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  backgroundColor: theme.palette.background.paper,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
  "&:not(:last-child)": {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.common.white,
}));

const EditButton = styled(StyledIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const DeleteButton = styled(StyledIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  handleEdit,
  handleDelete,
  fields,
  title,
}) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [currentData, setCurrentData] = useState<any>({});

  const openUpdateForm = (item: any) => {
    setCurrentData(item);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormOpen(false);
    setCurrentData({});
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id}>
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <StyledTableRow key={item._id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render
                      ? column.render(item[column.id], item)
                      : item[column.id]}
                  </TableCell>
                ))}
                <TableCell>
                  <EditButton onClick={() => openUpdateForm(item)}>
                    <EditIcon />
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </DeleteButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <UpdateForm
        isOpen={isUpdateFormOpen}
        closeModal={closeUpdateForm}
        fields={fields}
        title={title}
        initialData={currentData}
        submit={handleEdit}
      />
    </ThemeProvider>
  );
};

export default TableComponent;
