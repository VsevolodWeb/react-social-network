import React from 'react';
import s from './Banner.module.css'
import profile from './banner.jpg';


const Banner = () => {
    return (
        <div className={s.banner} style={{ backgroundImage: `url(${profile})` }}></div>
    )
}

export default Banner;