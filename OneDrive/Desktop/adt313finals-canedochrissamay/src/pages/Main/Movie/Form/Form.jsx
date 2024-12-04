import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const navigate = useNavigate();
  let { movieId } = useParams();

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
      },
    }).then((response) => {
      setSearchedMovieList(response.data.results);
    });
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.original_title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    axios({
      method: 'post',
      url: '/movies',
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        alert('Success');
        navigate('/main/movies'); // Navigate to the movie list
      })
      .catch((error) => {
        console.error(error);
        alert('Success!!');
      });
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
      });
    }
  }, [movieId]);

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>

      {movieId === undefined && (
        <>
          <div className='search-container'>
            Search Movie:{' '}
            <input
              type='text'
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type='button' onClick={handleSearch}>
              Search
            </button>
            <div className='searched-movie'>
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
          </div>
          <hr />
        </>
      )}

      <div className='container'>
        <form>
          {selectedMovie ? (
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt='Poster'
            />
          ) : (
            ''
          )}
          <div className='field'>
            Title:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.original_title : ''}
              onChange={(event) =>
                setSelectedMovie({
                  ...selectedMovie,
                  original_title: event.target.value,
                })
              }
            />
          </div>
          <div className='field'>
            Overview:
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ''}
              onChange={(event) =>
                setSelectedMovie({
                  ...selectedMovie,
                  overview: event.target.value,
                })
              }
            />
          </div>

          <div className='field'>
            Popularity:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.popularity : ''}
              onChange={(event) =>
                setSelectedMovie({
                  ...selectedMovie,
                  popularity: event.target.value,
                })
              }
            />
          </div>

          <div className='field'>
            Release Date:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.release_date : ''}
              onChange={(event) =>
                setSelectedMovie({
                  ...selectedMovie,
                  release_date: event.target.value,
                })
              }
            />
          </div>

          <div className='field'>
            Vote Average:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.vote_average : ''}
              onChange={(event) =>
                setSelectedMovie({
                  ...selectedMovie,
                  vote_average: event.target.value,
                })
              }
            />
          </div>

          <button type='button' onClick={handleSave}>
            Save
          </button>
        </form>
      </div>

      {movieId !== undefined && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className='tabs'>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/cast-and-crews`);
                }}
              >
                Cast & Crews
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/videos`);
                }}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/photos`);
                }}
              >
                Photos
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      )}
    </>
  );
};

export default Form;
