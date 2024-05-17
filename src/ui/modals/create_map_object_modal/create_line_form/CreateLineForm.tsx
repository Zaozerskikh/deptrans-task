import React from "react";
import {useDispatch} from "react-redux";
import CoordinatesInput from "../../../inputs/CoordinatesInput";
import DefaultButton from "../../../buttons/default_button/DefaultButton";
import {useFormik} from "formik";
import styled from "styled-components";
import {CreateLineFormProps} from "./CreateLineFormProps";
import {lineFormInitialFields, lineFormValidationSchema} from "../form_data/LineFormData";
import {addLine} from "../../../../redux/map/LinesReducer";

const PointInfoContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

const PointContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: flex-end;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const CreateLineForm: React.FC<CreateLineFormProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const lineForm = useFormik({
    initialValues: {...lineFormInitialFields},
    validationSchema: lineFormValidationSchema,
    onSubmit: (values) => {
      if (typeof values.startLng === 'number' && typeof values.startLat === 'number' &&
          typeof values.endLng === 'number' && typeof values.endLat === 'number'
      ) {
        dispatch(addLine({
          start: {
            lat: values.startLat,
            lng: values.startLng,
          },
          end: {
            lat: values.endLat,
            lng: values.endLng,
          },
          creationTimestamp: new Date().getTime()
        }))
        onClose()
      }
    },
  });

  return(
    <StyledForm onSubmit={lineForm.handleSubmit}>
      <PointInfoContainer>
        Начало
        <PointContainer>
          <CoordinatesInput
            id={'startLng'}
            value={lineForm.values.startLng}
            placeholder={'lng'}
            onChange={lineForm.handleChange}
            onBlur={lineForm.handleBlur}
            error={lineForm.touched.startLng && lineForm.errors.startLng ? lineForm.errors.startLng : undefined}
          />
          <CoordinatesInput
            id={'startLat'}
            value={lineForm.values.startLat}
            onChange={lineForm.handleChange}
            placeholder={'lat'}
            onBlur={lineForm.handleBlur}
            error={lineForm.touched.startLat && lineForm.errors.startLat ? lineForm.errors.startLat : undefined}
          />
        </PointContainer>
      </PointInfoContainer>

      <PointInfoContainer>
        Конец
        <PointContainer>
          <CoordinatesInput
            id={'endLng'}
            value={lineForm.values.endLng}
            placeholder={'lng'}
            onChange={lineForm.handleChange}
            onBlur={lineForm.handleBlur}
            error={lineForm.touched.endLng && lineForm.errors.endLng ? lineForm.errors.endLng : undefined}
          />
          <CoordinatesInput
            id={'endLat'}
            value={lineForm.values.endLat}
            onChange={lineForm.handleChange}
            placeholder={'lat'}
            onBlur={lineForm.handleBlur}
            error={lineForm.touched.endLat && lineForm.errors.endLat ? lineForm.errors.endLat : undefined}
          />
        </PointContainer>
      </PointInfoContainer>

      <DefaultButton
        type={'submit'}
        onClick={lineForm.handleSubmit}
        text={"Создать"}
        fullWidth={true}
      />
    </StyledForm>
  )
}

export default CreateLineForm
