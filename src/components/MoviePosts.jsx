const MoviePosts = ({ movies, loading }) => {

    if (loading) {
        return (
            <h2>Loading...</h2>
        )
    }
    return (


        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16">
            {movies.map((movie) => (
                <div key={Math.random()} className="text-white flex flex-col items-center text-center mx-auto w-[160px]">
                    <img
                        src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                        alt={`${movie.title} Poster`}
                        style={{ width: '150px', height: '225px',border: '15px solid #4353A1'}} // Adjust size as needed
                    />
                    {movie.title}

                    <p className=" pt-2">Release Date:<br/>{movie.release_date}</p>

                </div>
            ))}
        </ul>



    );
}

export default MoviePosts;