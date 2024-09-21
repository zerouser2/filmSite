import Header from '../header/Header';
import styles from './homepage.module.scss';
import RightBlock from './RightBlock';
import LeftPiece from './rightPiece';
import RightPiece from './rightPiece';


function HomePage() {
    return (
        <>
            <Header />
            <div className={styles.homepage}>
                <LeftPiece />
                <RightBlock />
            </div>
        </>
    );
}

export default HomePage;