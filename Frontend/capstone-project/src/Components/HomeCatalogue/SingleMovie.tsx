import { useLocation } from "react-router-dom";
import type { Result } from "../../Interface/Movie";
import MovieandSerieBackground from "./MovieandSerieBackground";

function SingleMovie() {
  const location = useLocation();
  const movie: Result = location.state as Result;

  return <MovieandSerieBackground img={movie.backdrop_path} description={movie.overview} />;
}

export default SingleMovie;
