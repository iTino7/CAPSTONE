import { useLocation, useNavigate } from "react-router-dom";
import type { Result } from "../../Interface/Movie";
import MovieandSerieBackground from "./MovieandSerieBackground";

function SingleSerie() {
  const location = useLocation();
  const navigate = useNavigate();
  const series: Result | null = location.state as Result | null;

  if (!series) {
    navigate("/series");
    return null;
  }

  return (
    <MovieandSerieBackground
      img={series.backdrop_path}
      description={series.overview}
      title={series.title}
      name={series.name}
      movieId={series.id.toString()}
      poster={series.poster_path}
    />
  );
}

export default SingleSerie;
