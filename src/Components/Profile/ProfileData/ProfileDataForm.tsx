import { useFormik } from 'formik'
import React from 'react'
import { contactsType } from 'types/types'
export type saveProfileDataType = {aboutMe:string,contacts:contactsType,fullName:string,lookingForAJob:boolean,lookingForAJobDescription:string}
type ProfileDataFormType = {
    saveProfile:(res:saveProfileDataType)=>void
    setEdit:(edit:boolean)=>void
    profileId:saveProfileDataType
} 
const ProfileDataForm:React.FC<ProfileDataFormType> = (props) => {
    let { saveProfile, setEdit, profileId } = props
    const formik = useFormik({
        initialValues: {
            lookingForAJob: profileId.lookingForAJob,
            lookingForAJobDescription: profileId.lookingForAJobDescription,
            aboutMe: profileId.aboutMe,
            fullName: profileId.fullName,
            contacts: {
                facebook: profileId.contacts.facebook,
                github: profileId.contacts.github,
                instagram: profileId.contacts.instagram,
                website: profileId.contacts.website,
                mainLink: profileId.contacts.mainLink,
                twitter: profileId.contacts.twitter,
                vk: profileId.contacts.vk,
                youtube: profileId.contacts.youtube,
            }
        },
        onSubmit: values => {
            setEdit(false)
            saveProfile(values)
        }
    })

    return (
            <div className="profile__data-items">
                <form onSubmit={formik.handleSubmit}>
                    <button className='profile__data-btn' type='submit'>Save</button>
                    <div key={1} className="profile__data-item">
                        <span className="profile__data-item-title">aboutMe:</span>
                        <input className='profile__data-form__input' type="text" key={'AboutMe'} onChange={formik.handleChange} value={formik.values.aboutMe} name="aboutMe" id="" />
                    </div>
                    <div key={2} className="profile__data-item">
                        <span className="profile__data-item-title">contacts:</span>
                        <div className="contacts">
                            {Object.keys(profileId.contacts).map(k => {
                                return (
                                    <div>
                                        <span className='profile__data-item-title profile--data'>{k}</span>
                                        <input className='profile__data-form__input' onChange={formik.handleChange} name={'contacts.' + k} key={k}  value={formik.values.contacts[k]} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div key={3} className="profile__data-item">
                        <span className="profile__data-item-title">fullName:</span>
                        <input className='profile__data-form__input' type="text" key={'fullName'} onChange={formik.handleChange} value={formik.values.fullName} name="fullName" id="" />
                    </div>
                    <div key={4} className="profile__data-item">
                        <span className="profile__data-item-title">lookingForAJob</span>
                        <input className='profile__data-form__input' type="checkbox" key={'lookingForAJob'} onChange={formik.handleChange} value={formik.values.lookingForAJob} name="lookingForAJob" id="" />
                    </div>
                    <div key={5} className="profile__data-item">
                        <span className="profile__data-item-title">JobDescription:</span>
                        <input className='profile__data-form__input' type="text" key={'lookingForAJobDescription'} onChange={formik.handleChange} value={formik.values.lookingForAJobDescription} name="lookingForAJobDescription" id="" />
                    </div>
                </form>          
            </div>)

}
export default ProfileDataForm