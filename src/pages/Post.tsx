import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import { articleActions } from "../modules/slices/articleSlice";
import { RootState } from "../modules/store";

function Post() {
  const { boardList, status, statusText } = useSelector(
    (state: RootState) => state.boardReducer
  );

  const dispatch = useDispatch();

  const [article, setArticle] = useState({
    boardId: 0,
    title: "",
    content: "",
  });

  // TODO : e type change
  const handleChangeArticle = (e: any) => {
    setArticle({
      ...article,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  // TODO : e type change
  const handleSubmit = (e: any) => {
    if (article?.boardId > 0 && article?.title) {
      dispatch(articleActions.postArticle(article));
    } else {
      alert("게시판 제목은 필수 값입니다.");
    }
  };

  return (
    <Layout>
      <div>
        {status === 200 && boardList.length > 0 ? (
          <div>
            <div>
              <span>게시판: </span>
              <select
                name="boardId"
                onChange={handleChangeArticle}
                value={article?.boardId ?? 0}
              >
                <option value={0} key={0}>
                  선택
                </option>
                {boardList.map((board, index) => (
                  <option value={board?.id} key={board?.id}>
                    {board?.name ?? ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>제목 : </span>
              <input
                type="text"
                name="title"
                onChange={handleChangeArticle}
                value={article?.title ?? ""}
              />
            </div>
            <div>
              <span>내용 : </span>
              <textarea
                name="content"
                onChange={handleChangeArticle}
                value={article?.content ?? ""}
              />
            </div>
            <button onClick={handleSubmit}>등록</button>
          </div>
        ) : status === 200 && boardList.length === 0 ? (
          <div>게시물 등록이 필요합니다.</div>
        ) : (
          <div>
            <div>{status}</div>
            <div>{statusText}</div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Post;
