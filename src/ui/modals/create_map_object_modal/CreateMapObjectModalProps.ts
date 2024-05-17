import {MapObjectType} from "../../../types/MapObjectType";
import {BaseModalProps} from "../base_modal/BaseModalProps";

export interface CreateMapObjectModalProps extends Omit<BaseModalProps, 'children' | 'header'> {
  objectType: MapObjectType;
}
