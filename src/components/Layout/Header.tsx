import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import styles from './Header.module.css';

function Header() {
    const { totalItems } = useCart();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    🛒 ShopMall
                </Link>

                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}>
                        홈
                    </Link>
                    <Link to="/products" className={styles.navLink}>
                        상품 목록
                    </Link>
                </nav>

                <div className={styles.actions}>
                    <button
                        onClick={toggleTheme}
                        className={styles.themeButton}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    <Link to="/cart" className={styles.cartButton}>
                        🛒 장바구니
                        {totalItems > 0 && (
                            <span className={styles.badge}>{totalItems}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;