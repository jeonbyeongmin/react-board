import axios from "./axios";
import qs from "query-string";
import { CommentData } from "../modules/slices/commentSlice";

export function getCommentListAPI(requestParams: {}) {
  return axios.get(`comments?${qs.stringify(requestParams)}`);
}

export function createCommentAPI(requestBody: CommentData) {
  return axios.post(`comments`, requestBody);
}

export function deleteCommentAPI(commendId: number) {
  return axios.delete(`comments/${commendId}`);
}
