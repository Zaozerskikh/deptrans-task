import React from "react";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
import {BaseModalProps} from "./BaseModalProps";
import CloseButton from "../../buttons/close_button/CloseButton";

const StyledWrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledModal = styled(motion.div)`
  width: 320px;
  background-color: white;
  border-radius: 24px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  flex-direction: column;
`

const StyledHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  font-size: 20px;
  font-weight: bold;
`

const IN_OUT_ANIMATION_DURATION_S = 0.2

const BaseModal: React.FC<BaseModalProps> = ({ isOpened, onClose, children, header }) => {
  const root = document.getElementById('root')

  return(
    root && createPortal(
      <AnimatePresence>
        {isOpened && (
          <StyledWrapper
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.50)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            transition={{ duration: IN_OUT_ANIMATION_DURATION_S }}
            onClick={e => {
              if (e.target === e.currentTarget) {
                onClose()
              }
            }}
          >
            <StyledModal
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
            >
              <StyledHeader>
                {header}
                <CloseButton onClick={onClose}/>
              </StyledHeader>
              {children}
            </StyledModal>
          </StyledWrapper>
        )}
      </AnimatePresence>,
      root
    )
  )
}

export default BaseModal
