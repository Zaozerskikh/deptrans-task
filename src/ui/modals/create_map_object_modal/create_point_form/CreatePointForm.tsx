import React from "react";
import {useDispatch} from "react-redux";
import CoordinatesInput from "../../../inputs/CoordinatesInput";
import DefaultButton from "../../../buttons/default_button/DefaultButton";
import {useFormik} from "formik";
import {pointFormInitialFields, pointFormValidationSchema} from "../form_data/PointFormData";
import styled from "styled-components";
import {CreatePointFormProps} from "./CreatePointFormProps";
import {addPoint} from "../../../../redux/map/PointsReducer";

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

const CreatePointForm: React.FC<CreatePointFormProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const pointForm = useFormik({
    initialValues: {...pointFormInitialFields},
    validationSchema: pointFormValidationSchema,
    onSubmit: (values) => {
      if (typeof values.lng === 'number' && typeof values.lat === 'number') {
        dispatch(addPoint({
          coordinates: {
            lng: values.lng,
            lat: values.lat
          },
          creationTimestamp: new Date().getTime()
        }))
        onClose()
      }
    },
  });

  return(
    <StyledForm onSubmit={pointForm.handleSubmit}>
      <PointContainer>
        <CoordinatesInput
          id={'lng'}
          value={pointForm.values.lng}
          placeholder={'lng'}
          onChange={pointForm.handleChange}
          onBlur={pointForm.handleBlur}
          error={pointForm.touched.lng && pointForm.errors.lng ? pointForm.errors.lng : undefined}
        />
        <CoordinatesInput
          id={'lat'}
          value={pointForm.values.lat}
          onChange={pointForm.handleChange}
          placeholder={'lat'}
          onBlur={pointForm.handleBlur}
          error={pointForm.touched.lat && pointForm.errors.lat ? pointForm.errors.lat : undefined}
        />
      </PointContainer>

      <DefaultButton
        type={'submit'}
        onClick={pointForm.handleSubmit}
        text={"Создать"}
        fullWidth={true}
      />
    </StyledForm>
  )
}

export default CreatePointForm
