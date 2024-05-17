import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import pointsReducer from "./map/PointsReducer";
import linesReducer from "./map/LinesReducer";

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  points: pointsReducer,
  lines: linesReducer
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export {store, persistor}
export type RootStoreState = ReturnType<typeof store.getState>
