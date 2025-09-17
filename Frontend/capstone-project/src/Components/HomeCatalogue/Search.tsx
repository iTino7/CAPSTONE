import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import ComponentSearch from "./ComponentSearch";
import { useEffect, useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<Result[]>([]);

  const handleChange = async () => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?&query=${searchInput}`,
        {
          headers: {
            Authorization:
              `Bearer ${import.meta.env.API_KEY}`,
          },
        }
      );
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setData(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchInput) handleChange();
  }, [searchInput]);

  console.log(data);
  const arrayNumber = [1241, 86311, 10, 328, 8864];
  const randomNumber = Math.floor(Math.random() * arrayNumber.length);
  console.log(arrayNumber[randomNumber]);

  return (
    <Container fluid style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Row>
        <div className="mt-3">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col xs={12}>
                <FormControl
                  type="text"
                  placeholder="Search by title, character, or genre"
                  className="bg-transparent border-0 customPlaceholder mb-5 text-white fs-3 w-100"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          {data && (
            <Col>
              <div className="slider-container mb-5">
                <ComponentSearch
                  fetchCategory={`search/movie?&query=${searchInput}`}
                  filterCategory="movie"
                />
              </div>
            </Col>
          )}
          <Col>
            <ComponentSearch
              title="Popular searches"
              fetchCategory="trending/movie/week"
              filterCategory="movie"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="Trending searches"
              fetchCategory="discover/tv"
              filterCategory="series"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="Featured"
              fetchCategory="trending/tv/week"
              filterCategory="series"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="All collections"
              fetchCategory={`collection/${arrayNumber[randomNumber]}`}
              filterCategory="movie"
            />
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default Search;
