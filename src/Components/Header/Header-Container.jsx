import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
const HeaderContainer = (props)=> {
    return (
        <Header {...props}/>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profilePage.profileId
    }
}

export default connect(mapStateToProps,{})(HeaderContainer)