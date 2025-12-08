import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import HomePage from "@/app/home/page";
import ArticlesPage from "@/app/articles/page";
import ArticlePage from "@/app/article/page";
import NotFoundPage from "@/app/not-found/page";

import ErrorBoundary from "@/components/common/ErrorBoundary";
import { paths } from "./paths";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: paths.home,
        element: <HomePage />,
      },
      {
        path: paths.articles,
        element: <ArticlesPage />,
      },
      {
        path: paths.article(":id"),
        element: <ArticlePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
