import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { MovieCard, Result } from "../../Interface/Movie";
import LoadingSpinner from "../LoadingSpinner";
import { API_URL } from "../../config/api";

function Movie() {
  const [movie, setMovie] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate: NavigateFunction = useNavigate();

  const handleClick = (item: Result) => {
    navigate(`/movie/${item.title}`, { state: item });
  };

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${API_URL}/movies/movies`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.API_KEY}`,
        },
      });
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  

  if (isLoading) {
    return <LoadingSpinner className="min-vh-100" text="Loading movies..." />;
  }

  return (
    <>
      <Container fluid style={{ position: "relative" }}>
        <Row>
          {movie?.map((item) => (
            <Col
              key={item.id}
              xs={12}
              sm={4}
              md={3}
              lg={2}
              className="text-center"
            >
              <img
                onClick={() => handleClick(item)}
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt=""
                width={"100%"}
                className="my-3 rounded-3 pe-auto"
                style={{ cursor: "pointer" }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Movie;
