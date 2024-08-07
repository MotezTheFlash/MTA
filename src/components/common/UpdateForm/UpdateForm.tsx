import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormProps } from "../../../types/types";

const UpdateForm: React.FC<FormProps> = ({
  isOpen,
  closeModal,
  fields,
  title,
  initialData = {},
  submit,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (id: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    submit({ id: initialData._id, updatedDetails: formData });
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="formBox">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update {title}
          </Typography>
          <form
            className="updateForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              closeModal();
            }}>
            <div className="formInputs">
              {fields.map((field) => {
                if (field.type === "select") {
                  return (
                    <FormControl fullWidth margin="normal" key={field.id}>
                      <InputLabel id={`${field.id}-label`}>
                        {field.label}
                      </InputLabel>
                      <Select
                        labelId={`${field.id}-label`}
                        id={field.id}
                        value={formData[field.id] || ""}
                        label={field.label}
                        onChange={(e) =>
                          handleChange(field.id, e.target.value)
                        }>
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }
                return (
                  <TextField
                    key={field.id}
                    margin="normal"
                    fullWidth
                    id={field.id}
                    name={field.id}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                );
              })}
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateForm;
