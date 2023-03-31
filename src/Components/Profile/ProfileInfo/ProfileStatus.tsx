import React, { useEffect, useState } from 'react'
import './ProfileStatus.css'
type ProfileStatus = {
    updateStatusThunk:(status:string)=>void
    status:string
    userId:number
}
const ProfileStatus:React.FC<ProfileStatus> = ({updateStatusThunk,status,userId}) => {
    let [editMode, setEdit] = useState(false)
    let [stat, setStatus] = useState(status)
    const deactiveEditMode = () => {
        setEdit(false)
        updateStatusThunk(stat)
    }
    const activeEditMode = () => {
        if (!userId) {
            setEdit(true)
        }
    }
    const changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(status)
    }, [status])
    return (
        <div className="status">
            {editMode && !userId
                ? <input onChange={changeStatus}  autoFocus={true} onBlur={deactiveEditMode} type="text" className="status__input" value={stat} />
                : <span title='Поміняти статус' onDoubleClick={activeEditMode} className="status__text">{status || 'Немає статусу'}</span>
            }
        </div>
    )
}
export default ProfileStatus