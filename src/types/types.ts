export interface Field {
  id: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
}
export interface FormProps {
  isOpen: boolean;
  closeModal: () => void;
  fields: Field[];
  title: String;
  initialData?: any;
  submit?: any;
}
export interface Column {
  id: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

export interface TableComponentProps {
  columns: Column[];
  data?: any[];
  handleEdit: (id: string, data: any) => void;
  handleDelete: (id: string) => void;
  fields: Field[];
  title: string;
}
