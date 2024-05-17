import React, {ChangeEvent} from "react";

export interface CoordinatesInputProps {
  id: string;
  value?: number;
  placeholder: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}
