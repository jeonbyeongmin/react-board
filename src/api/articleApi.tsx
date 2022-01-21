import axios from "./axios";
import qs from "query-string";
import { ArticleData } from "../modules/slices/articleSlice";

export function getArticleAPI(articleId: number) {
  return axios.get(`articles/${articleId}`);
}

export function getArticleListAPI(requestParams: {}) {
  return axios.get(`articles?${qs.stringify(requestParams)}`);
}

export function putArticleAPI(requestBody: ArticleData) {
  return axios.put(`articles/${requestBody?.id}`, requestBody);
}

export function postArticleAPI(requestBody: ArticleData) {
  return axios.post(`articles/`, requestBody);
}
