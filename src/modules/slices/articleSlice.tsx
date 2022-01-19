import { createSlice } from "@reduxjs/toolkit";

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
  articleList: ArticleData[];
  status: number;
  statusText: string;
}

const initialState = {
  articleList: [],
  status: 0,
  statusText: "Loading",
} as ArticleState;

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticleList: (state, action) => {},
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
  },
});

export const articleReducer = articleSlice.reducer;
export const { getArticleList, getArticleListSuccess, getArticleListError } =
  articleSlice.actions;
