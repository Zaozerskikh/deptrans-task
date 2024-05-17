import React from "react";

export interface BaseModalProps extends React.PropsWithChildren {
  header: string;
  isOpened: boolean;
  onClose: () => void;
}
