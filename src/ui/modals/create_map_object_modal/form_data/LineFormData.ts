import * as Yup from "yup";

export const lineFormValidationSchema = Yup.object().shape({
  startLng: Yup
    .number()
    .required('Введите lng')
    .min(-90, 'Диапазон: [-90; 90]')
    .max(90, 'Диапазон: [-90; 90]'),
  startLat: Yup
    .number()
    .required('Введите lat')
    .min(-90, 'Диапазон: [-90; 90]')
    .max(90, 'Диапазон: [-90; 90]'),
  endLng: Yup
    .number()
    .required('Введите lng')
    .min(-90, 'Диапазон: [-90; 90]')
    .max(90, 'Диапазон: [-90; 90]'),
  endLat: Yup
    .number()
    .required('Введите lat')
    .min(-90, 'Диапазон: [-90; 90]')
    .max(90, 'Диапазон: [-90; 90]')
})

export const lineFormInitialFields: Partial<{
  startLng: number,
  startLat: number,
  endLng: number,
  endLat: number
}> = {
  startLng: undefined,
  startLat: undefined,
  endLng: undefined,
  endLat: undefined
}
