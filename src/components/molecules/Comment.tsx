import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "../../modules/slices/commentSlice";
import { RootState } from "../../modules/store";

interface CommentProps {
  articleId: number;
}

function Comment({ articleId }: CommentProps) {
  const [comment, setComment] = useState<string>("");

  const { commentList, status, statusText } = useSelector(
    (state: RootState) => state.commentReducer
  );

  const dispatch = useDispatch();

  const handleInsertComment = () => {
    dispatch(commentActions.createComment(comment));
    setComment("");
  };

  const handleDeleteComment = (commentId: number) => {
    if (!window.confirm("삭제하시겠습니까?")) return false;
    dispatch(commentActions.deleteComment(commentId));
  };

  useEffect(() => {
    dispatch(commentActions.getCommentList(articleId));
  }, [dispatch, articleId]);

  return (
    <div>
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleInsertComment}>등록</button>
      </div>
      <div>
        {status === 200 ? (
          commentList.length > 0 ? (
            commentList.map((comment, index) => (
              <div key={comment?.id ?? index}>
                <div key={comment?.id ?? index}>
                  <span>{comment?.content ?? ""}</span>
                </div>
                <div>
                  <span>
                    {comment?.insertDate
                      ? new Date(comment?.insertDate).toLocaleString()
                      : ""}
                  </span>
                </div>
                <div>
                  <button onClick={() => handleDeleteComment(comment?.id ?? 0)}>
                    X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )
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
      </div>
    </div>
  );
}

export default Comment;
