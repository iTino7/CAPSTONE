import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";
import { useNavigate } from "react-router-dom";

interface FilterSearch {
  filterFetch: string;
  filterCategory: string;
}

function CarouselInfinite({ filterFetch, filterCategory }: FilterSearch) {
  const [movie, setMovie] = useState<Result[]>([]);

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 100,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  const handleClick = (item: Result) => {
    navigate(`/${filterCategory}/${item.name}`, { state: item });
  };

  const fetchMovie = async () => {
    try {
      const resp = await fetch(`http://localhost:3002/movies/${filterFetch}`, {
        headers: {
          Authorization:
            `Bearer ${import.meta.env.API_KEY}`,
        },
      });
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      } else {
        throw new Error("Errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(movie);

  return (
    <Container fluid className="slider-container mt-5">
      <Slider {...settings}>
        {movie.map((item) => (
          <div key={item.id}>
            <img
              className="imgHover"
              onClick={() => handleClick(item)}
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              width={"100%"}
              style={{ objectFit: "cover", borderRadius: "6px", cursor: "pointer" }}
            />
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default CarouselInfinite;
