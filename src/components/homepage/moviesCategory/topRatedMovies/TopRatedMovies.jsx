import { useSelector } from 'react-redux';
import styles from './toprated.module.scss'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function TopRatedMovies() {
    const { topRatedMovies } = useSelector((state) => state.movies)
    const containerRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const scrollLeft = () => {
        containerRef.current.scrollBy({
            left: -300,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({
            left: 300,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const container = containerRef.current;
        // Показываем левую кнопку, если не в начале
        setShowLeftButton(container.scrollLeft > -1);
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        // Проверка позиции при первой загрузке
        handleScroll();
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.topRatedContainer}>
            <p className={styles.title}>Top Rated Movies</p>

            <div className={styles.movieWrapper}>

                {showLeftButton && (
                    <span className={`material-symbols-outlined ${styles.scrollButton}`} onClick={scrollLeft}>
                        keyboard_arrow_left
                    </span>
                )}

                <div className={styles.movieContainer} ref={containerRef}>
                    {
                        topRatedMovies.slice(0, 12).map((movie) => (
                            <div key={movie.id} className={styles.movie}>
                                <Link to={`/topratedfilms/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} /></Link>

                            </div>
                        ))
                    }
                    <div className={styles.lookAll}>
                        <p>Смотреть все</p>
                        <span class="material-symbols-outlined">
                            arrow_forward
                        </span>
                    </div>

                </div>


                {showRightButton && (
                    <span className={`material-symbols-outlined ${styles.scrollButton}`} onClick={scrollRight}>
                        keyboard_arrow_right
                    </span>
                )}

            </div>
        </div>
    );
}

export default TopRatedMovies;