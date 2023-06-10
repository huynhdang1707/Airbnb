import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center">
          <img src="/img/loading.gif" class="img-fluid" alt="" />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
