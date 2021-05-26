import styles from '../styles/Layout.module.css';
import ForDevelopers from './ForDevelopers';
import ForMembers from './ForMembers';
import Header from './Header';
import Nav from './Nav';

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <div>
                <main>
                    <Header></Header>
                    <ForDevelopers></ForDevelopers>
                    <ForMembers></ForMembers>
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;