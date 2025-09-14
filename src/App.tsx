import "./App.css";
import { Contents } from "./components/contents";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Contents />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
