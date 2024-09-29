import { useEffect, useState } from "react";
import Header from "../../header/Header";
import { useParams } from "react-router";
import styles from './topRatedMovies/topratedmoviespage.module.scss'
import { Link } from "react-router-dom";

function MoviePage() {
    const { id } = useParams()

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [datas, setDatas] = useState({
        credits: '',
        videos: '',
        keywords: ''
    })

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
        const fetchData = async () => {
            try {
                const promises = [
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=32e298a0ed54b91c64093a45759e40aa`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=32e298a0ed54b91c64093a45759e40aa`), // Example of another request
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=32e298a0ed54b91c64093a45759e40aa`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=32e298a0ed54b91c64093a45759e40aa`), // Example of another request
                ];

                const responses = await Promise.all(promises);

                // Check if all responses are ok
                responses.forEach(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                });

                // Parse all responses
                const [movieData, keywordsData, creditsData, videosData] = await Promise.all(responses.map(response => response.json()));

                setMovie(movieData)

                setDatas({
                    ...datas,
                    credits: creditsData,
                    videos: videosData,
                    keywords: keywordsData
                })

                console.log(movie, datas);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>

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
                                <p>{datas.credits.crew[0].name}</p>
                                <p>{datas.credits.crew[0].job}</p>
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
                                datas.credits.cast.slice(0, 10).map((credit) => (

                                    <div className={styles.actor}>
                                        <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} alt="Фото не найдено" />

                                        <div>
                                            <Link to={`/actors/${credit.id}`}><p>{credit.name}</p></Link>
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
                                    {movie.genres.map((genre) => (
                                        <p>{genre.name}</p>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className={styles.ttls}>Country: </p>
                                <p>{movie.origin_country[0]}</p>
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

                                <p>{movie.runtime}m</p>
                            </div>

                            <div>
                                <p className={styles.ttls}>Production Companies: </p>

                                <div>
                                    {
                                        movie.production_companies.map((p) => (
                                            <p>{p.name}</p>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                    {
                        datas.videos?.results?.length > 0 && datas.videos.results[0].key  ? (
                            <div className={styles.trailerBlock}>
                                <p>Трейлеры фильма</p>

                                <div className={styles.trailer}>
                                    <div>
                                        <img
                                            src={`https://img.youtube.com/vi/${datas.videos.results[0].key}/hqdefault.jpg`} // Превью с YouTube
                                            alt="Trailer preview"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleOpenModal(datas.videos.results[0].key)}

                                        />
                                        <span className={`material-symbols-outlined ${styles.play}`} onClick={() => handleOpenModal(datas.videos.results[0].key)}>
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
                                                src={`https://www.youtube.com/embed/${datas.videos.results[0].key}`}
                                                title="Movie Trailer"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>К сожалению, трейлер не доступен для этого фильма.</p>
                        )
                    }

                </div>

                <div className={styles.someInfoBlock}>
                    <div className={styles.info}>
                        <p>Original language: <br /><span>{movie.original_language === 'en' ? 'English' : ''}</span></p>

                        <p>Status: <br /> <span>{movie.status}</span></p>

                        <p>Budget: <br /> <span>{movie.budget}$</span></p>

                        <p>Keywords</p>

                        <div className={styles.keywords}>
                            {
                                datas.keywords.keywords.map((keyword) => (
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

export default MoviePage;