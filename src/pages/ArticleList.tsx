import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { articleActions } from "../modules/slices/articleSlice";
import { RootState } from "../modules/store";

function ArticleList() {
  const params = useParams<{ boardId: string }>();
  const { articleList, status, statusText } = useSelector(
    (state: RootState) => state.articleReducer
  );
  const boardList = useSelector(
    (state: RootState) => state.boardReducer.boardList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(articleActions.getArticleList(Number(params?.boardId ?? 0)));
  }, [dispatch, params?.boardId]);

  return (
    <Layout>
      {status === 200 ? (
        <>
          <div>
            <span>게시판: </span>
            <span>
              {boardList.length > 0 &&
                boardList.find((board) => String(board.id) === params?.boardId)
                  ?.name}
            </span>
          </div>
          {articleList.length > 0 ? (
            <div>
              <div>
                {articleList.map((article, index) => (
                  <div key={article?.id ?? index}>
                    <Link to={`/article/${article?.id ?? 0}`}>
                      <span>{article?.title ?? ""}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div> 게시글이 없습니다. </div>
          )}
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

export default ArticleList;
