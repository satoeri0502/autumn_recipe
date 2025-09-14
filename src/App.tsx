import { useState } from "react";
import "./App.css";
import { Contents } from "./components/contents";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

function App() {
  // Defaultは茄子
  const [categoryId, setCategoryId] = useState<string>("12-447");

  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-yellow-50">
        <header className="h-15 flex justify-center bg-amber-200">
          <Header setCategoryId={setCategoryId} />
        </header>
        <main className="flex-1 w-full justify-items-center mt-8 ">
          <Contents categoryId={categoryId} />
        </main>
        <footer className="w-full bg-amber-200 h-10 flex mt-5">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
