export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement | React.ReactElement[];
  title: string;
};
