import styles from './header.module.scss'

function Header() {
    return (
        <div className={styles.header}>
            <div>
                <p>Movie Buff</p>
                <p>Home</p>
                <p>Genres</p>
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