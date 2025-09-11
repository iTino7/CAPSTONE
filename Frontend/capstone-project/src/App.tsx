import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdvFetchandMovies from "./Components/Home/AdvFetchandMovies";
import AdvHome from "./Components/Home/AdvHome";
import Home from "./Components/Home/Home";

import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import Catalogue from "./Components/HomeCatalogue/Catalogue";

import Movie from "./Components/HomeCatalogue/Movie";
import Series from "./Components/HomeCatalogue/Serie";

import SingleMovie from "./Components/HomeCatalogue/SingleMovie";
import SingleSerie from "./Components/HomeCatalogue/SingleSerie";
import PageRegister from "./Components/PageLoginAndRegister/PageRegister";
import PageLogin from "./Components/PageLoginAndRegister/PageLogin";

import NavBarLogin from "./Components/HomeCatalogue/NavBarLogin";
import VerifyEmail from "./Components/PageLoginAndRegister/VerifyEmail";
import VerifyOtp from "./Components/PageLoginAndRegister/VerifyOtp";
import ChangePassword from "./Components/PageLoginAndRegister/ChangePassword";
import Subscription from "./Components/PageLoginAndRegister/Subscription";
import PlansHome from "./Components/Home/PlansHome";
import FAQ from "./Components/Home/Faq";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <AdvHome />
                <AdvFetchandMovies />
                <PlansHome />
                <FAQ />
              </>
            }
          />

          <Route path="/auth/signup" element={<PageRegister />} />
          <Route path="/auth/signin" element={<PageLogin />} />
          <Route path="/plans" element={<Subscription />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<NavBarLogin />}>
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/series" element={<Series />} />
              <Route path="/movie/:movieId" element={<SingleMovie />} />
              <Route path="/series/:serieId" element={<SingleSerie />} />
            </Route>
          </Route>
          <Route path="/forgotPassword/verifyEmail" element={<VerifyEmail />} />
          <Route path="/forgotPassword/verifyOtp" element={<VerifyOtp />} />
          <Route
            path="/forgotPassword/changePassword"
            element={<ChangePassword />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
