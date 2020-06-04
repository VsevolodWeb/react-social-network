import React from 'react';
import s from './Banner.module.css'
import profile from './banner.jpg';

type PropsType = {}

const Banner: React.FC<PropsType> = () => {
    return (
        <div className={s.banner} style={{ backgroundImage: `url(${profile})` }} />
    )
};

export default Banner;