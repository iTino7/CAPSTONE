import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdvFetchandMovies from "./Components/AdvFetchandMovies";
import AdvHome from "./Components/AdvHome";
import Home from "./Components/Home";
import PageRegister from "./Components/PageRegister";
import PageLogin from "./Components/PageLogin";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import Catalogue from "./Components/Catalogue";
import NavBarLogin from "./Components/NavBarLogin";
import Movie from "./Components/Movie";
import Series from "./Components/Serie";

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
              </>
            }
          />

          <Route path="/auth/signup" element={<PageRegister />} />
          <Route path="/auth/signin" element={<PageLogin />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<NavBarLogin />}>
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/series" element={<Series />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
