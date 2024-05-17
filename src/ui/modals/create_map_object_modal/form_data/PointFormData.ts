import * as Yup from "yup";
import {MapCoordinates} from "../../../../types/MapCoordinates";

export const pointFormValidationSchema = Yup.object().shape({
  lng: Yup
    .number()
    .required('Введите lng')
    .min(-90, 'Диапазон: [-90; 90]')
    .max(90, 'Диапазон: [-90; 90]'),
  lat: Yup
    .number()
    .required('Введите lat')
    .min(-90, 'Диапазон: [-90; 90]')
    .max(90, 'Диапазон: [-90; 90]')
})

export const pointFormInitialFields: Partial<MapCoordinates> = {
  lng: undefined,
  lat: undefined
}
