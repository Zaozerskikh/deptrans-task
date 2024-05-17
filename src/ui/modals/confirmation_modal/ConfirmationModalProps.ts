import {BaseModalProps} from "../base_modal/BaseModalProps";

export interface ConfirmationModalProps extends Omit<BaseModalProps, 'header'> {
  onConfirm: () => void;
  text: string;
}
