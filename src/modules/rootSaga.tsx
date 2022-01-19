import { all, fork } from "redux-saga/effects";
import acrticleSaga from "./sagas/articleSaga";
import boardSaga from "./sagas/boardSaga";

export default function* rootSaga() {
  yield all([fork(boardSaga), fork(acrticleSaga)]);
}
