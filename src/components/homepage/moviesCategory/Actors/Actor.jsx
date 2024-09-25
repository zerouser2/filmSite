import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchActors } from "../../../../store/movies.slice";
import styles from './actors.module.scss'

function Actor() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { actors } = useSelector((state) => state.movies)

    const actor = actors.find(a => a.id === parseInt(id))

    useEffect(() => {
        if (actors.length === 0) {
            dispatch(fetchActors())
        }
    }, [dispatch, actors.length])


    useEffect(() => {
        if (actors.length > 0 && !actor) {
            console.log('Actor not found.');
        }
        console.log(actor)
    }, [actors, actor]);

    if (!actor) return <h1>Loading...</h1>

    return (
        <div className={styles.actorBlock}>

            <div className={styles.actorPhoto}>
                <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt='фото не найдено' onError={(e) => {
                    e.target.src = 'https://cdn.icon-icons.com/icons2/1709/PNG/512/user1_112358.png'
                }} />
                <p>{actor.name}</p>

                <div className={styles.rightBlock}>

                    <p>Known for:</p>

                    {
                        actor.known_for.map((mov) => (
                            <div className={styles.knownformovie}>
                                <img src={`https://image.tmdb.org/t/p/original/${mov.poster_path}`} />
                                <p>{mov.name}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default Actor;