import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const ArticleList = lazy(() => import("./pages/ArticleList"));
  const Article = lazy(() => import("./pages/Article"));
  const Post = lazy(() => import("./pages/Post"));
  const Control = lazy(() => import("./pages/Control"));

  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/board/:boardId"} element={<ArticleList />} />
        <Route path={"/article/:articleId"} element={<Article />} />
        <Route path={"/insert"} element={<Post />} />
        <Route path={"/update/:articleId"} element={<Post />} />
        <Route path={"/control"} element={<Control />} />
      </Routes>
    </Suspense>
  );
}

export default App;
