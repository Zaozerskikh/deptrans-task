import React from "react";
import styled from "styled-components";
import {ButtonProps} from "../ButtonProps";
import closeIcon from './../../icons/buttons/CloseButtonIcon.svg'

const StyledCloseButtonContainer = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: 0.2s background-color ease-in-out;
  border-radius: 16px;
  height: 32px;
  width: 32px;
  background-color: #F3F4F6;

  &:hover {
    background-color: #E7E9F0;
  }
`

const CloseButton: React.FC<ButtonProps> = ({ onClick }) => {
  return(
    <StyledCloseButtonContainer onClick={onClick}>
      <img src={closeIcon} alt={'close'}/>
    </StyledCloseButtonContainer>
  )
}

export default CloseButton
