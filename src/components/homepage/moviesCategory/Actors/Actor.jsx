import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchActorCredits, fetchActorDetail, fetchActors } from "../../../../store/movies.slice";
import styles from './actors.module.scss'
import { Link } from "react-router-dom";

function Actor() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { actors, actorDetail, actorCredits } = useSelector((state) => state.movies)

    const actor = actors.find(a => a.id === parseInt(id))

    useEffect(() => {
        if (actors.length === 0) {
            dispatch(fetchActors())
        }
    }, [dispatch, actors.length])

    useEffect(() => {
        dispatch(fetchActorDetail(id))
        console.log(actorDetail)
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchActorCredits(id))
        console.log(actorCredits)
    }, [dispatch])

    useEffect(() => {
        if (actors.length > 0 && !actor) {
            console.log('Actor not found.');
        }
        console.log(actor)
    }, [actors, actor]);

    if (!actor) return <h1>Loading...</h1>

    return (
        <div className={styles.actorBlock}>



            <div className={styles.leftBlock}>
                <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt='фото не найдено' onError={(e) => {
                    e.target.src = 'https://cdn.icon-icons.com/icons2/1709/PNG/512/user1_112358.png'
                }} />

                <p className={styles.personalInfo}>Personal information</p>

                <span>Birthday</span>

                <p>{actorDetail.birthday}</p>

                <span>Place Of Birth</span>

                <p>{actorDetail.place_of_birth}</p>

                <span>Known For Department</span>

                <p>{actorDetail.known_for_department}</p>

                <span>Gender</span>

                {
                    actorDetail.gender === 2 ? (
                        <p>Male</p>
                    ) : (
                        <p>Female</p>
                    )
                }

                <span>Also Known As</span>

                {
                    actorDetail.also_known_as.slice(1, 6).map((name) => (
                        <p>
                            {name}
                        </p>
                    ))
                }


            </div>

            <div className={styles.rightBlock}>

                <div className={styles.info}>
                    <p>{actor.name}</p>

                    <p>Biography</p>

                    <p>
                        {
                            actorDetail.biography
                        }
                    </p>

                </div>

                <div className={styles.known_for}>

                    <p className={styles.title}>Known for:</p>

                    <div className={styles.mvs}>
                        {
                            actor.known_for.map((mov) => (
                                <div className={styles.knownformovie}>
                                    <img src={`https://image.tmdb.org/t/p/original/${mov.poster_path}`} />
                                    <p>{mov.name}</p>
                                </div>
                            ))
                        }
                        {
                            actor ? (
                                <p>And more...</p>
                            ) : (
                                <p>Loading...</p>
                            )
                        }
                    </div>

                </div>

                <div className={styles.actingArt}>
                    <p className={styles.title}>Acting art</p>

                    <div className={styles.filmCred}>
                        {
                            actorCredits
                                .filter(movie => movie.release_date && movie.original_title && movie.character)
                                .map((movie) => (
                                    <div className={styles.everyMovie}>
                                        <p>{movie.release_date.slice(0, 4)}</p>

                                        <div>
                                            <Link to={`/popularfilms/${movie.id}`}>
                                                <p>{movie.original_title}</p>
                                            </Link>
                                            <p>Known as: {movie.character}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Actor;