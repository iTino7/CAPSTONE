import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import type { MovieCard, Result } from "../../Interface/Movie";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  title?: string;
  fetchCategory: string;
  filterCategory?: string;
}

function ComponentSearch({
  title,
  fetchCategory,
  filterCategory,
}: SearchProps) {
  const [data, setData] = useState<Result[]>([]);

  const navigate = useNavigate();

  const handleClick = (item: Result) => {
    navigate(`/${filterCategory}/${item.name || item.title}`, { state: item });
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
        },
      },
    ],
  };

  const fetchData = async () => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/${fetchCategory}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQzY2EyYzY1OGNkMGJhMjBjODZkMmFjNmRhNjliOSIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tNTsCdoy_0ySBOuMa8ljh1wqCq3PCQQ-JYFgVTRzgVk`,
          },
        }
      );
      if (resp.ok) {
        const respData: MovieCard = await resp.json();
        setData(respData.parts || respData.results);
      } else {
        console.error("Error fetching data:", resp.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategory]);

  console.log(data);

  return (
    <Col>
      <h3 className="text-white mb-4 fs-3">{title}</h3>
      <div className="slider-container mb-5">
        <Slider {...settings}>
          {data.map((item) => (
            <img
              onClick={() => handleClick(item)}
              style={{ cursor: "pointer", zIndex: 1, position: "relative" }}
              key={item.id}
              alt={item.title || item.name}
              className="img-fluid rounded"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              width={200}
            />
          ))}
        </Slider>
      </div>
    </Col>
  );
}

export default ComponentSearch;
