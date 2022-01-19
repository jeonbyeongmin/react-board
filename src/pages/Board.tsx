import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardList } from "../modules/slices/boardSlice";
import { RootState } from "../modules/store";

function Board() {
  const { boardList, status, statusText } = useSelector(
    (state: RootState) => state.boardReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardList());
  }, [dispatch]);

  return (
    <div>
      {status === 200 ? (
        <ul>
          <li>
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          {boardList.length > 0 ? (
            boardList.map((board) => (
              <li key={board?.id}>
                <Link to={`/board/${board?.id}`}>
                  <span>{board?.name}</span>
                </Link>
              </li>
            ))
          ) : (
            <div> 게시판이 없습니다. </div>
          )}
        </ul>
      ) : (
        <div>
          <div>{status}</div>
          <div>{statusText}</div>
        </div>
      )}
    </div>
  );
}

export default Board;
