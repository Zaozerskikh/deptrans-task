import {ButtonProps} from "../ButtonProps";

export interface DefaultButtonProps extends ButtonProps {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  fullWidth?: boolean;
}
