import BaseModal from "../base_modal/BaseModal";
import {ConfirmationModalProps} from "./ConfirmationModalProps";
import React from "react";
import DefaultButton from "../../buttons/default_button/DefaultButton";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpened, onConfirm, onClose, text }) => {
  return(
    <BaseModal
      header={"Wait a minute"}
      isOpened={isOpened}
      onClose={onClose}
    >
      <div dangerouslySetInnerHTML={{ __html: text }}/>
      <DefaultButton
        text={'Да'}
        onClick={() => {
          onConfirm()
          onClose()
        }}
      />
    </BaseModal>
  )
}

export default ConfirmationModal
