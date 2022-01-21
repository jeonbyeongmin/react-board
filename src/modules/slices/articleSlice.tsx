import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  views: number;
  insertDate: number;
  updateDate: number;
  boardId: number;
}

export interface ArticleState {
  article: ArticleData;
  articleList: ArticleData[];
  status: number;
  statusText: string;
}

const initialState = {
  article: {
    id: 0,
    title: "",
    content: "",
    views: 0,
    insertDate: 0,
    updateDate: 0,
    boardId: 0,
  },
  articleList: [],
  status: 0,
  statusText: "Loading",
} as ArticleState;

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    // read articles
    getArticleList: (state, action: PayloadAction<number>) => {},
    getArticleListSuccess: (state, action) => {
      state.articleList = action.payload?.data ?? [];
      state.status = action.payload?.status;
      state.statusText = action.payload?.statusText ?? "Success";
    },
    getArticleListError: (state, action) => {
      state.articleList = initialState.articleList;
      state.status = action.payload?.status ?? 500;
      state.statusText = action.payload?.statusText ?? "Network Error";
    },

    // read article
    getArticle: (state, action) => {},
    getArticleSuccess: (state, action) => {},
    getArticleError: (state, action) => {
      state.article = initialState.article;
      state.status = action.payload?.status ?? 500;
      state.statusText = action.payload?.statusText ?? "Nextwork Error";
    },

    // create article
    postArticle: (state, action) => {},
    postArticleSuccess: (state, action) => {},
    postArticleError: (state, action) => {
      state.status = action.payload?.status ?? 500;
      state.statusText = action.payload?.statusText ?? "Network Error";
    },

    // update
    updateArticleViews: (state, action) => {},
    updateArticleViewsSuccess: (
      state,
      action: PayloadAction<AxiosResponse>
    ) => {
      state.article = action.payload?.data ?? {};
      state.status = action.payload?.status;
      state.statusText = action.payload?.statusText ?? "Success";
    },
    updateArticleViewsError: (state, action) => {
      state.article = initialState.article;
      state.status = action.payload?.status ?? 500;
      state.statusText = action.payload?.statusText ?? "Nextwork Error";
    },
  },
});

export const articleReducer = articleSlice.reducer;
export const articleActions = articleSlice.actions;
