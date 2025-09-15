import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Contents } from "./components/contents";
import { Top } from "./components/top";
import { AppLayout } from "./Layout";
function App() {
  // Defaultは茄子

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Top />} />
            <Route path="/recipe" element={<Contents />} />
            <Route path="*" element={<Top />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
