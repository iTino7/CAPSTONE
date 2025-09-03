import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import type { MovieCard, Result } from "../Interface/Movie";

function AdvFetchandMovies() {
  const [movie, setMovie] = useState<Result[]>([]);

  const fetchCard = async () => {
    try {
      const resp = await fetch("http://localhost:3002/movies/card", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3NTY4NDE4OTUsImV4cCI6MTc1NzQ0NjY5NSwic3ViIjoiMSJ9.IBt1H5GCPKoGBICveSuER3G2eKjQk7EyXtGKjyEv2ERera6S0_PqQoy6a5m3ejWV",
        },
      });
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  console.log(movie);

  return (
    <Container fluid className="bg-white py-4">
      <div className="d-flex flex-column align-items-center customTitleAdv">
        <h1
          className="text-center title"
          style={{
            fontFamily: " DM Sans, sans-serif",
          }}
        >
          "See what's next"
        </h1>
        <CustomButton
          text="Accedi"
          classCustom="fancy-btn d-md-flex"
          styleCustom={{
            color: "white",
            fontFamily: " DM Sans, sans-serif",
            backgroundColor: "red",
            fontSize: "28px",
            marginRight: "10px",
            borderRadius: "8px",
            padding: ".2rem .7rem",
          }}
        />
      </div>

      <Row className="textAdv">
        {movie.slice(0, 6).map((item) => (
          <>
            <Col xs={0} sm={6} md={6} lg={7}></Col>
            <Col
              key={item.id}
              xs={12}
              sm={6}
              md={5}
              lg={3}
              className="mb-4 mb-sm-4"
            >
              <img
                className="rounded-3 "
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                height={500}
                alt={item.name}
                style={{
                  objectFit: "contain",
                  zIndex: "2",
                  position: "relative",
                }}
              />
            </Col>

            <Col xs={12} sm={6} md={3} lg={3}></Col>
            <Col
              key={item.id}
              xs={0}
              sm={7}
              md={6}
              lg={0}
              className=" mb-4 mb-sm-4 zIndex"
            >
              <img
                className="rounded-3 "
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                height={500}
                alt={item.name}
                style={{
                  objectFit: "contain",
                  zIndex: "2",
                  position: "relative",
                }}
              />
            </Col>
          </>
        ))}
      </Row>
    </Container>
  );
}

export default AdvFetchandMovies;
