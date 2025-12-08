import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900">
      <Header />
      <ScrollRestoration/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
