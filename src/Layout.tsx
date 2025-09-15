import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function AppLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-yellow-50">
        <header className="h-12 flex justify-center bg-amber-200">
          <Header />
        </header>
        <main className="flex-1 w-full flex justify-items-center mt-5">
          <Outlet />
        </main>
        <footer className="w-full bg-amber-200 h-10 flex mt-5">
          <Footer />
        </footer>
      </div>
    </>
  );
}
