import styles from './layout.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

function Layout () {
    return (
        <div className={styles.container}>
            <Header/>
            <main className={styles.mainContent}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;
