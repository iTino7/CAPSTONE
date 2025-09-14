import { Col, Container, Modal, Row } from "react-bootstrap";
import CustomButton from "../CustomButton";
import React, { useEffect, useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";
import { useNavigate } from "react-router-dom";
import SplitText from "../SplitText";
import ShinyText from "../ShinyText";

function AdvFetchandMovies() {
  const [movie, setMovie] = useState<Result[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [selectMovie, setSelectedMovie] = useState<Result | null>(null);

  const fetchCard = async () => {
    try {
      const resp = await fetch("http://localhost:3002/movies/card", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQzY2EyYzY1OGNkMGJhMjBjODZkMmFjNmRhNjliOSIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tNTsCdoy_0ySBOuMa8ljh1wqCq3PCQQ-JYFgVTRzgVk",
        },
      });
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      } else {
        throw new Error("Errore nel caricamento dei dati");
      }
    } catch (err) {
      if (err) setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const navigate = useNavigate();

  const handleClick = (page: string, pageNavigate: string) => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      navigate(page);
    } else {
      navigate(pageNavigate);
    }
  };

  return (
    <Container fluid className="bg-black py-4">
      <div className="d-flex flex-column align-items-center customTitleAdv">
        <h1
          className="text-center title text-white"
          style={{
            fontFamily: " DM Sans, sans-serif",
          }}
        >
          <SplitText
            text={`" See what's next "`}
            className="text-2xl font-semibold text-center"
            delay={150}
            duration={1.0}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.4}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={undefined}
          />
        </h1>
        <CustomButton
          navigate={() => handleClick("/catalogue", "/auth/signin")}
          text="Sign in"
          classCustom="btn btn-button fancy-btn d-md-flex"
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

      {error && <h2 className="text-danger text-center">{error}.</h2>}
      <Row className="textAdv d-flex justify-content-around">
        {movie.slice(0, 6).map((item) => (
          <React.Fragment key={item.id}>
            <Col key={item.id} xs={12} sm={6} md={4} lg={8}></Col>
            <Col xs={12} sm={6} md={5} lg={4} className="mb-4 mb-sm-4">
              <img
                onClick={() => setSelectedMovie(item)}
                className="rounded-3"
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                height={500}
                alt={item.name}
                style={{
                  objectFit: "contain",
                  cursor: "pointer",
                  zIndex: "2",
                  position: "relative",
                }}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}></Col>
          </React.Fragment>
        ))}
        <Modal
          show={!!selectMovie}
          onHide={() => setSelectedMovie(null)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="bg-transparent"
        >
          <Modal.Body
            className="rounded-3"
            style={{
              background: `linear-gradient(180deg,rgba(13, 13, 15, 0.10) 12%,rgba(255, 255, 255, 0) 56%,rgba(0, 0, 0, 100) 100%),url(https://image.tmdb.org/t/p/original${selectMovie?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "50vh",
            }}
          ></Modal.Body>
          <Modal.Footer className="bg-black border-0 justify-content-center">
            <div className="title text-center mb-3">
              <ShinyText
                text={selectMovie?.name}
                disabled={false}
                speed={4.5}
                className="custom-class"
              />
            </div>
            <h4 className=" text-white text-center fs-5 mb-3">
              {selectMovie?.overview}
            </h4>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
}

export default AdvFetchandMovies;
