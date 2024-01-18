
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useMovieContext } from './MovieContext';

const SearchBar = () => {
  const { originalMovies } = useMovieContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [emptySearch,setEmptySearch] = useState(true);

  useEffect(() => {
    // Φιλτράρετε τις ταινίες βάσει του searchTerm και ενημερώνετε το filteredMovies state
    const filtered = originalMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, originalMovies]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if(e.target.value !== ''){
        setEmptySearch(false)
    }
  };

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <form className="relative w-10/12 min-w-[140px] rounded-full h-auto hover:border-transparent ">
        <div className="relative ">
          <input
            type="text"
            placeholder="SEARCH HERE"
            className="w-full rounded-full p-4 h-6 focus:outline-none mt-5 ml-3 hover:shadow-lg focus:shadow-xl shadow-md text-center"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 rounded-full  p-1 -translate-y-1/2 h-6 mt-3"
          >
            <IoSearch />
          </button>
        </div>
      </form>

      {!emptySearch && searchTerm !== '' &&(
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16">
    {filteredMovies.map(movie => (
      <div key={Math.random()} className="text-white flex flex-col items-center text-center mx-auto w-[160px]">
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          style={{ width: '150px', height: '225px', border: '15px solid #4353A1' }}
        />
        {movie.title}
        <p className="pt-2">Release Date:<br />{movie.release_date}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default SearchBar;
