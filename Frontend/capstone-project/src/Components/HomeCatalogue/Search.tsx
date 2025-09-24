import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import ComponentSearch from "./ComponentSearch";
import { useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<Result[]>([]);

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
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

  

  return (
    <Container fluid style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Row>
        <div className="mt-3">
          <Form onSubmit={handleChange}>
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
                  title="Search results"
                  filterCategory="movie"
                  results={data}
                />
              </div>
            </Col>
          )}
          <Col>
            <ComponentSearch
              title="Popular searches"
              fetchCategory="searchMovie"
              filterCategory="movie"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="Trending searches"
              fetchCategory="trendingSeries"
              filterCategory="movie"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="Featured"
              fetchCategory="featuredSeries"
              filterCategory="series"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="All collections"
              fetchCategory="collection"
              filterCategory="movie"
            />
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default Search;
