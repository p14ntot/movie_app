import HotMoviesList from "./components/HotMoviesList"
import SearchBar from "./components/SearchBar"
import { MovieProvider } from "./components/MovieContext"
function App() {
  return (
    <>
      <div className="  h-auto bg-gray-900 overflow-x-hidden " >
        <MovieProvider>
          <div>
            <SearchBar />
          </div>


          <HotMoviesList />

        </MovieProvider>
      </div>
    </>
  )
}

export default App


App.js

