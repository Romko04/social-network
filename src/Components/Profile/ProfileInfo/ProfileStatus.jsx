import React, { useEffect, useState } from 'react'
import './ProfileStatus.css'
const ProfileStatus = (props) => {
    let [editMode, setEdit] = useState(false)
    let [stat, setStatus] = useState(props.status)
    const deactiveEditMode = () => {
        setEdit(false)
        props.updateStatusThunk(stat)
    }
    const activeEditMode = () => {
        debugger
        if (!props.userId) {
            setEdit(true)
        }
    }
    const changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    return (
        <div className="status">
            {/* {props.userId&& <span className="status__text">{props.status || 'Немає статусу'}</span>} */}
            {editMode && !props.userId
                ? <input onChange={changeStatus}  autoFocus={true} onBlur={deactiveEditMode} type="text" className="status__input" value={stat} />
                : <span title='Поміняти статус' onDoubleClick={activeEditMode} className="status__text">{props.status || 'Немає статусу'}</span>
            }
        </div>
    )
}
export default ProfileStatus