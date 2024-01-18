import React, { useState, useEffect } from "react";
import MoviePosts from "./MoviePosts";
import Pagination from "./Pagginating";
import { useMovieContext } from './MovieContext';

const HotMoviesList = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [loading, setloading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const { movies, setMovies } = useMovieContext();


  useEffect(() => {
    if (page >= 1 && !lastPage) {
      console.log('useeffect run for page:', page);

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjI5MTk1MzU0OTQzNGE3ZGZmMDFiYzEyOTFkZWYyZiIsInN1YiI6IjY1OGMzYThhZTIxMDIzMDJlZjFmODE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-T6LjuktZYN6nGH4koooOQB0ylQhpD8rzAjM-og1O_Y',
        },
      };

      fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
          if (response.results.length === 0) {
            setLastPage(true);
            return;
          }

          setMovies(prevMovies => [...prevMovies, ...response.results]);
          console.log(response);

          if (page >= response.total_pages) {
            setLastPage(true);
          }

          setPage(prevPage => prevPage + 1);
        })
        .catch(err => console.error(err));
    }
  }, [page, lastPage]);

  // Get current posts  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="">
      <h2 className="text-white  w-full text-center font-permanent-marker font-extrabold text-7xl h-auto mt-10">Upcoming Movies</h2>
      <div className=" w-full  mt-10">
        <MoviePosts movies={currentPosts} loading={loading} />
      </div>
      <div className="flex justify-center">
        <Pagination postPerPage={postsPerPage} totalPosts={movies.length} currentPage={currentPage} paginate={paginate} />
      </div>
    </div>
  );
};

export default HotMoviesList;
