import { useLocation, useNavigate } from "react-router-dom";
import type { Result } from "../../Interface/Movie";
import MovieandSerieBackground from "./MovieandSerieBackground";

function SingleMovie() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie: Result | null = location.state as Result | null;

  if (!movie) {
    navigate("/movie");
    return null;
  }

  return (
    <MovieandSerieBackground
      img={movie.backdrop_path}
      description={movie.overview}
      title={movie.title}
      name={movie.name}
      movieId={movie.id.toString()}
      poster={movie.poster_path}
    />
  );
}

export default SingleMovie;
