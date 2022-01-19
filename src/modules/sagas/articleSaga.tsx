import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getArticleListAPI } from "../../api/articleApi";
import {
  ArticleState,
  getArticleList,
  getArticleListError,
  getArticleListSuccess,
} from "../slices/articleSlice";

function* asyncGetArticleList(action: PayloadAction<ArticleState>) {
  try {
    const response: AxiosResponse = yield call(getArticleListAPI, {
      boardId: action.payload,
    });
    yield put(getArticleListSuccess(response));
  } catch (e: any) {
    yield put(getArticleListError(e.response));
  }
}
function* watchGetArticleList() {
  yield takeEvery(getArticleList.type, asyncGetArticleList);
}

export default function* acrticleSaga() {
  yield all([fork(watchGetArticleList)]);
}
