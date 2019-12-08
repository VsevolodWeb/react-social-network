import React from 'react';

const Data = props => {
    let contactsIsset;

    if(props.contacts) {
        contactsIsset = !Object.values(props.contacts).includes(null);
    }

    return <>
        {props.lookingForAJob ? <div><b>Looking for job</b></div> : null}
                {props.lookingForAJobDescription ? <div><b>My skills</b>: {props.lookingForAJobDescription}</div> : null}
                {props.aboutMe ? <div><b>About me:</b> {props.aboutMe}</div> : null}
                {contactsIsset ? <div><b>Contacts:</b> <ul>{Object.keys(props.contacts).map((socialTitle, index) => {
                                                            return props.contacts[index] ? <li>{socialTitle}: {props.contacts[index]}</li> : null
                                                        })}</ul></div> : null}
    </>
}

export default Data;