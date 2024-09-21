import styles from './main.module.scss';
import moviePhoto from './images/moviePhoto.png'
import { Link } from 'react-router-dom';

function Main() {
    return (  
        <div className={styles.main}>
            <div>
                <p>Explore the best movies & enjoy them anytime!</p>

                <p>Start your movie journey now.</p>

                <Link to='/homepage'>Start watching</Link>
            </div>

            <div>
                <img src={moviePhoto}/>
            </div>

        </div>
    );
}

export default Main;