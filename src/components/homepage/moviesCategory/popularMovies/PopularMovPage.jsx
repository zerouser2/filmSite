import { useParams } from "react-router";
import Header from "../../../header/Header";
import styles from './popularmovpage.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../../../store/movies.slice";
import Trailers from "../trailers/Trailers";
import TrailerModal from "../trailers/TrailerModal";

function PopularMovPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { popularMovies } = useSelector((state) => state.movies)

    const movie = popularMovies.find(m => m.id === parseInt(id))

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [crew, setCrew] = useState({
        writer: '',
        producer: '',

    })

    const handleOpenModal = (trailerKey) => {
        setIsModalOpen(trailerKey);
    };

    const handleCloseModal = () => {
        setIsModalOpen(null);
    };

    useEffect(() => {
        if (popularMovies.length === 0) {
            dispatch(fetchPopularMovies())
        }

    }, [dispatch, popularMovies.length])

    useEffect(() => {
        if (movie) {
            const writer = movie.credits.crew.find(w => w.job === 'Writer')
            const producer = movie.credits.crew.find(p => p.job === 'Producer')

            setCrew({ writer, producer });

            console.log(crew)
        }
    }, [movie])

    console.log(movie)

    if (!movie) return <h1>Loading...</h1>

    return (
        <div className={styles.specificMoviePage}>
            <Header />
            <div className={styles.moviePage}>

                <div className={styles.bgBlock}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className={styles.background} />
                    <div className={styles.specificMovie}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />

                        <div className={styles.info}>
                            <p className={styles.titleMovie}>{movie.title} </p>
                            <p>{movie.release_date}</p>

                            <div className={styles.rating}>
                                <p>Movie Rating</p>
                                <p>{movie.vote_average}</p>
                            </div>

                            <div className={styles.actions}>
                                <span className={`material-symbols-outlined ${styles.favorites}`}>
                                    bookmark
                                </span>
                                <div>
                                    <span class="material-symbols-outlined">
                                        play_arrow
                                    </span>
                                    <p>Play trailer</p>
                                </div>
                            </div>

                            <div className={styles.desc}>
                                <p>Description</p>
                                <p>{movie.overview}</p>
                            </div>

                            <div className={styles.writers}>
                                <p>{movie.credits.crew[0].name}</p>
                                <p>{movie.credits.crew[0].job}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.someDiv}>

                <div className={styles.creditsBlock}>
                    <div className={styles.actors}>

                        <p className={styles.title}>Actors</p>

                        <div className={styles.actorsWrapper}>
                            {
                                movie.credits.cast.slice(0, 10).map((credit) => (
                                    <div className={styles.actor}>
                                        <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} alt="Фото не найдено" />

                                        <div>
                                            <p>{credit.name}</p>
                                            <p>{credit.character}</p>
                                        </div>
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
                        
                    </div>

                    <div className={styles.aboutFilm}>
                        <p className={styles.title}>О фильме</p>

                        <div className={styles.line}>
                            <div>
                                <p className={styles.ttls}>Genre: </p>

                                <div>
                                    {crew ? movie.littleInfo.genres.map((genre) => (
                                        <p>{genre.name}</p>
                                    )) : <p>Loading</p>}
                                </div>
                            </div>

                            <div>
                                <p className={styles.ttls}>Country: </p>
                                <p>{movie.littleInfo.origin_country[0]}</p>
                            </div>

                            {
                                crew.producer ? (
                                    <div>
                                        <p className={styles.ttls}>Producer: </p>
                                        <p>{crew.producer.name}</p>
                                    </div>
                                ) : ''
                            }   

                            <div>
                                <p className={styles.ttls}>Duration: </p>

                                <p>{movie.littleInfo.runtime}m</p>
                            </div>

                            <div>
                                <p className={styles.ttls}>Production Companies: </p>

                                <div>
                                    {
                                        movie.littleInfo.production_companies.map((p) => (
                                            <p>{p.name}</p>
                                        ))
                                    }
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className={styles.trailerBlock}>

                        <p>Трейлеры фильма</p>

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


                        </div>

                        {isModalOpen && (

                            <div className={styles.modalOverlay} onClick={handleCloseModal}>
                                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                    <button className={styles.closeBtn} onClick={handleCloseModal}>X</button>
                                    <iframe
                                        width="100%"
                                        height="500px"
                                        src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                                        title="Movie Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                        )}
                    </div>

                </div>

                <div className={styles.someInfoBlock}>

                    <div className={styles.info}>
                        <p>Original language: <br /><span>{movie.original_language === 'en' ? 'English' : ''}</span></p>

                        <p>Status: <br /> <span>{movie.littleInfo.status}</span></p>

                        <p>Budget: <br /> <span>{movie.littleInfo.budget}$</span></p>

                        <p>Keywords</p>

                        <div className={styles.keywords}>
                            {
                                movie.keywords.keywords.map((keyword) => (
                                    <div className={styles.keyword}>{keyword.name}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularMovPage;