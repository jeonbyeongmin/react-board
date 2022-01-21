import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  createCommentAPI,
  deleteCommentAPI,
  getCommentListAPI,
} from "../../api/commentApi";
import { ArticleData } from "../slices/articleSlice";
import { commentActions } from "../slices/commentSlice";

function* asyncGetCommentList(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(getCommentListAPI, {
      articleId: action.payload,
    });
    yield put(commentActions.getCommentListSuccess(response));
  } catch (e: any) {
    yield put(commentActions.getCommentListSuccess(e.response));
  }
}

function* asyncCreateComment(action: PayloadAction<string>) {
  try {
    const article: ArticleData = yield select(
      (state) => state.articleReducer.article
    );
    const response: AxiosResponse = yield call(createCommentAPI, {
      id: 0,
      content: action.payload,
      boardId: article.boardId,
      articleId: article.id,
      insertDate: Date.now(),
      updateDate: Date.now(),
    });
    yield put(commentActions.createCommentSuccess(response));
    yield put(commentActions.getCommentList(article.id));
  } catch (e: any) {
    yield put(commentActions.createCommentError(e.response));
  }
}

function* asyncDeleteComment(action: PayloadAction<number>) {
  try {
    const article: ArticleData = yield select(
      (state) => state.articleReducer.article
    );
    const response: AxiosResponse = yield call(
      deleteCommentAPI,
      action.payload
    );
    yield put(commentActions.deleteCommentSuccess(response));
    yield put(commentActions.getCommentList(article.id));
  } catch (e: any) {
    yield put(commentActions.deleteCommentError(e.response));
  }
}

function* watchGetCommentList() {
  yield takeEvery(commentActions.getCommentList.type, asyncGetCommentList);
}

function* watchCreateComment() {
  yield takeEvery(commentActions.createComment.type, asyncCreateComment);
}

function* watchDeleteComment() {
  yield takeEvery(commentActions.deleteComment.type, asyncDeleteComment);
}

export default function* commentSaga() {
  yield all([
    fork(watchGetCommentList),
    fork(watchCreateComment),
    fork(watchDeleteComment),
  ]);
}
