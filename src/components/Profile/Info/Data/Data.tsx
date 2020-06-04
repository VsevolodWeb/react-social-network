import React from 'react';
import {ProfileContactsType} from "../../../../redux/types/types";

type PropsType = {
    aboutMe: string
    contacts: ProfileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const Data: React.FC<PropsType> = props => {
    let contactsIsset;

    if(props.contacts) {
        //todo contactsIsset = !Object.values(props.contacts).includes(null);
        contactsIsset = true
    }

    return <>
        {props.lookingForAJob ? <div><b>Looking for job</b></div> : null}
                {props.lookingForAJobDescription ? <div><b>My skills</b>: {props.lookingForAJobDescription}</div> : null}
                {props.aboutMe ? <div><b>AboutMe</b>: {props.aboutMe}</div> : null}
                {contactsIsset ? <div><b>Contacts</b>:
                    <ul>{Object.keys(props.contacts)
                               .map((socialTitle) => {
                                    return props.contacts[socialTitle as keyof ProfileContactsType] ? <li>{socialTitle}: {props.contacts[socialTitle as keyof ProfileContactsType]}</li> : null
                                })}</ul></div> : null}
    </>
}

export default Data;