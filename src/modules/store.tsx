import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import rootSaga from "./rootSaga";
import { articleReducer } from "./slices/articleSlice";
import { boardReducer } from "./slices/boardSlice";
import { commentReducer } from "./slices/commentSlice";

const sagaMiddleware = createSagaMiddleware({});

const initialState = {};

const store = configureStore({
  reducer: { articleReducer, boardReducer, commentReducer },
  middleware: [sagaMiddleware, logger],
  devTools: true,
  preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
