import { appStateType } from 'Components/Redux/redux-store'
import React from 'react'
import { connect } from 'react-redux'
import Header, { HeaderPropsType } from './Header'
const HeaderContainer:React.FC<HeaderPropsType> = (props)=> {
    return (
        <Header {...props}/>
    )
}
const mapStateToProps = (state:appStateType):HeaderPropsType => {
    return {
        auth: state.auth,
        profile: state.profilePage.profileId
    }
}
type t = HeaderPropsType
export default connect<t,{},{},appStateType>(mapStateToProps,{})(HeaderContainer)