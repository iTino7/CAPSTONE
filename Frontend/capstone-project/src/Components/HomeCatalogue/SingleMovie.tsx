import { useLocation } from "react-router-dom";
import type { Result } from "../../Interface/Movie";

function SingleMovie() {
  const location = useLocation();
  const movie: Result = location.state as Result;

  return (
    <div>
      <h1 className="text-white">{movie.title}</h1>
    </div>
  );
}

export default SingleMovie;
