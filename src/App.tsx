import React, {useState} from 'react';
import CreateMapObjectModal from "./ui/modals/create_map_object_modal/CreateMapObjectModal";
import {MapObjectType} from "./types/MapObjectType";
import DefaultButton from "./ui/buttons/default_button/DefaultButton";
import styled from "styled-components";
import AppMap from "./ui/map/AppMap";
import {useDispatch, useSelector} from "react-redux";
import {deleteAllPoints, makeAllPointsInvisible, makeAllPointsVisible} from "./redux/map/PointsReducer";
import ConfirmationModal from "./ui/modals/confirmation_modal/ConfirmationModal";
import {deleteAllLines, makeAllLinesInvisible, makeAllLinesVisible} from "./redux/map/LinesReducer";
import plusIcon from './ui/icons/buttons/PlusIcon.svg'
import deleteIcon from './ui/icons/buttons/DeleteIcon.svg'
import openedEyeIcon from './ui/icons/buttons/OpenedEyeIcon.svg'
import closedEyeIcon from './ui/icons/buttons/ClosedEyeIcon.svg'
import {AnimatePresence, motion} from "framer-motion";
import {RootStoreState} from "./redux/ReduxStore";

const StyledControlsContainer = styled.div`
  display: flex;
  gap: 16px;
  position: fixed;
  bottom: 16px;
  left: 16px;
  flex-direction: column;
  width: 220px;
`

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`

const HelpersButtonsWrapper = styled(motion.div)`
  display: flex;
  gap: 8px;
  overflow: hidden;
  flex-direction: column;
`

const App: React.FC = () => {
  const [createObjectModalState, setCreateObjectModalState]
    = useState({ isOpened: false, objectType: MapObjectType.POINT })

  const [confirmationModalState, setConfirmationModalState]
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    = useState({ isOpened: false, text: '', onConfirm: () => {} })

  const dispatch = useDispatch()

  const pointsState = useSelector((state: RootStoreState) => state.points)
  const linesState = useSelector((state: RootStoreState) => state.lines)

  const renderPointsControls = () => (
    <StyledButtonsContainer>
      <DefaultButton
        onClick={() => setCreateObjectModalState({ isOpened: true, objectType: MapObjectType.POINT })}
        text={'Создать точку'}
        children={<img src={plusIcon} alt="plus"/>}
      />
      <AnimatePresence>
        {pointsState?.points?.length > 0 && (
          <HelpersButtonsWrapper
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 300 }}
            exit={{ maxHeight: 0 }}
          >
            <DefaultButton
              onClick={() => {
                setConfirmationModalState({
                  isOpened: true,
                  onConfirm: () => dispatch(deleteAllPoints()),
                  text: 'Это действие удалит все точки.<br>Вы уверены?'
                })
              }}
              text={'Удалить все точки'}
              children={<img src={deleteIcon} alt="delete"/>}
            />
            <DefaultButton
              onClick={() => dispatch(makeAllPointsInvisible())}
              children={<img src={closedEyeIcon} alt="eye-closed"/>}
              text={'Скрыть все точки'}
            />
            <DefaultButton
              onClick={() => dispatch(makeAllPointsVisible())}
              text={'Показать все точки'}
              children={<img src={openedEyeIcon} alt="eye"/>}
            />
          </HelpersButtonsWrapper>
        )}
      </AnimatePresence>
    </StyledButtonsContainer>
  )

  const renderLinesControls = () => (
    <StyledButtonsContainer>
      <DefaultButton
        onClick={() => setCreateObjectModalState({ isOpened: true, objectType: MapObjectType.LINE })}
        text={'Создать линию'}
        children={<img src={plusIcon} alt="plus"/>}
      />
      <AnimatePresence>
        {linesState?.lines?.length > 0 && (
          <HelpersButtonsWrapper
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 300 }}
            exit={{ maxHeight: 0 }}
          >
            <DefaultButton
              onClick={() => {
                setConfirmationModalState({
                  isOpened: true,
                  onConfirm: () => dispatch(deleteAllLines()),
                  text: 'Это действие удалит все линии.<br>Вы уверены?'
                })
              }}
              children={<img src={deleteIcon} alt="delete"/>}
              text={'Удалить все линии'}
            />
            <DefaultButton
              onClick={() => dispatch(makeAllLinesInvisible())}
              children={<img src={closedEyeIcon} alt="eye-closed"/>}
              text={'Скрыть все линии'}
            />
            <DefaultButton
              onClick={() => dispatch(makeAllLinesVisible())}
              text={'Показать все линии'}
              children={<img src={openedEyeIcon} alt="eye"/>}
            />
          </HelpersButtonsWrapper>
        )}
      </AnimatePresence>
    </StyledButtonsContainer>
  )

  return(
    <>
      <CreateMapObjectModal
        isOpened={createObjectModalState.isOpened}
        onClose={() => setCreateObjectModalState(prev => ({ ...prev, isOpened: false }))}
        objectType={createObjectModalState.objectType}
      />
      <ConfirmationModal
        onConfirm={confirmationModalState.onConfirm}
        text={confirmationModalState.text}
        isOpened={confirmationModalState.isOpened}
        onClose={() => setConfirmationModalState(prev => ({...prev, isOpened: false}))}
      />
      <AppMap/>
      <StyledControlsContainer>
        {renderPointsControls()}
        {renderLinesControls()}
      </StyledControlsContainer>
    </>
  )
}

export default App;
