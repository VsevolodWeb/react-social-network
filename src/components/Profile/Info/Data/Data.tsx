import React from 'react';
import {ProfileContactsType, ProfileType} from '../../../../redux/types/types'

type PropsType = {
    userProfile: ProfileType
}

const Data: React.FC<PropsType> = ({userProfile}) => {
    return <>
        {userProfile.lookingForAJob ? <div><b>Looking for job</b></div> : null}
                {userProfile.lookingForAJobDescription ? <div><b>My skills</b>: {userProfile.lookingForAJobDescription}</div> : null}
                {userProfile.aboutMe ? <div><b>AboutMe</b>: {userProfile.aboutMe}</div> : null}
                {userProfile.contacts ? <ul>{Object.keys(userProfile.contacts)
                               .map((socialTitle, index) => {
                                    return userProfile.contacts![socialTitle as keyof ProfileContactsType] ? <li key={index}>{socialTitle}: {userProfile.contacts![socialTitle as keyof ProfileContactsType]}</li> : null
                                })}</ul> : null}
    </>
}

export default Data;