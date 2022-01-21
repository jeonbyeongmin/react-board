import { createSlice } from "@reduxjs/toolkit";

export interface CommentData {
  id: number;
  content: string;
  insertDate: number;
  updateDate: number;
  boardId: number;
  articleId: number;
}

export interface CommentState {
  commentList: CommentData[];
  status: number;
  statusText: string;
}

const initialState = {
  commentList: [],
  status: 0,
  statusText: "Loading",
} as CommentState;

const commentSlice = createSlice({
  name: "commnet",
  initialState,
  reducers: {
    // comment read
    getCommentList: (state, action) => {},
    getCommentListSuccess: (state, action) => {
      state.commentList = action.payload?.data ?? [];
      state.status = action.payload?.status;
      state.statusText = action.payload?.statusText ?? "Success";
    },
    getCommentListError: (state, action) => {
      state.commentList = initialState.commentList;
      state.status = action.payload?.status ?? 500;
      state.statusText = action.payload?.statusText ?? "Network Error";
    },

    // create comment
    createComment: (state, action) => {},
    createCommentSuccess: (state, action) => {},
    createCommentError: (state, action) => {},

    // delete comment
    deleteComment: (state, action) => {},
    deleteCommentSuccess: (state, action) => {},
    deleteCommentError: (state, action) => {},
  },
});

export const commentReducer = commentSlice.reducer;
export const commentActions = commentSlice.actions;
