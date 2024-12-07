import { useEffect } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css';

function View() {
  const { movie, setMovie } = useMovieContext();
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => setMovie(response.data))
        .catch((error) => {
          console.error(error);
          navigate('/');
        });
    }
  }, [movieId, navigate, setMovie]);

  return (
    <div className="View">
      {movie && (
        <>
          <div className="View-header">
            <img
              className="View-poster"
              src={movie.posterPath || '/default-poster.jpg'}
              alt={`${movie.title} Poster`}
            />
            <div className="View-details">
              <h1 className="View-title">{movie.title}</h1>
              <p className="View-overview">{movie.overview}</p>
            </div>
          </div>

          <div className="View-sections">
            {movie.casts && movie.casts.length > 0 && (
              <div className="View-section">
                <h2 className="View-section-title">Cast & Crew</h2>
                <div className="View-cast-grid">
                  {movie.casts.map((cast, index) => (
                    <div className="View-cast-card" key={index}>
                      <img
                        src={cast.image || '/default-avatar.jpg'}
                        alt={cast.name}
                        className="View-cast-image"
                      />
                      <p className="View-cast-name">{cast.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.videos && movie.videos.length > 0 && (
              <div className="View-section">
                <h2 className="View-section-title">Videos</h2>
                <div className="View-video-grid">
                  {movie.videos.map((video, index) => (
                    <div key={index} className="View-video-card">
                      <iframe
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="View-video-frame"
                      ></iframe>
                      <p className="View-video-title">{video.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.photos && movie.photos.length > 0 && (
              <div className="View-section">
                <h2 className="View-section-title">Photos</h2>
                <div className="View-photo-grid">
                  {movie.photos.map((photo, index) => (
                    <img
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="View-photo"
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default View;