export const ProfileData = (props)=>{
    let {setEdit, profileId, router} = props
    return (
        <div className="profile__data-items">
            {!router.params.userId&&<button onClick={()=> setEdit(true)}>Edit</button>}
            <div className="profile__data-item">
                <span>aboutMe:</span>
                <span>{profileId.aboutMe}</span>
            </div>
            <div className="profile__data-item">
                <span>contacts:</span>
                <div className="contacts">
                    {Object.keys(profileId.contacts).map(k => <Contact key={k} contactTitle={k} contactValue={profileId.contacts[k]}/>)}
                </div>
            </div>
            <div className="profile__data-item">
                <span>fullName: </span>
                <span>{profileId.fullName}</span>
            </div>
            <div className="profile__data-item">
                <span>lookingForAJob: </span>
                <span>{profileId.lookingForAJob}</span>
            </div>
            <div className="profile__data-item">
                <span>lookingForAJobDescription: </span>
                <span>{profileId.lookingForAJobDescription}</span>
            </div>

        </div>
    )
}
const Contact = ({contactTitle, contactValue,}) => {
return (
    <div>
        {contactTitle}: {contactValue|| 'haha'}
    </div>
)
}