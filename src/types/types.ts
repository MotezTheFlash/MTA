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
}
