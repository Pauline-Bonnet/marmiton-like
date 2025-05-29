import styles from './header.module.css';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <img src="./src/assets/img/logo2.png" alt="logo Fake Marmiton" className={styles.logo} />
            </div>
            <div className={styles.searchContainer}>
                <input type="search" name="searchRecipe" id="searchRecipe" className={styles.searchInput} />
            </div>
            <div className={styles.profileContainer}>
                <button type="button" className={styles.connectButton}>Connexion</button>
            </div>
        </div>
    );
}

export default Header;