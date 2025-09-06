import { useLocation } from "react-router-dom";
import type { Result } from "../Interface/Movie";

function SingleSerie() {
  const location = useLocation();
  const series: Result = location.state as Result;
  return <h1 className="text-white">{series.name}</h1>;
}

export default SingleSerie;
