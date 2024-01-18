import { createContext, useContext, useState,useEffect } from 'react';

// const MovieContext = createContext();

// export const useMovieContext = () => {
//   return useContext(MovieContext);
// };

// export const MovieProvider = ({ children }) => {
//   const [movies, setMovies] = useState([]);
//   const [originalMovies, setOriginalMovies] = useState([]);

//   const value = {
//     movies,
//     setMovies,
//   };

//   return (
//     <MovieContext.Provider value={value}>
//       {children}
//     </MovieContext.Provider>
//   );
// };

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};


export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [originalMovies, setOriginalMovies] = useState([]);
  
    const value = {
      movies,
      setMovies,
      originalMovies,
    };
  
    useEffect(() => {
      // Φορτώστε την αρχική λίστα των ταινιών κατά την αρχικοποίηση
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_API_KEY',
        },
      };
  
      fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
          setMovies(response.results);
          setOriginalMovies(response.results);
        })
        .catch(err => console.error(err));
    }, []);
  
    return (
      <MovieContext.Provider value={value}>
        {children}
      </MovieContext.Provider>
    );
  };
