import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getArticleAPI,
  getArticleListAPI,
  postArticleAPI,
  putArticleAPI,
} from "../../api/articleApi";
import history from "../../utils/history";
import { articleActions, ArticleData } from "../slices/articleSlice";

function* asyncGetArticle(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(getArticleAPI, action.payload);
    yield put(articleActions.getArticleSuccess(response));
    // article을 Get 하는 동시에 조회수를 늘려주기 위해서 updateArticlesViews를 호출한다.
    yield put(articleActions.updateArticleViews(response.data));
  } catch (e: any) {
    yield put(articleActions.getArticleError(e.response));
  }
}

function* asyncGetArticleList(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(getArticleListAPI, {
      boardId: action.payload,
    });
    yield put(articleActions.getArticleListSuccess(response));
  } catch (e: any) {
    yield put(articleActions.getArticleListError(e.response));
  }
}

function* asyncUpdateArticleViews(action: PayloadAction<ArticleData>) {
  try {
    const response: AxiosResponse = yield call(putArticleAPI, {
      ...action.payload,
      views: (action.payload?.views ?? 0) + 1,
      updateDate: Date.now(),
    });
    yield put(articleActions.updateArticleViewsSuccess(response));
  } catch (e: any) {
    yield put(articleActions.updateArticleViewsError(e.response));
  }
}

function* asyncCreateArticle(action: PayloadAction<ArticleData>) {
  try {
    const response: AxiosResponse = yield call(postArticleAPI, {
      ...action.payload,
      id: 0,
      views: 0,
      insertDate: Date.now(),
      updateDate: Date.now(),
    });
    yield put(articleActions.postArticleSuccess(response));
    history.push(`/article/${response?.data.id ?? 0}`);
  } catch (e: any) {
    yield put(articleActions.postArticleError(e.response));
    yield alert("등록 실패");
  }
}

function* watchGetArticleList() {
  yield takeEvery(articleActions.getArticleList.type, asyncGetArticleList);
}

function* watchGetArticle() {
  yield takeEvery(articleActions.getArticle.type, asyncGetArticle);
}

function* watchUpdateArticleViews() {
  yield takeEvery(
    articleActions.updateArticleViews.type,
    asyncUpdateArticleViews
  );
}

function* watchCreateArticle() {
  yield takeEvery(articleActions.postArticle, asyncCreateArticle);
}

export default function* acrticleSaga() {
  yield all([
    fork(watchGetArticleList),
    fork(watchGetArticle),
    fork(watchUpdateArticleViews),
    fork(watchCreateArticle),
  ]);
}
