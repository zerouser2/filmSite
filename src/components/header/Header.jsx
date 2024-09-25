import { Link } from 'react-router-dom';
import styles from './header.module.scss'

function Header() {
    return (
        <div className={styles.header}>
            <div>
                <h1>Movie Buff</h1>

                <Link to='/homepage'>Home</Link>
                <Link to='/actors'>Actors</Link>
                <p>Top movies</p>
                <p>Upcoming</p>

            </div>

            <div>
                <a>Log in</a>
                <a>Sign up</a>
            </div>
        </div>
    );
}

export default Header;