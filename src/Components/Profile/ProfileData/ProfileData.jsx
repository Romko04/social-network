import './ProfileData.css'
export const ProfileData = (props)=>{
    let {setEdit, profileId, router} = props
    return (
        <div className="profile__data-items">
            {!router.params.userId&&<button className='profile__data-btn' onClick={()=> setEdit(true)}>Edit</button>}
            <div className="profile__data-item">
                <span className="profile__data-item-title">AboutMe:</span>
                <span className="profile__data-item-value">{profileId.aboutMe}</span>
            </div>
            <div className="profile__data-item">
                <span className="profile__data-item-title">contacts:</span>
                <div className="contacts">
                    {Object.keys(profileId.contacts).map(k => <Contact key={k} contactTitle={k} contactValue={profileId.contacts[k]}/>)}
                </div>
            </div>
            <div className="profile__data-item">
                <span className="profile__data-item-title">FullName: </span>
                <span className="profile__data-item-value">{profileId.fullName}</span>
            </div>
            <div className="profile__data-item">
                <span className="profile__data-item-title">LookingForAJob: </span>
                <span className="profile__data-item-value">{profileId.lookingForAJob}</span>
            </div>
            <div className="profile__data-item">
                <span className="profile__data-item-title">JobDescription: </span>
                <span className="profile__data-item-value">{profileId.lookingForAJobDescription}</span>
            </div>

        </div>
    )
}
const Contact = ({contactTitle, contactValue,}) => {
return (
    <div>
        <span className='profile__data-item-title profile--data'>{contactTitle}</span>: <span className='profile__data-item-value profile--data'>{contactValue|| 'Немає даних'}</span>
    </div>
)
}