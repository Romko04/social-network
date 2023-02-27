import { useFormik } from 'formik'
import React from 'react'

const ProfileDataForm = (props) => {
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
        <form onSubmit={formik.handleSubmit}>
            <div className="profile__data-items">
                <button type='submit'>Save</button>
                <div key={1} className="profile__data-item">
                    <span>aboutMe:</span>
                    <input type="text" key={'AboutMe'} onChange={formik.handleChange} value={formik.values.aboutMe} name="aboutMe" id="" />
                </div>
                <div key={2} className="profile__data-item">
                    <span>contacts:</span>
                    <div className="contacts">
                        {Object.keys(profileId.contacts).map(k => {
                            return (
                                <div>
                                    <span>{k}</span>
                                    <input onChange={formik.handleChange} name={'contacts.' + k} key={k}  value={formik.values.contacts[k]} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div key={3} className="profile__data-item">
                    <span>fullName:</span>
                    <input type="text" key={'fullName'} onChange={formik.handleChange} value={formik.values.fullName} name="fullName" id="" />
                </div>
                <div key={4} className="profile__data-item">
                    <span>lookingForAJob</span>
                    <input type="checkbox" key={'lookingForAJob'} onChange={formik.handleChange} value={formik.values.lookingForAJob} name="lookingForAJob" id="" />
                </div>
                <div key={5} className="profile__data-item">
                    <span>lookingForAJobDescription:</span>
                    <input type="text" key={'lookingForAJobDescription'} onChange={formik.handleChange} value={formik.values.lookingForAJobDescription} name="lookingForAJobDescription" id="" />
                </div>
            </div>
        </form>

    )
}
export default ProfileDataForm