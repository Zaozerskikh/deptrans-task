import React, {useRef, useState} from "react";
import styled from "styled-components";
import {CoordinatesInputProps} from "./CoordinatesInputProps";

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

const InputAndPlaceholderWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

const StyledInput = styled.input<{
  $focused?: boolean,
  $error?: boolean,
}>`
  // sizing
  height: 48px;
  margin: 0;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  
  // border
  border-width: 1.5px;
  border-style: solid;
  border-radius: 12px;
  ${props => props?.$error && 'border-color: red'};

  // other
  transition: 
          color 0.2s ease-in-out, 
          background-color 0.2s ease-in-out, 
          opacity 0.2s ease-in-out, 
          box-shadow 0.2s ease-in-out, 
          border 0.2s ease-in-out;
  appearance: none;
  position: relative;
  resize: none !important;
`

const ErrorWrapper = styled.div<{ $isShown: boolean }>`
  display: flex;
  max-height: ${props => props?.$isShown ? '17px' : '0px'};
  min-height: ${props => props?.$isShown ? '17px' : '0px'};
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  color: red;
  text-align: left;
  font-size: 12px;
  transition: 0.2s all ease-in-out;
`

const CoordinatesInput: React.FC<CoordinatesInputProps> = (props) => {
  const {
    id,
    value,
    placeholder,
    onChange,
    onBlur,
    error,
  } = props
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return(
    <StyledInputWrapper>
      <ErrorWrapper $isShown={error !== undefined && !isFocused}>
        {error}
      </ErrorWrapper>
      <InputAndPlaceholderWrapper>
        <StyledInput
          // styled props
          as={'input'}
          className={'input'}
          $focused={isFocused}
          $error={error !== undefined && !isFocused}

          // other props
          id={id}
          type={'number'}
          ref={inputRef}
          value={value || ''}
          onChange={onChange}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false)
            if (onBlur) {
              onBlur(e)
            }
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
        />
      </InputAndPlaceholderWrapper>
    </StyledInputWrapper>
  )
}

export default CoordinatesInput
