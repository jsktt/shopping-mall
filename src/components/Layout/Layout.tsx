import Header from './Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from './Footer';

function Layout() {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;