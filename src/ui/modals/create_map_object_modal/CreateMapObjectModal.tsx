import {CreateMapObjectModalProps} from "./CreateMapObjectModalProps";
import BaseModal from "../base_modal/BaseModal";
import React from "react";
import {MapObjectType} from "../../../types/MapObjectType";
import CreatePointForm from "./create_point_form/CreatePointForm";
import CreateLineForm from "./create_line_form/CreateLineForm";

const CreateMapObjectModal: React.FC<CreateMapObjectModalProps> = ({ isOpened, onClose, objectType}) => {
  return(
    <BaseModal
      header={`Создание ${objectType === MapObjectType.POINT ? 'точки' : 'линии'}`}
      isOpened={isOpened}
      onClose={onClose}
    >
      {objectType === MapObjectType.POINT
        ? <CreatePointForm onClose={onClose}/>
        : <CreateLineForm onClose={onClose}/>
      }
    </BaseModal>
  )
}

export default CreateMapObjectModal
