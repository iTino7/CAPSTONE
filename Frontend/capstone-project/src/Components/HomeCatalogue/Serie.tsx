import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { MovieCard, Result } from "../../Interface/Movie";

function Series() {
  const [serie, setSeries] = useState<Result[]>([]);

  const navigate: NavigateFunction = useNavigate();

  const handleClick = (item: Result) => {
    navigate(`/series/${item.name}`, { state: item });
  };

  const fetchSerie = async () => {
    try {
      const resp = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQzY2EyYzY1OGNkMGJhMjBjODZkMmFjNmRhNjliOSIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tNTsCdoy_0ySBOuMa8ljh1wqCq3PCQQ-JYFgVTRzgVk",
          },
        }
      );
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setSeries(data.results);
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSerie();
  }, []);

  return (
    <Container fluid>
      <Row>
        {serie.map((item) => (
          <Col
            onClick={() => handleClick(item)}
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            className="text-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=""
              width={"100%"}
              style={{ cursor: "pointer" }}
              className="my-3 rounded-3"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Series;
