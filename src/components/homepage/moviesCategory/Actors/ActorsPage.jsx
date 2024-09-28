import { useEffect, useState } from 'react';
import styles from './actors.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchActors, resetActors } from '../../../../store/movies.slice';
import { Link } from 'react-router-dom';

function ActorsPage() {
    const { actors } = useSelector((state) => state.movies)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        if (actors.length === 0) {
            setCurrentPage(prev => prev + 1);
        }
    }, [dispatch, actors.length]);

    useEffect(() => {
        if (fetching) {
            dispatch(fetchActors(currentPage));
            setCurrentPage(prevPage => prevPage + 1);
            setFetching(false);
        }
    }, [fetching, currentPage, dispatch]);

    useEffect(() => {
        dispatch(resetActors())
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    return (
        <div className={styles.actorsBlock}>
            <p className={styles.title}>Actors</p>

            <div className={styles.actors}>
                {
                    actors.map((actor) => (
                        <div className={styles.actor} key={actor.id}>
                            <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt='фото не найдено' onError={(e) => {
                                e.target.src = 'https://cdn.icon-icons.com/icons2/1709/PNG/512/user1_112358.png'
                            }} />

                            <div>
                                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            {fetching && <p>Loading...</p>}
        </div>
    );
}

export default ActorsPage;