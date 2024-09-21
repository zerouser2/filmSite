import { useEffect, useRef, useState } from 'react';
import styles from './homepage.module.scss';
import { addPopularMovies, addTopRatedMovies, fetchPopularMovies, fetchPopularSeries, fetchTopRatedMovies, fetchUpcoming } from '../../store/movies.slice';
import { useDispatch, useSelector } from 'react-redux';
import PopularMovies from './moviesCategory/popularMovies/PopularMovies';
import TopRatedMovies from './moviesCategory/topRatedMovies/TopRatedMovies';
import Trailers from './moviesCategory/trailers/Trailers';


function RightBlock() {
    const dispatch = useDispatch();

    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(state => state.movies);

    useEffect(() => {
      if (popularMovies.length === 0) {
        dispatch(fetchPopularMovies());
      }
      if (topRatedMovies.length === 0) {
        dispatch(fetchTopRatedMovies());
      }
      if(upComingMovies.length === 0) {
        dispatch(fetchUpcoming())
      }
    }, [dispatch, popularMovies.length, topRatedMovies.length, upComingMovies.length]);


    return (
        <div className={styles.rightPiece}>
            <PopularMovies />
            <TopRatedMovies />
            <Trailers />
        </div>
    );
}

export default RightBlock;