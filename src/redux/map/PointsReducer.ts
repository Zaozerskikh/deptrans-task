import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {MapPoint} from "../../types/MapPoint";

export interface PointsMapState {
  points: MapPoint[];
  pointsVisible: boolean;
}

const initialState: PointsMapState = {
  points: [],
  pointsVisible: true,
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<MapPoint>) {
      state.points.push(action.payload)
    },
    deleteAllPoints(state) {
      state.points = []
    },
    makeAllPointsVisible(state) {
      state.pointsVisible = true
    },
    makeAllPointsInvisible(state) {
      state.pointsVisible = false
    },
  },
});

export const {
  addPoint,
  deleteAllPoints,
  makeAllPointsVisible,
  makeAllPointsInvisible
} = pointsSlice.actions;

export default pointsSlice.reducer;
