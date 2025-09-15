import { useLocation } from "react-router-dom";
import type { Result } from "../../Interface/Movie";
import MovieandSerieBackground from "./MovieandSerieBackground";

function SingleSerie() {
  const location = useLocation();
  const series: Result = location.state as Result;

  return <MovieandSerieBackground img={series.backdrop_path} description={series.overview} />;
}

export default SingleSerie;
