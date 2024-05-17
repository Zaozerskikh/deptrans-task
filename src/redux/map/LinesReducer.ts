import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MapLine} from "../../types/MapLine";

export interface LinesMapState {
  lines: MapLine[];
  linesVisible: boolean;
}

const initialState: LinesMapState = {
  lines: [],
  linesVisible: true,
};

const linesSlice = createSlice({
  name: 'lines',
  initialState,
  reducers: {
    addLine(state, action: PayloadAction<MapLine>) {
      state.lines.push(action.payload)
    },
    deleteAllLines(state) {
      state.lines = []
    },
    makeAllLinesVisible(state) {
      state.linesVisible = true
    },
    makeAllLinesInvisible(state) {
      state.linesVisible = false
    },
  },
});

export const {
  addLine,
  deleteAllLines,
  makeAllLinesVisible,
  makeAllLinesInvisible
} = linesSlice.actions;

export default linesSlice.reducer;
