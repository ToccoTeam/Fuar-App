import React, { useState } from 'react';
import styles from './page.module.css';
import hero from '../../assets/hero.png';
import { deafultAuthType, useAuth } from '../../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import NewRecordModal from './NewRecordModal';
import localStorageVariables from '../../utils/constants/localStorageVariables';

const constStrings = {
    title: 'Daha iyi bir fuar deneyimi için',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    newAddBtn: 'Yeni Ekle',
    loginBtn: 'Giriş Yap',
    registerBtn: 'Üye Ol',
    logoutBtn: 'Çıkış Yap',
};

const HomePage = () => {
    const { auth, setAuth } = useAuth();

    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openRecordModal, setOpenRecordModal] = useState(false);

    const handleOpenLoginModal = () => setOpenLoginModal(true);
    const handleOpenRegisterModal = () => setOpenRegisterModal(true);
    const handleOpenRecordModal = () => setOpenRecordModal(true);

    const handleLogout = () => {
        localStorage.removeItem(localStorageVariables.token);
        setAuth(deafultAuthType);
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>{constStrings.title}</h1>
                <p className={styles.desc}>{constStrings.description}</p>
                <div className={styles.buttonContainer}>
                    {auth.isAuth ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={handleOpenRecordModal} className={styles.button}>
                                {constStrings.newAddBtn}
                            </button>
                            <button onClick={handleLogout} className={styles.button}>
                                {constStrings.logoutBtn}
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={handleOpenLoginModal} className={styles.button}>
                                {constStrings.loginBtn}
                            </button>
                            <button onClick={handleOpenRegisterModal} className={styles.button}>
                                {constStrings.registerBtn}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.item}>
                <img src={hero} alt='' className={styles.img} />
            </div>
            <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
            <RegisterModal open={openRegisterModal} setOpen={setOpenRegisterModal} />
            <NewRecordModal open={openRecordModal} setOpen={setOpenRecordModal} />
        </div>
    );
};

export default HomePage;
