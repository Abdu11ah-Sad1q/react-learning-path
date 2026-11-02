import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Header and footer are written only here.
// The page content is shown where <Outlet /> is.
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-3xl mx-auto p-4 flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
