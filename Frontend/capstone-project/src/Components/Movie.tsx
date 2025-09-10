import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { MovieCard, Result } from "../Interface/Movie";

function Movie() {
  const [movie, setMovie] = useState<Result[]>([]);

  const navigate: NavigateFunction = useNavigate();

  const handleClick = (item: Result) => {
    navigate(`/movie/${item.title}`, { state: item });
  };

  const fetchMovie = async () => {
    try {
      const resp = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQzY2EyYzY1OGNkMGJhMjBjODZkMmFjNmRhNjliOSIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tNTsCdoy_0ySBOuMa8ljh1wqCq3PCQQ-JYFgVTRzgVk",
          },
        }
      );
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  console.log(movie);

  return (
    <>
      <Container fluid>
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
