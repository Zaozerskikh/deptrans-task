import React from "react";
import styled from "styled-components";
import {DefaultButtonProps} from "./DefaultButtonProps";

const StyledDefaultButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 12px;
  height: 48px;
  gap: 12px;
  background-color: #F3F4F6;
  
  &:hover {
    background-color: #E7E9F0;
  }
  
  transition: 0.2s background-color ease-in-out;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  ${props => props?.$fullWidth && 'width: 100%'};
`

const DefaultButton: React.FC<DefaultButtonProps & Partial<React.PropsWithChildren>> = (props) => {
  const {
    onClick,
    text,
    fullWidth,
    type,
    children
  } = props

  return(
    <StyledDefaultButton onClick={onClick} $fullWidth={fullWidth} type={type}>
      {children}
      {text}
    </StyledDefaultButton>
  )
}

export default DefaultButton
