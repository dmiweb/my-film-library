import { Link } from "react-router-dom";

const DetailsButton = ({ idMovie }: { idMovie: string }) => {
  return (
    <Link to={`/movie/${idMovie}`} className="movies-list__movie-link">
      <button className="movie__details-btn">Подробнее</button>
    </Link>
  );
}

export default DetailsButton;