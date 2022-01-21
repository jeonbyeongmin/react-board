import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Layout from "../components/Layout";
import { articleActions } from "../modules/slices/articleSlice";
import { RootState } from "../modules/store";
import Comment from "../components/molecules/Comment";

function Article() {
  const params = useParams<{ articleId: string }>();
  const { article, status, statusText } = useSelector(
    (state: RootState) => state.articleReducer
  );
  const boardList = useSelector(
    (state: RootState) => state.boardReducer.boardList
  );
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(articleActions.getArticle(Number(params?.articleId ?? 0)));
  }, [dispatch, params?.articleId]);

  return (
    <Layout>
      {status === 200 ? (
        <>
          <div>
            <span>게시판: </span>
            <span>
              {boardList.length > 0 &&
                boardList.find((board) => board.id === article?.boardId)?.name}
            </span>
          </div>
          <div>
            <div>
              <span>제목: </span>
              <span>{article?.title ?? ""}</span>
            </div>
            <div>
              <span>조회수: </span>
              <span>{article?.views ?? ""}</span>
            </div>
            <div>
              <span>작성일시: </span>
              <span>
                {article.insertDate
                  ? new Date(article?.insertDate).toLocaleString()
                  : ""}
              </span>
            </div>
            <div>
              <span>내용: </span>
              <span>{article?.content ?? ""}</span>
            </div>
          </div>
          <div>
            <Comment articleId={Number(params?.articleId ?? 0)} />
          </div>
        </>
      ) : (
        <div>
          <div>
            <span>{status}</span>
          </div>
          <div>
            <span>{statusText}</span>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Article;
