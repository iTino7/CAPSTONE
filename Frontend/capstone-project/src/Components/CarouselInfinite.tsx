import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { MovieCard, Result } from "../Interface/Movie";

interface FilterSearch {
  filterFetch: string;
  popular?: string;
}

function CarouselInfinite({ filterFetch, popular }: FilterSearch) {
  const [movie, setMovie] = useState<Result[]>([]);

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

  const fetchMovie = async () => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/discover/${filterFetch}?&with_watch_providers=8&watch_region=US&${popular}page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4",
          },
        }
      );
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
  }, []);

  console.log(movie);

  return (
    <Container fluid className="slider-container mt-5">
      <Slider {...settings}>
        {movie.map((item) => (
          <div key={item.id}>
            <img
              className="imgHover"
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              width={"100%"}
              style={{ objectFit: "cover", borderRadius: "6px" }}
            />
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default CarouselInfinite;
