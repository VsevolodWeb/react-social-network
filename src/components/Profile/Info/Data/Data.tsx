import React from 'react';
import {ProfileContactsType} from "../../../../redux/types/types";

type PropsType = {
    aboutMe?: string
    contacts?: ProfileContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
}

const Data: React.FC<PropsType> = props => {
    return <>
        {props.lookingForAJob ? <div><b>Looking for job</b></div> : null}
                {props.lookingForAJobDescription ? <div><b>My skills</b>: {props.lookingForAJobDescription}</div> : null}
                {props.aboutMe ? <div><b>AboutMe</b>: {props.aboutMe}</div> : null}
                {props.contacts ? <ul>{Object.keys(props.contacts)
                               .map((socialTitle, index) => {
                                    return props.contacts![socialTitle as keyof ProfileContactsType] ? <li key={index}>{socialTitle}: {props.contacts![socialTitle as keyof ProfileContactsType]}</li> : null
                                })}</ul> : null}
    </>
}

export default Data;