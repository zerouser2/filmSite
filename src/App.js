import Header from "./components/header/Header";
import HomePage from "./components/homepage/Homepage";
import Actor from "./components/homepage/moviesCategory/Actors/Actor";
import ActorsPage from "./components/homepage/moviesCategory/Actors/ActorsPage";
import MoviePage from "./components/homepage/moviesCategory/MoviePage";
import PopularMovPage from "./components/homepage/moviesCategory/popularMovies/PopularMovPage";
import TopRatedMoviesPage from "./components/homepage/moviesCategory/topRatedMovies/TopRatedMoviesPage";
import Main from "./components/main/Main";
import './index.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={
            <>
              <Header />
              <Main />
            </>
          } />

          <Route path="homepage" element={
            <>
              <HomePage />
            </>
          } />

          <Route path="popularfilms/:id" element={<PopularMovPage />} />
          <Route path="topratedfilms/:id" element={<TopRatedMoviesPage />} />
          <Route path="films/:id" element={<MoviePage />} />
          

          <Route path="actors" element={
            <>
              <Header />
              <ActorsPage />
            </>
          } />

          <Route path="actors/:id" element={
            <>
              <Header />
              <Actor />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
