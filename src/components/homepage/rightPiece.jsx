import styles from './homepage.module.scss'

function LeftPiece() {
    return (
        <div className={styles.leftPiece}>
            <div className={styles.navs}>
                <a>Home</a>
                <a>Movies</a>
                <a>Series</a>
                <a>Watchlist</a>
                <a>Profile</a>

            </div>
        </div>
    );
}

export default LeftPiece;