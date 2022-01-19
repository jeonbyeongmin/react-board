import { createSlice } from "@reduxjs/toolkit";

export interface BoardData {
  id: number;
  name: string;
  insertDate: number;
  updateDate: number;
  code: string;
}

export interface BoardState {
  boardList: BoardData[];
  status: number;
  statusText: string;
}

const initialState = {
  boardList: [],
  status: 0,
  statusText: "Loading",
} as BoardState;

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    getBoardList: (state) => {},
    getBoardListSuccess: (state, action) => {
      state.boardList = action.payload?.data ?? [];
      state.status = action.payload?.status;
      state.statusText = action.payload?.statusText ?? "Success";
    },
    getBoardListError: (state, action) => {
      state.boardList = initialState.boardList;
      state.status = action.payload?.status ?? 500;
      state.statusText = action.payload?.statusText ?? "Network Error";
    },
  },
});

export const boardReducer = boardSlice.reducer;
export const { getBoardList, getBoardListSuccess, getBoardListError } =
  boardSlice.actions;
