import { useSelector } from 'react-redux';
import styles from './trailers.module.scss'
import { useEffect, useRef, useState } from 'react';
import TrailerModal from './TrailerModal';

function Trailers() {
    const { popularMovies, upComingMovies } = useSelector((state) => state.movies)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (trailerKey) => {
        setIsModalOpen(trailerKey);
    };

    const handleCloseModal = () => {
        setIsModalOpen(null);
    };
    
    console.log(upComingMovies)

    return (
        <div className={styles.trailersContainer}>
            <div className={styles.trailers}>
                <p className={styles.title}>Last Trailers</p>
                
                <div className={styles.trailerBlock} >
                    {
                        upComingMovies.map((movie) => {
                            return (
                                <div className={styles.trailer}>
                                    <div>
                                        <img
                                            src={`https://img.youtube.com/vi/${movie.trailerKey}/hqdefault.jpg`} // Превью с YouTube
                                            alt="Trailer preview"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleOpenModal(movie.trailerKey)}
                                        />
                                        <span className={`material-symbols-outlined ${styles.play}`} onClick={() => handleOpenModal(movie.trailerKey)}>
                                            play_arrow
                                        </span>
                                    </div>  
                                    <p>{movie.title}</p>

                                </div>
                            )
                        })
                    }

                    {isModalOpen && (
                        <TrailerModal trailerKey={isModalOpen} onClose={handleCloseModal} />
                    )}

                </div>

            </div>
        </div>
    );
}

export default Trailers;