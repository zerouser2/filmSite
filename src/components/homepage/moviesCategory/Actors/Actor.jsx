import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchActorCredits, fetchActorDetail, fetchActors, resetActors } from "../../../../store/movies.slice";
import styles from './actors.module.scss'
import { Link } from "react-router-dom";




const TextWithLineBreaks = ({ text, interval }) => {
    // Разделяем текст на предложения
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || []; // Разделяем по точкам, восклицательным и вопросительным знакам

    return (
        <div>
            {sentences.map((sentence, index) => (
                <React.Fragment key={index}>
                    <span>{sentence.trim()}</span>
                    {(index + 1) % interval === 0 && <br />}
                </React.Fragment>
            ))}
        </div>
    );
};


function Actor() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { actors, actorDetail, actorCredits } = useSelector((state) => state.movies);

    const actor = actors.find(a => a.id === parseInt(id));

    useEffect(() => {
        if (!actor) {
            dispatch(fetchActorDetail(id));
            dispatch(fetchActorCredits(id));
        }
        console.log(actor, actorDetail, actorCredits)
    }, [dispatch, actor, id]);

    useEffect(() => {
        dispatch(resetActors())
    }, [])

    if (!actorDetail || !actorCredits.length) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={styles.actorBlock}>
            <div className={styles.leftBlock}>
                <img src={`https://image.tmdb.org/t/p/original${actorDetail.profile_path}`} alt='фото не найдено' onError={(e) => {
                    e.target.src = 'https://cdn.icon-icons.com/icons2/1709/PNG/512/user1_112358.png';
                }} />

                <p className={styles.personalInfo}>Personal information</p>

                <span>Birthday</span>
                <p>{actorDetail.birthday}</p>

                <span>Place Of Birth</span>
                <p>{actorDetail.place_of_birth}</p>

                <span>Known For Department</span>
                <p>{actorDetail.known_for_department}</p>

                <span>Gender</span>
                <p>{actorDetail.gender === 2 ? "Male" : "Female"}</p>

                <span>Also Known As</span>
                {actorDetail.also_known_as.slice(0, 6).map((name, index) => (
                    <p key={index}>{name}</p>
                ))}
            </div>

            <div className={styles.rightBlock}>
                <div className={styles.info}>
                    <p>{actorDetail.name}</p>
                    <p>Biography</p>
                    <TextWithLineBreaks text={actorDetail.biography} interval={2} />
                </div>

                <div className={styles.known_for}>
                    <p className={styles.title}>Known for:</p>
                    <div className={styles.mvs}>
                        {actorCredits.slice(0, 5).map((mov) => (
                            <div className={styles.knownformovie} key={mov.id}>
                                <Link to={`/films/${mov.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${mov.poster_path}`} alt={mov.name} />
                                </Link>
                                <p>{mov.name}</p>
                            </div>
                        ))}
                        <p>And more...</p>
                    </div>
                </div>

                <div className={styles.actingArt}>
                    <p className={styles.title}>Acting art</p>
                    <div className={styles.filmCred}>
                        {actorCredits.slice()
                            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                            .filter(movie => movie.release_date && movie.original_title && movie.character)
                            .map((movie) => (
                                <div className={styles.everyMovie} key={movie.id}>
                                    <p>{movie.release_date.slice(0, 4)}</p>
                                    <div>
                                        <Link to={`/films/${movie.id}`}>
                                            <p className={styles.movietitle}>{movie.original_title}</p>
                                        </Link>
                                        <p>Known as: {movie.character}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Actor;