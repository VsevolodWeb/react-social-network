import React from 'react'
import preloader from './preloader.gif'
import s from './Preloader.module.css'

const Preloader = () => {
    return <img src={preloader} alt="loading" className={s.preloader} />
};

export default Preloader;