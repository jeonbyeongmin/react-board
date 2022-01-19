import axios from "./axios";

export function getBoardAPI(boardId: number) {
  return axios.get(`boards/${boardId}`);
}

export function getBoardListAPI() {
  return axios.get(`boards`);
}
