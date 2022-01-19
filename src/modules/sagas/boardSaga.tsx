import { AxiosResponse } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getBoardListAPI } from "../../api/boardApi";
import {
  getBoardList,
  getBoardListError,
  getBoardListSuccess,
} from "../slices/boardSlice";

function* asyncGetBoardList() {
  try {
    const response: AxiosResponse = yield call(getBoardListAPI);
    yield put(getBoardListSuccess(response));
  } catch (e: any) {
    yield put(getBoardListError(e.response));
  }
}

function* watchGetBoardList() {
  yield takeEvery(getBoardList.type, asyncGetBoardList);
}

export default function* boardSaga() {
  yield all([fork(watchGetBoardList)]);
}
