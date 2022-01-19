import axios from "./axios";
import qs from "query-string";

export function getArticleAPI(articleId: number) {
  return axios.get(`articles/${articleId}`);
}

export function getArticleListAPI(requestParams: {}) {
  return axios.get(`articles?${qs.stringify(requestParams)}`);
}
