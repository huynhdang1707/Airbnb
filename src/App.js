import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";

const AuthLayout = lazy(() => import("./layouts/AuthLayout/AuthLayout.jsx"));
const SignIn = lazy(() => import("./modules/Auth/Signin/Signin.jsx"));
const SignUp = lazy(() => import("./modules/Auth/Signup/Signup.jsx"));
const Home = lazy(() => import("./modules/Home/Home.jsx"))
const AirDetails = lazy(() => import("./modules/AirDetails/AirDetails.jsx"))

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
            <Route index element={<Home/>}/>
            <Route path="phong-thue/:id" element={<AirDetails/>}/>
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
