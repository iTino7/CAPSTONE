import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { MovieCard, Result } from "../../Interface/Movie";
import LoadingSpinner from "../LoadingSpinner";
import { API_URL } from "../../config/api";

function Series() {
  const [serie, setSeries] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate: NavigateFunction = useNavigate();

  const handleClick = (item: Result) => {
    navigate(`/series/${item.name.replace(/\s+/g, '_')}`, { state: item });
  };

  const fetchSerie = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(
        `${API_URL}/movies/series`,
        {
          headers: {
            Authorization:
              `Bearer ${import.meta.env.API_KEY}`,
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
      // Error fetching series
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSerie();
  }, []);

  if (isLoading) {
    return <LoadingSpinner className="min-vh-100" text="Loading series..." />;
  }

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
